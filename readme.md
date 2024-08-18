### **Backend README**

---

# Product Search and Filter Backend

This is the backend of the single-page e-commerce website. The backend is responsible for handling product data, including searching, filtering, sorting, and pagination. It also supports authentication with Google and Email/Password via Firebase. The backend is built using Node.js, Express.js, and MongoDB.

## Features

- **API Endpoints**: Provides endpoints to fetch products with options for pagination, filtering, searching, and sorting.
- **Data**: Supports at least 40 product entries with fields such as name, image, description, price, category, and creation date.
- **Pagination**: Loads products efficiently using pagination on the backend.
- **Authentication**: Firebase authentication integration for both Google and Email/Password sign-in.
- **Clean Code**: Follows best practices with meaningful commit history and well-commented code.

## Project Setup

### Prerequisites

Make sure you have the following installed:

- Node.js
- MongoDB (local or cloud-based, e.g., MongoDB Atlas)
- NPM (Node Package Manager)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Fahmudul/ECommerce-Backend.git
```

2. Navigate into the project directory:

```bash
cd backend
```

3. Install the dependencies:

```bash
npm install
```

### Running the Project

1. Make sure MongoDB is running on your system.
2. Start the backend server:

```bash
npm run start
```

3. The server will run on [http://localhost:5000](http://localhost:5000).

### API Endpoints

- **GET** `/api/products`  
  Fetch products with pagination, filtering, sorting, and search options.

- **POST** `/api/products`  
  Insert new product data (optional API if you chose to insert manually).

### Environment Variables

Create a `.env` file in the root directory and add your MongoDB and Firebase credentials:

```bash
MONGO_URI=your_mongo_db_uri
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id
```

### Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)
- Firebase (for authentication)

### Folder Structure

```
/src
  /controllers
    productController.js
  /models
    productModel.js
  /routes
    productRoutes.js
  /utils
    db.js
  server.js
  ...
```

### Deployment

You can deploy the backend using services like Heroku, AWS, or DigitalOcean.

---

These README files include all the necessary information to help others set up and run your frontend and backend projects locally. They also describe the core functionalities and technologies used in the project.