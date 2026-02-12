# API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

### Register User
**POST** `/auth/register`

-   **Body**:
    ```json
    {
      "username": "johndoe",
      "email": "john@example.com",
      "password": "secretpassword"
    }
    ```
-   **Response**: `201 Created` - Returns User object + JWT.

### Login User
**POST** `/auth/login`

-   **Body**:
    ```json
    {
      "username": "johndoe",
      "password": "secretpassword",
      "role": "user" // Optional: "admin" or "user" (if you are admin)
    }
    ```
-   **Response**: `200 OK` - Returns User object + JWT.

---

## Alerts (Protected - Requires Bearer Token)

### Get All Alerts
**GET** `/alerts`

-   **Headers**: `Authorization: Bearer <token>`
-   **Response**: `200 OK` - Array of alert objects.

### Create Alert
**POST** `/alerts`

-   **Headers**: `Authorization: Bearer <token>`
-   **Body**:
    ```json
    {
      "symbol": "BTC",
      "targetPrice": 50000,
      "condition": "above" // or "below"
    }
    ```
-   **Response**: `201 Created`

### Delete Alert
**DELETE** `/alerts/:id`

-   **Headers**: `Authorization: Bearer <token>`
-   **Response**: `200 OK` - `{ "message": "Alert removed" }`
-   **Note**: Users can only delete their own alerts. Admins can delete any alert.
