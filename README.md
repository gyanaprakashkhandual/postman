# Postman API Testing Guide

A comprehensive, open source reference for testing REST APIs using Postman and Newman. This repository covers collection setup, bearer token authentication, writing assertions, shell automation, and CI/CD integration — built around a real Spring Boot Todo application.

---

## What This Repository Contains

This repository is a structured reference guide for API testing. It includes:

- Full Postman collection examples for a REST API
- Bearer token authentication patterns
- Request body templates for every HTTP method
- Postman test scripts with assertions
- Shell scripts for automated test runs using Newman
- CI/CD pipeline examples for GitHub Actions
- A complete Todo API testing reference built from real production code

---

## Technology Stack

- Spring Boot with Spring Security
- JWT Bearer Token Authentication
- JPA and Hibernate with PostgreSQL
- Newman (Postman CLI runner)
- GitHub Actions for CI/CD

---

## Repository Structure

```
postman/
├── collections/
│   └── todo-api.json           Exported Postman collection
├── environments/
│   └── staging.json            Environment variable file
├── scripts/
│   └── run_tests.sh            Shell script to run tests via Newman
├── docs/
│   ├── todo-api-testing-guide.md    Full endpoint testing reference
│   └── postman-cli-guide.md         Newman and CLI usage guide
├── README.md
├── LICENSE.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
└── SECURITY.md
```

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- Newman installed globally

```bash
npm install -g newman
npm install -g newman-reporter-htmlextra
```

### Running the Collection

```bash
newman run collections/todo-api.json \
  -e environments/staging.json \
  --env-var "bearerToken=your_token_here"
```

### Generating an HTML Report

```bash
newman run collections/todo-api.json \
  -e environments/staging.json \
  --reporters cli,htmlextra \
  --reporter-htmlextra-export reports/report.html
```

---

## API Overview

The Todo API is hosted at `https://toodoo-2o5c.onrender.com`.

All requests require a valid Bearer Token in the Authorization header.

| Method | Endpoint                        | Description                  |
| ------ | ------------------------------- | ---------------------------- |
| POST   | `/api/todos`                    | Create a new todo            |
| GET    | `/api/todos`                    | Get all todos with filters   |
| GET    | `/api/todos/stats`              | Get todo counts by status    |
| GET    | `/api/todos/tags`               | Get all distinct tags        |
| GET    | `/api/todos/{id}`               | Get a single todo by id      |
| PUT    | `/api/todos/{id}`               | Full update of a todo        |
| PATCH  | `/api/todos/{id}/status?value=` | Update only the status field |
| DELETE | `/api/todos/{id}`               | Delete a todo                |

For the full request body reference, assertion scripts, and filter parameters, see [docs/todo-api-testing-guide.md](docs/todo-api-testing-guide.md).

---

## API Usage Restriction

This repository is open source. You are free to read, study, fork, and adapt all code, structure, scripts, and documentation in this repository.

**However, the live API hosted at `https://toodoo-2o5c.onrender.com` is strictly private and is not available for public use.**

You may not call, consume, test against, or integrate with the live API without explicit written permission from the owner. This restriction applies regardless of how the request is made — directly, through automation, or through any third-party tool.

See [SECURITY.md](SECURITY.md) for the full policy.

---

## What You Can Do

- Read and study the code
- Fork the repository
- Clone it locally
- Follow the collection structure to build your own
- Adapt the shell scripts and CI/CD pipeline
- Open issues and pull requests
- Reference the documentation for your own projects

## What You Cannot Do

- Call or consume the live API at `https://toodoo-2o5c.onrender.com`
- Use the API credentials or token in any environment
- Attempt to bypass, probe, or test the live API infrastructure

---

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

---

## License

This project is licensed under the terms described in [LICENSE.md](LICENSE.md).

---

## Author

Gyana Prakash Khandual
