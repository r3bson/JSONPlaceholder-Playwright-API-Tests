# Test Cases — API (JSONPlaceholder)

> Target base URL: `https://jsonplaceholder.typicode.com`

---

## Suite Preconditions (common)

- API is reachable from test environment.
- Test runner configured with Playwright fixtures `postsRequest` and `usersRequest` and assertion helpers from `assertions.api`.
- For readability of GET-by-ID scenarios, a **known existing ID `1`** is used (writes on JSONPlaceholder do not persist).

---

## /posts

### TC-posts-01 — (GET) Fetch all posts

**Description**: Validate that `GET /posts` returns a JSON array of posts and standard headers.  
**Precondition**: API reachable, posts are pre-existing in database
**Steps**:
1. Send `GET /posts`

**Expected result**:

- Status code **200**
- Valid headers present
- Body is an **array** of post objects,
- Schema is correct

---

### TC-posts-02 — (GET) Fetch particular post ID

**Description**: Validate that `GET /posts/{id}` returns an existing post.  
**Precondition**: Known existing post ID: **1**.  
**Steps**:
1. Send `GET /posts/1`

**Expected result**:

- Status code **200**.
- Valid headers present
- Body is a **single post object** with required fields

---

### TC-posts-03 — (GET) Fetch non-existing post ID

**Description**: Validate that `GET /posts/{non_existing_id}` returns correct error.
**Precondition**: Chosen non-existing ID: **9999**.  
**Steps**:
1. Send `GET /posts/9999`

**Expected result**:

- Status code **404**.
- Valid headers present
- Body equals **`{}`** (empty object).

---

### TC-posts-04 — (POST) Create a new post

**Description**: Verify that creating a post returns proper status code, body and headers  
**Precondition**: -  
**Steps**:
1. Send `POST /posts` with `postPayload`

**Expected result**:

- Status code **201**.
- Valid headers present
- Body is a **single post object** with required fields

---

### TC-posts-05 — (PUT) Update a non-existing post

**Description**: Verify error handling when updating a non-existing post.  
**Precondition**: Non-existing ID **9999**;
**Steps**:
1. Send `PUT /posts/9999` with `postPayload`
 
**Expected result**:

- Status code **400** (client error for invalid/non-existing resource). 
- Valid headers present 
  _(Note: Implementation under test was observed to return **500** with stack trace — security concern; to be logged as a defect.)_
  _(Note: Incorrect header content-type returned; to be logged as a defect.)_

---

### TC-posts-06 — (DELETE) Delete an existing post

**Description**: Verify deletion of an existing post.  
**Precondition**: Known existing post ID **1**.  
**Steps**:
1. Send `DELETE /posts/1`

**Expected result**:

- Status code **204 No Content**.
- Valid headers present 
- Body equals **`{}`** (empty object).
_(Note: Implementation under test was observed to return **200** to be logged as a defect.)_

---

### TC-posts-07 — (PUT) Update existing post with multiple consecutive payloads (DDT)

**Description**: Data-driven test verifying idempotent structure and acceptance across multiple payloads.  
**Precondition**: Existing ID **1**; array `dataDrivenPayload` of update objects.  
**Steps**:
1. For each payload in `dataDrivenPayload`:
   - Send `PUT /posts/1` with the payload.

**Expected result**:

- Each iteration returns status **200**.
- Valid headers present 
- Response body **matches** the corresponding payload 

---

## /users

### TC-users-01 — (GET) Fetch all users

**Description**: Validate that `GET /users` returns a JSON array of users and standard headers.  
**Precondition**: API reachable; users are pre-existing in database
**Steps**:
1. Send `GET /users` 

**Expected result**:

- Status code **200**.
- Valid headers present
- Body is an **array** of user objects,
- Schema is correct

---

### TC-users-02 — (GET) Fetch particular user ID

**Description**: Validate that `GET /users/{id}` returns an existing user.  
**Precondition**: Known existing user ID **1**.  
**Steps**:

1. Send `GET /users/1`

**Expected result**:

- Status code **200**.
- Valid headers present
- Body is a **single user object** with required fields 

---

### TC-users-03 — (GET) Fetch non-existing user ID

**Description**: Verify behavior for a non-existing user.  
**Precondition**: Non-existing ID **9999**.  
**Steps**:

1. Send `GET /users/9999` 

**Expected result**:

- Status code **404**.
- Body equals **`{}`** (empty object).

---

### TC-users-04 — (POST) Create a new user with incomplete payload

**Description**: Verify that the API rejects incomplete payloads for user creation.  
**Precondition**: `incompleteUserPayload` JSON available (missing required fields).  
**Steps**:

1. Send `POST /users` with `incompleteUserPayload` via `usersRequest.post(...)`.

**Expected result**:

- Status code **400** (validation error).  
  _(Note: Implementation under test was observed to return **201**; to be logged as a defect. No error body returned by the fake API.)_

---

## Notes

- JSONPlaceholder is a **fake** API for write operations; IDs from POST/PUT/PATCH/DELETE are not persisted. Test design therefore uses known existing IDs for GET operations and focuses on response contracts and headers.
