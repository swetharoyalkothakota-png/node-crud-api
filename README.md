# Student and User CRUD API

A REST API built using Node.js, Express.js, and MongoDB to manage student and user records.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JavaScript

## Features

- Create, read, update, and delete student records.
- Create, read, update, and delete user records.
- Validate MongoDB document IDs.
- Handle duplicate user email addresses.
- Use environment variables for configuration.

## Project Structure

```text
node-crud-api1/
├── models/
│   ├── Student.js
│   └── User.js
├── .gitignore
├── package.json
├── package-lock.json
├── routes.js
├── server.js
└── README.md
```

## Installation

1. Install Node.js and MongoDB access.
2. Clone the repository:

   ```bash
   git clone https://github.com/swetharoyalkothakota-png/node-crud-api.git
   ```

3. Open the project folder:

   ```bash
   cd node-crud-api
   ```

4. Install dependencies:

   ```bash
   npm install
   ```

5. Create a `.env` file in the project root:

   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   ```

   Replace the placeholder with your own MongoDB connection string. Never upload real credentials to GitHub.

6. Start the server:

   ```bash
   node server.js
   ```

## API Endpoints

All endpoints use the base URL `http://127.0.0.1:5000/api`.

### General

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/test` | Test the API |

### Students

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/students` | Create a student |
| GET | `/students` | Get all students |
| GET | `/students/:id` | Get a student by ID |
| PUT | `/students/:id` | Update a student |
| DELETE | `/students/:id` | Delete a student |

### Users

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/users` | Create a user |
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get a user by ID |
| PUT | `/users/:id` | Update a user |
| DELETE | `/users/:id` | Delete a user |

## Testing

You can test the endpoints using PowerShell, Postman, or another HTTP client. For POST and PUT requests, send JSON data with the appropriate `Content-Type: application/json` header.

## Author

Swetha Kothakota

## License

No license has been specified yet.
