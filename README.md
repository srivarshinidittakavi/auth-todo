# Authorization-Based TODO Application

This project is a backend TODO application built using Node.js, Express, Supabase, and JWT-based authorization.
Each user can securely manage only their own todos.

## Features
- User signup and login
- Password hashing using bcrypt
- JWT authentication with 1 hour expiry
- Protected routes using middleware
- User-specific TODO CRUD operations
- Foreign key enforcement at database level

## Tech Stack
- Node.js
- Express.js
- Supabase (PostgreSQL)
- JSON Web Token (JWT)
- bcrypt

## Database Tables
- user1
- todo

## Setup Steps

1. Clone the repository
2. Install dependencies
   npm install
3. Create a .env file using .env.example
4. Run the server
   npm start

## API Endpoints

### Authentication
POST /signup  
POST /login  

### Todos (Protected)
POST /todos  
GET /todos  
PUT /todos/:id  
DELETE /todos/:id  

## Authorization Header

All protected routes require:

Authorization: Bearer <JWT_TOKEN>
Create a .env file using .env.example

## Notes
- userId is automatically extracted from JWT
- Users cannot access other users’ todos
