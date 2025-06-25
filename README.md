# Travel Sphere - Server Side

Backend API server for the Travel Sphere platform.  
Built with Express.js, MongoDB, and JWT authentication to manage job postings and applications.

---

## 🛠️ Technologies Used

- **Node.js & Express** – Web framework and server setup  
- **MongoDB** – NoSQL database for storing jobs and applications  
- **JWT (jsonwebtoken)** – Authentication with JSON Web Tokens  
- **Cors** – Cross-origin resource sharing  
- **Cookie-parser** – To parse cookies for JWT authentication  
- **Dotenv** – Manage environment variables  

---

## 🚀 Features & API Endpoints Overview

### Authentication
- **POST `/jwt`**  
  Generates a JWT token based on user info provided in the request body.  
  The token is sent back as an HTTP-only cookie for secure authentication.

### Jobs Management
- **GET `/jobs`**  
  Retrieves all job postings. Supports optional query parameter `email` to filter jobs posted by a specific HR email.

- **GET `/jobs/:id`**  
  Fetches details for a single job by its unique ID.

- **POST `/jobs`**  
  Creates a new job posting with data sent in the request body.

### Job Applications
- **GET `/applications`** (Protected)  
  Retrieves applications submitted by a logged-in user. Uses JWT token from cookies to verify access.  
  Additionally, enriches each application with corresponding job info such as company name, title, and logo.

- **GET `/applications/job/:job_id`**  
  Lists all applications submitted for a specific job by job ID.

- **POST `/applications`**  
  Submits a new application for a job.

---

## 📦 Dependencies

```bash
cookie-parser
cors
dotenv
express
jsonwebtoken
mongodb
