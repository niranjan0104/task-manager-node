# task-manager-node
task management app

# Prerequisites
- Node.js
- MySQL
- MongoDB
- Postman

---

# Project Setup

# 1. Create environment file
Create a `.env` file in the root folder and add the following variables: (I have added in the email for reference)

# 2. Install dependencies
npm install

# 3. Database setup
MySQL:
Create a MySQL database named: task_db
Update MySQL credentials in the .env file
MongoDB:
Update the MongoDB URL in the `.env` file 
eg: mongodb://localhost:27017/taskdb

# 4. Run migrations
npx knex migrate:latest

# 5. Start the server
npm run start
http://localhost:5000

# 6. API Usage In Postman
Open Postman
Import TASK_MANAGEMENT.postman_collection
All APIs will appear automatically

# 7. Set Base URL
Create a Postman environment with:
BASE_URL = http://localhost:5000

OR

Replace {{BASE_URL}} directly with http://localhost:5000

# 8. Authentication Flow
Register user
POST {{BASE_URL}}/register

# 9. Login
POST {{BASE_URL}}/login

# 10. Authorized requests
authorization: <Access-token> received in login header response

# 11 Create Task
POST {{BASE_URL}}/tasks

Pass the authorization token
Same token can be used for other task APIs







