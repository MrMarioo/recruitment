# Frontend Developer Recruitment Task

Welcome! This repository is designed to test your skills as a frontend developer. The task involves working with a backend server and creating a simple Twitter-like application on the frontend with full CRUD (Create, Read, Update, Delete) capabilities.

## Repository Structure

The repository contains two main folders:

1. **Backend**
2. **Frontend**

### Backend

The `Backend` folder contains a simple JSON server which will serve as an example API. This server allows you to perform CRUD operations on posts or any other structures you may need. To get the backend running, follow these steps:

1. **Navigate to the Backend Folder**:
    ```bash
    cd Backend
    ```

2. **Install Dependencies**:
    ```bash
    yarn install
    ```

3. **Start the JSON Server**:
    ```bash
    yarn dev
    ```

   The server will run on `http://localhost:3000` and provide endpoints for CRUD operations on posts.

   Example to create a post:
   ```bash
   POST http://localhost:3000/api/posts
   ``` 

   Example to get a list of posts 
   ```bash
   GET http://localhost:3000/api/posts
   ```

### Frontend

The `Frontend` folder is where you will create your application. Your task is to build a simple Twitter-like application with the following requirements:

1. **Display Posts**:
   - Fetch and display a list of posts from the backend server.

2. **Create Post**:
   - Provide a form to create a new post. The new post should be sent to the backend server and added to the list of posts.
   - Example to create a post: Send a POST request to `/api/posts`.

3. **Update Post**:
   - Allow users to edit an existing post. The updated post should be sent to the backend server and updated in the list.

4. **Delete Post**:
   - Allow users to delete a post. The deletion should be sent to the backend server and the post should be removed from the list.

### Getting Started

1. **Install Dependencies**:
    - Navigate to the `Frontend` folder and install the required dependencies.
    ```bash
    cd frontend
    yarn install
    ```

2. **Start the Frontend Server**:
    ```bash
    yarn start
    ```

   The application should run on `http://localhost:8081` or another port specified by your configuration.

### Requirements

- Use **React**, **Redux**, **MaterialUI**, and **ReactRouter** to demonstrate your skills.
- Propose a design for the application.
- Write tests for your components to ensure code quality and reliability.

### Tips

- Ensure your UI is user-friendly and responsive.
- Handle API errors gracefully and provide appropriate feedback to the user.
- Write clean, maintainable, and well-documented code.


### Submission

Once you have completed the task, please submit your solution by following these steps:

1. **Create a New Branch**:
   - Name the branch with your name.
   ```bash
   git checkout -b your-name
   ```

2. **Push the Branch to the Repository**:
   ```bash
   git add .
   git commit -m "Complete recruitment task"
   git push origin your-name
   ```

3. **Notify Us**:
   - Let us know when you are ready for your submission to be reviewed.

Ensure all necessary instructions to run your application are included in the repository.