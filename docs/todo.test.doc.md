# Todo API - Postman Testing Guide

**Base URL:** `https://toodoo-2o5c.onrender.com`

All endpoints require a Bearer Token in the Authorization header.

---

## Table of Contents

1. [Authentication Setup](#authentication-setup)
2. [Create a Todo](#1-create-a-todo)
3. [Get All Todos](#2-get-all-todos)
4. [Get Todo Stats](#3-get-todo-stats)
5. [Get All Tags](#4-get-all-tags)
6. [Get Todo by ID](#5-get-todo-by-id)
7. [Update a Todo](#6-update-a-todo)
8. [Patch Todo Status](#7-patch-todo-status)
9. [Delete a Todo](#8-delete-a-todo)
10. [Filter and Search Todos](#9-filter-and-search-todos)
11. [Enum Reference](#enum-reference)

---

## Authentication Setup

All endpoints are protected. Set the Bearer Token in Postman under the **Authorization** tab, or add it as a header manually.

**Header:**

```
Authorization: Bearer <your_jwt_token>
```

To set it globally in Postman, go to your Collection > Edit > Authorization > Type: Bearer Token and paste your token. All requests inside the collection will inherit it automatically.

---

## 1. Create a Todo

**Method:** POST  
**URL:** `https://toodoo-2o5c.onrender.com/api/todos`

**Headers:**

```
Content-Type: application/json
Authorization: Bearer <token>
```

**Request Body (raw JSON):**

```json
{
  "title": "Complete project documentation",
  "description": "Write full API docs for the todo application",
  "notes": "Use Swagger and Postman collection",
  "refLink": "https://docs.example.com/guide",
  "startDate": "2025-07-01",
  "endDate": "2025-07-10",
  "startTime": "09:00:00",
  "endTime": "17:00:00",
  "priority": "HIGH",
  "status": "PENDING",
  "tags": ["docs", "backend", "api"]
}
```

**Minimal Body (only required field):**

```json
{
  "title": "Quick task"
}
```

**Postman Tests:**

```javascript
pm.test("Status is 201 Created", function () {
  pm.response.to.have.status(201);
});

pm.test("Response has success true", function () {
  const json = pm.response.json();
  pm.expect(json.success).to.be.true;
});

pm.test("Todo is returned with an id", function () {
  const json = pm.response.json();
  pm.expect(json.data).to.have.property("id");
  pm.expect(json.data.id).to.be.a("number");
});

pm.test("Title matches what was sent", function () {
  const json = pm.response.json();
  pm.expect(json.data.title).to.eql("Complete project documentation");
});

pm.test("Default status is PENDING", function () {
  const json = pm.response.json();
  pm.expect(json.data.status).to.eql("PENDING");
});

pm.test("Default priority is MEDIUM if not sent", function () {
  const json = pm.response.json();
  pm.expect(["LOW", "MEDIUM", "HIGH"]).to.include(json.data.priority);
});

// Save the created todo id for use in later requests
pm.environment.set("todoId", pm.response.json().data.id);
```

---

## 2. Get All Todos

**Method:** GET  
**URL:** `https://toodoo-2o5c.onrender.com/api/todos`

**Headers:**

```
Authorization: Bearer <token>
```

**Query Parameters (all optional):**

| Parameter     | Type   | Example      | Description                                   |
| ------------- | ------ | ------------ | --------------------------------------------- |
| search        | string | `project`    | Full-text search on title, description, notes |
| status        | string | `PENDING`    | Filter by status                              |
| priority      | string | `HIGH`       | Filter by priority                            |
| tag           | string | `backend`    | Filter by tag                                 |
| startDateFrom | date   | `2025-07-01` | Filter todos starting from this date          |
| startDateTo   | date   | `2025-07-31` | Filter todos starting before this date        |
| endDateFrom   | date   | `2025-07-01` | Filter todos ending from this date            |
| endDateTo     | date   | `2025-07-31` | Filter todos ending before this date          |
| sortBy        | string | `createdAt`  | Field to sort by                              |
| sortDir       | string | `desc`       | Sort direction: `asc` or `desc`               |
| page          | int    | `0`          | Page number (zero-based)                      |
| size          | int    | `20`         | Page size                                     |

**Example URL with filters:**

```
https://toodoo-2o5c.onrender.com/api/todos?status=PENDING&priority=HIGH&sortBy=createdAt&sortDir=desc&page=0&size=10
```

**Postman Tests:**

```javascript
pm.test("Status is 200 OK", function () {
  pm.response.to.have.status(200);
});

pm.test("Response has success true", function () {
  const json = pm.response.json();
  pm.expect(json.success).to.be.true;
});

pm.test("Data is a page object", function () {
  const json = pm.response.json();
  pm.expect(json.data).to.have.property("content");
  pm.expect(json.data).to.have.property("totalElements");
  pm.expect(json.data).to.have.property("totalPages");
  pm.expect(json.data.content).to.be.an("array");
});

pm.test("Response time is acceptable", function () {
  pm.expect(pm.response.responseTime).to.be.below(2000);
});
```

---

## 3. Get Todo Stats

**Method:** GET  
**URL:** `https://toodoo-2o5c.onrender.com/api/todos/stats`

**Headers:**

```
Authorization: Bearer <token>
```

**No request body or query parameters needed.**

**Expected Response:**

```json
{
  "success": true,
  "message": "Stats fetched",
  "data": {
    "PENDING": 5,
    "IN_PROGRESS": 2,
    "COMPLETED": 10,
    "CANCELLED": 1
  }
}
```

**Postman Tests:**

```javascript
pm.test("Status is 200 OK", function () {
  pm.response.to.have.status(200);
});

pm.test("Stats data is an object", function () {
  const json = pm.response.json();
  pm.expect(json.data).to.be.an("object");
});

pm.test("Stats contain known status keys", function () {
  const json = pm.response.json();
  const validKeys = ["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"];
  Object.keys(json.data).forEach(function (key) {
    pm.expect(validKeys).to.include(key);
  });
});

pm.test("All stat values are numbers", function () {
  const json = pm.response.json();
  Object.values(json.data).forEach(function (val) {
    pm.expect(val).to.be.a("number");
  });
});
```

---

## 4. Get All Tags

**Method:** GET  
**URL:** `https://toodoo-2o5c.onrender.com/api/todos/tags`

**Headers:**

```
Authorization: Bearer <token>
```

**No request body or query parameters needed.**

**Expected Response:**

```json
{
  "success": true,
  "message": "Tags fetched",
  "data": ["api", "backend", "docs", "frontend"]
}
```

**Postman Tests:**

```javascript
pm.test("Status is 200 OK", function () {
  pm.response.to.have.status(200);
});

pm.test("Tags data is an array", function () {
  const json = pm.response.json();
  pm.expect(json.data).to.be.an("array");
});

pm.test("Each tag is a string", function () {
  const json = pm.response.json();
  json.data.forEach(function (tag) {
    pm.expect(tag).to.be.a("string");
  });
});
```

---

## 5. Get Todo by ID

**Method:** GET  
**URL:** `https://toodoo-2o5c.onrender.com/api/todos/{id}`

**Example:**

```
https://toodoo-2o5c.onrender.com/api/todos/1
```

**Headers:**

```
Authorization: Bearer <token>
```

**Postman Tests:**

```javascript
pm.test("Status is 200 OK", function () {
  pm.response.to.have.status(200);
});

pm.test("Returned todo has correct id", function () {
  const json = pm.response.json();
  const expectedId = parseInt(pm.environment.get("todoId"));
  pm.expect(json.data.id).to.eql(expectedId);
});

pm.test("Todo has all expected fields", function () {
  const json = pm.response.json();
  const todo = json.data;
  pm.expect(todo).to.have.property("id");
  pm.expect(todo).to.have.property("title");
  pm.expect(todo).to.have.property("status");
  pm.expect(todo).to.have.property("priority");
  pm.expect(todo).to.have.property("createdAt");
  pm.expect(todo).to.have.property("updatedAt");
});

pm.test("Tags is an array", function () {
  const json = pm.response.json();
  pm.expect(json.data.tags).to.be.an("array");
});
```

**Not Found Test (use a non-existent id like 99999):**

```javascript
pm.test("Status is 404 for unknown id", function () {
  pm.response.to.have.status(404);
});
```

---

## 6. Update a Todo

**Method:** PUT  
**URL:** `https://toodoo-2o5c.onrender.com/api/todos/{id}`

**Example:**

```
https://toodoo-2o5c.onrender.com/api/todos/1
```

**Headers:**

```
Content-Type: application/json
Authorization: Bearer <token>
```

**Request Body (raw JSON) - send the full object:**

```json
{
  "title": "Updated project documentation",
  "description": "Updated description with more detail",
  "notes": "Added Swagger UI setup notes",
  "refLink": "https://docs.example.com/updated-guide",
  "startDate": "2025-07-02",
  "endDate": "2025-07-15",
  "startTime": "10:00:00",
  "endTime": "18:00:00",
  "priority": "MEDIUM",
  "status": "IN_PROGRESS",
  "tags": ["docs", "backend", "swagger"]
}
```

**Postman Tests:**

```javascript
pm.test("Status is 200 OK", function () {
  pm.response.to.have.status(200);
});

pm.test("Title was updated", function () {
  const json = pm.response.json();
  pm.expect(json.data.title).to.eql("Updated project documentation");
});

pm.test("Status was updated", function () {
  const json = pm.response.json();
  pm.expect(json.data.status).to.eql("IN_PROGRESS");
});

pm.test("UpdatedAt is present", function () {
  const json = pm.response.json();
  pm.expect(json.data.updatedAt).to.not.be.null;
});

pm.test("Tags were updated", function () {
  const json = pm.response.json();
  pm.expect(json.data.tags).to.include("swagger");
});
```

---

## 7. Patch Todo Status

**Method:** PATCH  
**URL:** `https://toodoo-2o5c.onrender.com/api/todos/{id}/status?value={status}`

**Example URLs:**

```
https://toodoo-2o5c.onrender.com/api/todos/1/status?value=COMPLETED
https://toodoo-2o5c.onrender.com/api/todos/1/status?value=IN_PROGRESS
https://toodoo-2o5c.onrender.com/api/todos/1/status?value=CANCELLED
https://toodoo-2o5c.onrender.com/api/todos/1/status?value=PENDING
```

**Headers:**

```
Authorization: Bearer <token>
```

**No request body needed. Status is passed as a query parameter.**

**Postman Tests:**

```javascript
pm.test("Status is 200 OK", function () {
  pm.response.to.have.status(200);
});

pm.test("Todo status was patched to COMPLETED", function () {
  const json = pm.response.json();
  pm.expect(json.data.status).to.eql("COMPLETED");
});

pm.test("Response message confirms update", function () {
  const json = pm.response.json();
  pm.expect(json.message).to.include("updated");
});

pm.test("Other fields are unchanged", function () {
  const json = pm.response.json();
  pm.expect(json.data).to.have.property("title");
  pm.expect(json.data).to.have.property("priority");
});
```

---

## 8. Delete a Todo

**Method:** DELETE  
**URL:** `https://toodoo-2o5c.onrender.com/api/todos/{id}`

**Example:**

```
https://toodoo-2o5c.onrender.com/api/todos/1
```

**Headers:**

```
Authorization: Bearer <token>
```

**No request body needed.**

**Expected Response:**

```json
{
  "success": true,
  "message": "Todo deleted",
  "data": null
}
```

**Postman Tests:**

```javascript
pm.test("Status is 200 OK", function () {
  pm.response.to.have.status(200);
});

pm.test("Response confirms deletion", function () {
  const json = pm.response.json();
  pm.expect(json.success).to.be.true;
  pm.expect(json.message).to.include("deleted");
});

pm.test("Data is null after deletion", function () {
  const json = pm.response.json();
  pm.expect(json.data).to.be.null;
});
```

**Verify deletion by fetching the same id afterward:**

```javascript
// Run GET /api/todos/{id} after delete and assert:
pm.test("Deleted todo returns 404", function () {
  pm.response.to.have.status(404);
});
```

---

## 9. Filter and Search Todos

All filtering is done through query parameters on the GET `/api/todos` endpoint.

### Search by Keyword

Searches across title, description, and notes fields.

```
GET https://toodoo-2o5c.onrender.com/api/todos?search=documentation
```

### Filter by Status

```
GET https://toodoo-2o5c.onrender.com/api/todos?status=PENDING
GET https://toodoo-2o5c.onrender.com/api/todos?status=IN_PROGRESS
GET https://toodoo-2o5c.onrender.com/api/todos?status=COMPLETED
GET https://toodoo-2o5c.onrender.com/api/todos?status=CANCELLED
```

### Filter by Priority

```
GET https://toodoo-2o5c.onrender.com/api/todos?priority=HIGH
GET https://toodoo-2o5c.onrender.com/api/todos?priority=MEDIUM
GET https://toodoo-2o5c.onrender.com/api/todos?priority=LOW
```

### Filter by Tag

```
GET https://toodoo-2o5c.onrender.com/api/todos?tag=backend
```

### Filter by Date Range

```
GET https://toodoo-2o5c.onrender.com/api/todos?startDateFrom=2025-07-01&startDateTo=2025-07-31
GET https://toodoo-2o5c.onrender.com/api/todos?endDateFrom=2025-07-01&endDateTo=2025-07-31
```

### Combined Filters with Pagination

```
GET https://toodoo-2o5c.onrender.com/api/todos?status=PENDING&priority=HIGH&tag=backend&sortBy=createdAt&sortDir=desc&page=0&size=10
```

**Postman Tests for Filtered Results:**

```javascript
pm.test("Status is 200 OK", function () {
  pm.response.to.have.status(200);
});

pm.test("All results match the filtered status", function () {
  const json = pm.response.json();
  json.data.content.forEach(function (todo) {
    pm.expect(todo.status).to.eql("PENDING");
  });
});

pm.test("All results match the filtered priority", function () {
  const json = pm.response.json();
  json.data.content.forEach(function (todo) {
    pm.expect(todo.priority).to.eql("HIGH");
  });
});

pm.test("Pagination metadata is present", function () {
  const json = pm.response.json();
  pm.expect(json.data).to.have.property("number");
  pm.expect(json.data).to.have.property("size");
  pm.expect(json.data).to.have.property("totalPages");
  pm.expect(json.data).to.have.property("totalElements");
});
```

---

## Enum Reference

### Priority Values

| Value  | Description   |
| ------ | ------------- |
| LOW    | Low priority  |
| MEDIUM | Default value |
| HIGH   | High priority |

### TodoStatus Values

| Value       | Description         |
| ----------- | ------------------- |
| PENDING     | Default on creation |
| IN_PROGRESS | Work has started    |
| COMPLETED   | Task is done        |
| CANCELLED   | Task was cancelled  |

---

## API Endpoint Summary

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

---

## Pre-request Script (Collection Level)

Place this on the collection root to auto-fetch and inject the bearer token before every request. Replace the auth URL and credentials with your actual values.

```javascript
pm.sendRequest(
  {
    url: "https://toodoo-2o5c.onrender.com/api/auth/login",
    method: "POST",
    header: { "Content-Type": "application/json" },
    body: {
      mode: "raw",
      raw: JSON.stringify({
        email: pm.environment.get("userEmail"),
        password: pm.environment.get("userPassword"),
      }),
    },
  },
  function (err, res) {
    if (!err) {
      const token = res.json().data.token;
      pm.environment.set("bearerToken", token);
    }
  },
);
```

Then set your collection Authorization to Bearer Token with value `{{bearerToken}}`.

---

## Environment Variables

Set these in your Postman environment for a smooth testing experience.

| Variable     | Example Value                      | Description                 |
| ------------ | ---------------------------------- | --------------------------- |
| baseUrl      | `https://toodoo-2o5c.onrender.com` | Base URL for all requests   |
| bearerToken  | `eyJhbGci...`                      | JWT token from login        |
| userEmail    | `user@example.com`                 | Login email                 |
| userPassword | `yourpassword`                     | Login password              |
| todoId       | `1`                                | Saved after creating a todo |
