# BloggersWay 🌏

BloggersWay is a MERN (MongoDB, Express, React, Node.js) application designed to provide users with a platform to create, view, and manage their blogs. The application offers features such as user authentication (login/logout), creating and updating blogs, as well as future capabilities to save favorite blogs.

## Tech Stack 🛠️

### Backend ⚙️
- MongoDB: NoSQL database used for storing blog data.
- Mongoose: MongoDB object modeling tool designed to work in an asynchronous environment.
- Node.js: JavaScript runtime environment used for building scalable network applications.
- Firebase: Used for image upload functionality.

### Frontend 💻
- React: JavaScript library for building user interfaces.
- Vite: Fast build tool for modern web development.
- React Router DOM: Declarative routing for React applications.
- Tailwind CSS: Utility-first CSS framework for building custom designs.
- Daisy UI: Tailwind CSS component library.
- Framer Motion: Animation library for React.
- Axios: Promise-based HTTP client for making requests from the browser.

## Installation

1. Clone the repository:

```
git clone https://github.com/ayussh-2/bloggersWay
```

2. Navigate to the project directory:

```
cd bloggersway
```

3. Install dependencies for the backend:

```
npm install
```

4. Navigate to the client directory:

```
cd client
```

5. Install dependencies for the frontend:

```
npm install
```

6. Create a `.env` file in the root directory and add necessary environment variables:

```
MONGODB_URI=<your_mongodb_uri>
PORT=4000 OR ANY DESIRED 
```

7. Start the backend server:

```
node server
```

8. BEFORE STARTING CREATE A .env FILE N RHE FRONTEND FOLDER AND ADD YOUR FIREBASE CONFIGS AS 
```
VITE_FIREBASE_API_KEY=******
AND THE REST 
```

9. Start the frontend development server:

```
npm run dev
```

10. Open your browser and navigate to `http://localhost:3000` to view the application.

## Features

- User authentication: Allows users to register, login, and logout.
- Create blog: Users can create new blogs with text content and upload images.
- View blogs: Users can view blogs created by themselves and others.
- Update blog (future update): Future update will include the ability for users to update their existing blogs.
- Save favorite blogs (future update): Future update will allow users to save blogs as favorites for quick access.

## Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests for any enhancements or bug fixes.
