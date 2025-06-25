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

## 🚀 Features

- JWT-based authentication with token stored in HTTP-only cookies  
- CRUD operations for job postings  
- Secure routes to fetch job applications with token verification  
- Data aggregation: joins job info with applications  
- CORS configured to allow frontend requests  

---

## 📦 Dependencies

```bash
cookie-parser
cors
dotenv
express
jsonwebtoken
mongodb
