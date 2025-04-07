### Base URL: `http://localhost:3000`

#### 📍 Upload Data API
- **Endpoint:** `POST /upload`
- **Description:** Uploads an Excel/CSV file and stores the data in MongoDB.
- **Request Example:**
  ```json
  {
    "file": "insurance-data.xlsx"
  }
  ```

#### 📍 Search Policy by Username
- **Endpoint:** `GET /policy/:username`
- **Description:** Fetches policy details for a given user.

#### 📍 Get Aggregated Policies for Users
- **Endpoint:** `GET /policies`
- **Description:** Returns all user policies grouped with a total count.

#### 📍 Schedule Message Storage
- **Endpoint:** `POST /schedule-message`
- **Description:** Stores a message in the database for a scheduled time.
- **Request Body:**
  ```json
  {
    "message": "Your policy is expiring soon!",
    "day": "Monday",
    "time": "10:00 AM"
  }
  ```

---

## 📌 Testing in Postman
1. Import `InsuranceApp.postman_collection.json` into Postman.
2. Make API requests using the defined endpoints.
3. Verify responses and debug using `npm run logs`.

---
