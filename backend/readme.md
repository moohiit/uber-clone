# Backend API Documentation

## Table of Contents

- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [User Registration](#user-registration)
  - [User Login](#user-login)
  - [User Profile](#user-profile)
  - [User Logout](#user-logout)
  - [Captain Registration](#captain-registration)
  - [Captain Login](#captain-login)
  - [Captain Profile](#captain-profile)
  - [Captain Logout](#captain-logout)
  - [Maps API](#maps-api)
  - [Ride API](#ride-api)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)

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

### Environment Variables

Create a [.env] file in the root directory:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3000
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## API Endpoints

### User Registration

**URL**: `/api/user/register`

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

**URL**: `/api/user/login`

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

### User Profile

**URL**: `/api/user/profile`

**Method**: `GET`

- **Description**: This endpoint retrieves the profile information of the authenticated user.
- **Method**: GET
- **Request Headers**:
  - `Authorization`: Bearer token for user authentication.
- **Response**:
  - `200 OK`: Returns the profile details of the user.
  - `401 Unauthorized`: If the user is not authenticated.
  - `500 Internal Server Error`: If there is an issue with the server.

### User Logout

**URL**: `/api/user/logout`

**Method**: `GET`

- **Description**: This endpoint logs out the authenticated user by invalidating their session.
- **Method**: POST
- **Request Headers**:
  - `Authorization`: Bearer token for user authentication.
- **Response**:
  - `200 OK`: If the user is successfully logged out.
  - `401 Unauthorized`: If the user is not authenticated.
  - `500 Internal Server Error`: If there is an issue with the server.

### Captain Registration

**URL**: `/api/captain/register`

**Method**: `POST`

**Description**: Registers a new captain.

**Request Body**:

```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string",
  "vehicle": {
    "color": "string",
    "plate": "string",
    "capacity": "number",
    "vehicleType": "string"
  }
}
```

**Response**:

- **Success** (201 Created):
  ```json
  {
    "message": "Captain created successfully",
    "success": true,
    "captain": {
      "_id": "captain_id",
      "fullname": {
        "firstname": "string",
        "lastname": "string"
      },
      "email": "string",
      "vehicle": {
        "color": "string",
        "plate": "string",
        "capacity": "number",
        "vehicleType": "string"
      },
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    },
    "token": "jwt_token"
  }
  ```
- **Error** (400 Bad Request):
  ```json
  {
    "message": "Validation Error please send correct data.",
    "success": false,
    "error": []
  }
  ```
- **Error** (500 Server Error):
  ```json
  {
    "message": "Internal server error",
    "success": false
  }
  ```

**Headers**:

- `Content-Type: application/json`

**Example**:

```bash
curl -X POST http://localhost:3000/api/captain/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "red",
    "plate": "ABC1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}'
```

### Captain Login

**URL**: `/api/captain/login`

**Method**: `POST`

**Description**: Authenticates a captain and returns a JWT token.

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
curl -X POST http://localhost:3000/api/captain/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "password123"
}'
```

### Captain Profile

**URL**: `/api/captain/profile`

**Method**: `GET`

**Description**: Retrieves the profile information of the authenticated captain.

**Headers**:

- `Authorization: Bearer <token>`

**Response**:

- **Success** (200 OK):
  ```json
  {
    "message": "Profile fetched successfully.",
    "success": true,
    "captain": {
      "_id": "captain_id",
      "fullname": {
        "firstname": "string",
        "lastname": "string"
      },
      "email": "string",
      "vehicle": {
        "color": "string",
        "plate": "string",
        "capacity": "number",
        "vehicleType": "string"
      },
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  }
  ```
- **Error** (401 Unauthorized):
  ```json
  {
    "message": "Unauthorized",
    "success": false
  }
  ```
- **Error** (500 Server Error):
  ```json
  {
    "message": "Internal server error",
    "success": false
  }
  ```

**Example**:

```bash
curl -X GET http://localhost:3000/api/captain/profile \
-H "Authorization: Bearer <token>"
```

### Captain Logout

**URL**: `/api/captain/logout`

**Method**: `GET`

**Description**: Logs out the authenticated captain by invalidating their session.

**Headers**:

- `Authorization: Bearer <token>`

**Response**:

- **Success** (200 OK):
  ```json
  {
    "message": "Captain logged out successfully.",
    "success": true
  }
  ```
- **Error** (401 Unauthorized):
  ```json
  {
    "message": "Unauthorized",
    "success": false
  }
  ```
- **Error** (500 Server Error):
  ```json
  {
    "message": "Internal server error",
    "success": false
  }
  ```

**Example**:

```bash
curl -X GET http://localhost:3000/api/captain/logout \
-H "Authorization: Bearer <token>"
```

### Maps API

**URL**: `/api/maps/directions`

**Method**: `GET`

**Description**: Retrieves directions between two locations using Google Maps API.

**Request Parameters**:

- `origin`: The starting point for the directions.
- `destination`: The ending point for the directions.

**Headers**:

- `Authorization: Bearer <token>`

**Response**:

- **Success** (200 OK):
  ```json
  {
    "message": "Directions fetched successfully.",
    "success": true,
    "directions": {
      // Google Maps directions response
    }
  }
  ```
- **Error** (401 Unauthorized):
  ```json
  {
    "message": "Unauthorized",
    "success": false
  }
  ```
- **Error** (500 Server Error):
  ```json
  {
    "message": "Internal server error",
    "success": false
  }
  ```

**Example**:

```bash
curl -X GET "http://localhost:3000/api/maps/directions?origin=place1&destination=place2" \
-H "Authorization: Bearer <token>"
```

### Ride API

**URL**: `/api/ride/request`

**Method**: `POST`

**Description**: Requests a new ride.

**Request Body**:

```json
{
  "origin": "string",
  "destination": "string",
  "passengerId": "string",
  "captainId": "string"
}
```

**Headers**:

- `Authorization: Bearer <token>`
- `Content-Type: application/json`

**Response**:

- **Success** (201 Created):
  ```json
  {
    "message": "Ride requested successfully.",
    "success": true,
    "ride": {
      "_id": "ride_id",
      "origin": "string",
      "destination": "string",
      "passengerId": "string",
      "captainId": "string",
      "status": "requested",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  }
  ```
- **Error** (400 Bad Request):
  ```json
  {
    "message": "Validation Error please send correct data.",
    "success": false,
    "error": []
  }
  ```
- **Error** (500 Server Error):
  ```json
  {
    "message": "Internal server error",
    "success": false
  }
  ```

**Example**:

```bash
curl -X POST http://localhost:3000/api/ride/request \
-H "Authorization: Bearer <token>" \
-H "Content-Type: application/json" \
-d '{
  "origin": "place1",
  "destination": "place2",
  "passengerId": "passenger_id",
  "captainId": "captain_id"
}'
```

### Token Storage

The JWT token is stored in an HTTP-only cookie to enhance security. This prevents client-side scripts from accessing the token directly.

**Example**:

```javascript
res.cookie("token", jwtToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // Set to true in production
  maxAge: 24 * 60 * 60 * 1000, // 1 day
});
```

To clear the cookie during logout:

```javascript
res.clearCookie("token");
```

### Project Structure

```
backend/
├── .env
├── app.js
├── server.js
├── controllers/
│   ├── user.controller.js
│   ├── captain.controller.js
│   ├── maps.controller.js
│   └── ride.controller.js
├── models/
│   ├── user.model.js
│   ├── captain.model.js
│   └── ride.model.js
├── routes/
│   ├── user.routes.js
│   ├── captain.routes.js
│   ├── maps.routes.js
│   └── ride.routes.js
└── services/
    ├── user.service.js
    ├── captain.service.js
    ├── maps.service.js
    └── ride.service.js
```

### Technologies Used

- Node.js & Express.js
- MongoDB & Mongoose
- JWT Authentication
- bcryptjs for password hashing
- Express Validator
- Google Maps API
