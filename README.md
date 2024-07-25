Real-Time Chat App
Welcome to our real-time chat application! This project utilizes Node.js and Express for the backend, React for the frontend, and ChatEngine API to streamline the chat functionalities.

Features
Real-time messaging
User authentication
Chat rooms
Responsive design

Technologies Used
Backend: Node.js, Express
Frontend: React
Chat API: ChatEngine API
Styling: CSS

Getting Started
Prerequisites
Make sure you have the following installed on your machine:

Node.js
npm (Node Package Manager)
Installation
Clone the repository
bash
Copy code
git clone https://github.com/Hatimsel/portfolio_project
cd portfolio_project
Install dependencies
bash
Copy code
# For the backend
cd backend
npm install

# For the frontend
cd ../frontend
npm install
Set up ChatEngine API

Create an account on ChatEngine.
Create a new project and obtain the Project ID and Private Key.
Configure environment variables

Create a .env file in the server directory and add the following:

env
Copy code
CHATENGINE_PROJECT_ID=your_project_id
CHATENGINE_PRIVATE_KEY=your_private_key
Running the Application
Start the backend server
bash
Copy code
cd backend
npm start
The backend server will be running on http://localhost:3001.

Start the frontend
bash
Copy code
cd ../frontend
npm run dev
The frontend will be running on http://localhost:5173.

Usage
Register an account: Create a new account or log in with an existing one.
Create/Join chat rooms: Start a new chat room or join existing ones.
Send messages: Enjoy real-time messaging with other users.
Contributing
We welcome contributions! If you have any ideas or suggestions, feel free to open an issue or create a pull request.

