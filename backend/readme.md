# Backend API Documentation

## Table of Contents

- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [User Registration](#user-registration)
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
### Project Structure
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