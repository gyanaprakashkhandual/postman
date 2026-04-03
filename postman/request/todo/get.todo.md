## Get All Todos
 
**Method:** GET  
**URL:** `https://toodoo-2o5c.onrender.com/api/todos`
 
**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters (all optional):**
 
| Parameter     | Type   | Example            | Description                          |
|---------------|--------|--------------------|--------------------------------------|
| search        | string | `project`          | Full-text search on title, description, notes |
| status        | string | `PENDING`          | Filter by status                     |
| priority      | string | `HIGH`             | Filter by priority                   |
| tag           | string | `backend`          | Filter by tag                        |
| startDateFrom | date   | `2025-07-01`       | Filter todos starting from this date |
| startDateTo   | date   | `2025-07-31`       | Filter todos starting before this date |
| endDateFrom   | date   | `2025-07-01`       | Filter todos ending from this date   |
| endDateTo     | date   | `2025-07-31`       | Filter todos ending before this date |
| sortBy        | string | `createdAt`        | Field to sort by                     |
| sortDir       | string | `desc`             | Sort direction: `asc` or `desc`      |
| page          | int    | `0`                | Page number (zero-based)             |
| size          | int    | `20`               | Page size                            |
 