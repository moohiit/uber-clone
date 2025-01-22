# Backend API Documentation

## Table of Contents

- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [User Registration](#user-registration)
  - [User Login](#user-login)
- [Project Structure](#project-structure)

## Setup

1. Clone the repository

```bash
git clone <repository-url>
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables
4. Start the server

```bash
npm start
```

Environment Variables
Create a [.env] file in the root directory:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

## API Endpoints

### User Registration

**URL**: `/api/register`

**Method**: `POST`

**Description**: Registers a new user.

**Request Body**:

```json
{
  "firstname": "string",
  "lastname": "string",
  "email": "string",
  "password": "string"
}
```

**Response**:

- **Success** (201 Created):
  ```json
  {
    "message": "User created successfully",
    "success": true,
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "string",
        "lastname": "string"
      },
      "email": "string",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    },
    "token": "jwt_token"
  }
  ```
- **Error** (400 Bad Request):
  ```json
  {
    "message": "User already exists",
    "success": false
  }
  ```
  - **Error** (500 Server Error):
  ```json
    {
    "message": "User already exists",
    "success": false
    }
  ```

**Headers**:

- `Content-Type: application/json`

**Example**:

```bash
curl -X POST http://localhost:3000/api/register \
-H "Content-Type: application/json" \
-d '{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}'
```

### User Login

**URL**: `/api/login`

**Method**: `POST`

**Description**: Authenticates a user and returns a JWT token.

**Request Body**:

```json
{
  "email": "string",
  "password": "string"
}
```

**Response**:

- **Success** (200 OK):
  ```json
  {
    "message": "Login successful",
    "success": true,
    "token": "jwt_token"
  }
  ```
- **Error** (401 Unauthorized):
  ```json
  {
    "message": "Invalid email or password",
    "success": false
  }
  ```

**Headers**:

- `Content-Type: application/json`

**Example**:

```bash
curl -X POST http://localhost:3000/api/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "password123"
}'
```
### API Endpoints

#### `api/profile`
- **Description**: This endpoint retrieves the profile information of the authenticated user.
- **Method**: GET
- **Request Headers**:
  - `Authorization`: Bearer token for user authentication.
- **Response**:
  - `200 OK`: Returns the profile details of the user.
  - `401 Unauthorized`: If the user is not authenticated.
  - `500 Internal Server Error`: If there is an issue with the server.

#### `api/logout`
- **Description**: This endpoint logs out the authenticated user by invalidating their session.
- **Method**: POST
- **Request Headers**:
  - `Authorization`: Bearer token for user authentication.
- **Response**:
  - `200 OK`: If the user is successfully logged out.
  - `401 Unauthorized`: If the user is not authenticated.
  - `500 Internal Server Error`: If there is an issue with the server.
### Project Structure

### Token Storage

The JWT token is stored in an HTTP-only cookie to enhance security. This prevents client-side scripts from accessing the token directly.

**Example**:

```javascript
res.cookie('token', jwtToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // Set to true in production
  maxAge: 24 * 60 * 60 * 1000 // 1 day
});
```

To clear the cookie during logout:

```javascript
res.clearCookie('token');
```
```
backend/
├── .env
├── app.js
├── server.js
├── controllers/
│   └── user.controller.js
├── models/
│   └── user.model.js
├── routes/
│   └── user.routes.js
└── services/
    └── user.service.js
```
### Technologies Used
- Node.js & Express.js
- MongoDB & Mongoose
- JWT Authentication
- bcryptjs for password hashing
- Express Validator