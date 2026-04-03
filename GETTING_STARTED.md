# Postman CLI Guide

## Using Newman, Bearer Tokens, and Assertions from the Command Line

---

## Table of Contents

1. [What is Newman](#what-is-newman)
2. [Installation](#installation)
3. [Running Collections](#running-collections)
4. [Bearer Token Authentication](#bearer-token-authentication)
5. [Writing Assertions](#writing-assertions)
6. [Shell Script Automation](#shell-script-automation)
7. [Using curl as an Alternative](#using-curl-as-an-alternative)
8. [CI/CD Integration](#cicd-integration)
9. [Quick Reference](#quick-reference)

---

## What is Newman

Newman is the official command-line runner for Postman. It allows you to run Postman collections directly from a terminal or integrate them into automated pipelines without opening the Postman desktop app.

---

## Installation

Install Newman globally using npm:

```bash
npm install -g newman
```

Install the HTML reporter for visual test reports:

```bash
npm install -g newman-reporter-htmlextra
```

Verify the installation:

```bash
newman --version
```

---

## Running Collections

### Basic Collection Run

```bash
newman run my-collection.json
```

### Run with an Environment File

```bash
newman run my-collection.json -e my-environment.json
```

### Run Multiple Iterations

```bash
newman run my-collection.json -n 5
```

### Run with a Delay Between Requests

```bash
newman run my-collection.json --delay-request 200
```

### Run with a Request Timeout

```bash
newman run my-collection.json --timeout-request 5000
```

### Stop on First Failure

```bash
newman run my-collection.json --bail
```

---

## Bearer Token Authentication

There are three ways to pass a bearer token when running collections.

### Option 1 - Pass via CLI Environment Variable

```bash
newman run collection.json \
  --env-var "bearerToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Option 2 - Define in the Collection JSON

In your exported Postman collection file, set the auth block at the collection or request level:

```json
{
  "auth": {
    "type": "bearer",
    "bearer": [
      {
        "key": "token",
        "value": "{{bearerToken}}",
        "type": "string"
      }
    ]
  }
}
```

The `{{bearerToken}}` variable is resolved from your environment file or the `--env-var` flag.

### Option 3 - Auto-Fetch Token in Pre-request Script

In Postman, open the Pre-request Script tab on a request or the collection root. This script runs before every request and stores the token automatically:

```javascript
pm.sendRequest(
  {
    url: "https://your-auth-server.com/oauth/token",
    method: "POST",
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: {
      mode: "urlencoded",
      urlencoded: [
        { key: "grant_type", value: "client_credentials" },
        { key: "client_id", value: pm.environment.get("clientId") },
        { key: "client_secret", value: pm.environment.get("clientSecret") },
      ],
    },
  },
  function (err, res) {
    const token = res.json().access_token;
    pm.environment.set("bearerToken", token);
  },
);
```

When Newman runs the collection, it executes this script before each request and injects the token into the environment automatically.

---

## Writing Assertions

Assertions are written in the Tests tab inside Postman and are exported as part of the collection. Newman executes them and reports pass/fail results.

### Status Code Check

```javascript
pm.test("Status is 200", function () {
  pm.response.to.have.status(200);
});
```

### Response Time Check

```javascript
pm.test("Response time is under 500ms", function () {
  pm.expect(pm.response.responseTime).to.be.below(500);
});
```

### JSON Body Field Check

```javascript
pm.test("Response body has user id", function () {
  const json = pm.response.json();
  pm.expect(json).to.have.property("id");
  pm.expect(json.id).to.be.a("number");
});
```

### Response Header Check

```javascript
pm.test("Content-Type is JSON", function () {
  pm.response.to.have.header("Content-Type", "application/json; charset=utf-8");
});
```

### Nested Field Check

```javascript
pm.test("User role is admin", function () {
  const json = pm.response.json();
  pm.expect(json.data.user.role).to.eql("admin");
});
```

### JSON Schema Validation

```javascript
const schema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    name: { type: "string" },
    email: { type: "string" },
  },
  required: ["id", "name", "email"],
};

pm.test("Response matches schema", function () {
  pm.response.to.have.jsonSchema(schema);
});
```

### Storing a Value for Later Requests

```javascript
const json = pm.response.json();
pm.environment.set("userId", json.id);
```

This saves the `id` from the response so a later request in the same collection can use `{{userId}}`.

---

## Shell Script Automation

This script runs a collection, generates an HTML report, and exits with a failure code if any test fails.

```bash
#!/bin/bash
# run_tests.sh

COLLECTION="./collections/api-tests.json"
ENVIRONMENT="./environments/staging.json"
REPORT_DIR="./reports"

mkdir -p $REPORT_DIR

newman run $COLLECTION \
  -e $ENVIRONMENT \
  --env-var "bearerToken=$BEARER_TOKEN" \
  --reporters cli,htmlextra \
  --reporter-htmlextra-export "$REPORT_DIR/report.html" \
  --reporter-htmlextra-title "API Test Report" \
  --delay-request 100 \
  --timeout-request 5000 \
  --bail

if [ $? -eq 0 ]; then
  echo "All tests passed."
else
  echo "Some tests failed. Check $REPORT_DIR/report.html"
  exit 1
fi
```

Run it by passing the token as an environment variable:

```bash
BEARER_TOKEN="your_token_here" bash run_tests.sh
```

---

## Using curl as an Alternative

If you prefer not to use Postman or Newman, curl achieves the same results from any shell.

### GET Request with Bearer Token

```bash
curl -X GET https://api.example.com/users \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" | jq .
```

### POST Request with JSON Body

```bash
curl -X POST https://api.example.com/users \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "email": "john@example.com"}' | jq .
```

### Assert Status Code in Shell

```bash
STATUS=$(curl -o /dev/null -s -w "%{http_code}" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  https://api.example.com/users)

if [ "$STATUS" -eq 200 ]; then
  echo "API returned 200 - OK"
else
  echo "Expected 200, got $STATUS"
  exit 1
fi
```

---

## CI/CD Integration

### GitHub Actions

```yaml
# .github/workflows/api-tests.yml
name: API Tests
on: [push]

jobs:
  api-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install Newman
        run: npm install -g newman newman-reporter-htmlextra

      - name: Run API Tests
        run: |
          newman run collections/api.json \
            -e environments/prod.json \
            --env-var "bearerToken=${{ secrets.BEARER_TOKEN }}" \
            --reporters cli,htmlextra \
            --reporter-htmlextra-export report.html

      - name: Upload Report
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: newman-report
          path: report.html
```

Store the bearer token as a secret in your GitHub repository settings under Settings > Secrets and variables > Actions.

---

## Quick Reference

| Task                    | Command                                                         |
| ----------------------- | --------------------------------------------------------------- |
| Run a collection        | `newman run collection.json`                                    |
| Use an environment file | `-e environment.json`                                           |
| Pass a bearer token     | `--env-var "bearerToken=abc123"`                                |
| Repeat N times          | `-n 5`                                                          |
| Stop on first failure   | `--bail`                                                        |
| Set request timeout     | `--timeout-request 3000`                                        |
| Delay between requests  | `--delay-request 200`                                           |
| Generate HTML report    | `--reporters htmlextra --reporter-htmlextra-export report.html` |
| Suppress verbose output | `--reporters cli --reporter-cli-silent`                         |

---

## Summary

The general workflow is:

1. Build and test your requests inside Postman
2. Write assertions in the Tests tab of each request
3. Export the collection as a JSON file
4. Create an environment JSON file with variable values including the bearer token
5. Run the collection using Newman from your terminal or CI pipeline
6. Review the CLI output or HTML report for pass/fail results
