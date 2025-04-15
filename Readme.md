# PayEasy 💸

<div id="top" align="center">
 <img src="https://res.cloudinary.com/dxxeks4o5/image/upload/v1744698767/0FEA8AD7-EF62-454B-B258-0D0F6AB166A5_dac1pt.png" alt="logo"/>
</div>

## Now transfer money 💸 hassle free with PayEasy
### 🎯 Aim:
- To provide a simple and secure web-based platform where users can send money to each other seamlessly, simulating real-time digital transactions.

### 🥅 Goal:
- To build a fully functional peer-to-peer money transfer system with user authentication, real-time balance updates, and robust backend transaction handling—ideal as a prototype for fintech solutions.

<br>

## 🚀 Features

- 🔐 **JWT Authentication**: Secure signup and signin with protected routes.
- 💰 **Artificial Wallet Funding**: Users receive an initial balance (₹2000–₹10000) upon registration.
- 📋 **Dashboard View**: Real-time balance display, user list, and profile management modal.
- 🔎 **Search Functionality**: Easily search users to send money.
- 💸 **Send Money Page**: Transfer balance using MongoDB transactions to ensure atomicity.
- 🧾 **User Profile Management**: Update user details via a modal.
- 🔓 **Logout**: Securely end sessions and redirect to signin page.

  <br>

## 🧑‍💻 Tech Stack

| Tech        | Description                           |
|-------------|---------------------------------------|
| **MongoDB** | NoSQL database with transaction support |
| **Express** | Backend server framework               |
| **React**   | Frontend library                       |
| **Tailwind Css**   | For UI                        |
| **Node.js** | Runtime environment                    |
| **JWT**     | Secure authentication mechanism        |
| **Mongoose**| MongoDB object modeling tool           |
| **Vite**| Build Tool           |
| **Context-API**| For state Management           |

<br>

> **Note**: If you are new to open source contributions, you can refer to [this](https://opensource.guide/how-to-contribute/) guide by GitHub.

<br>

# Getting Started
### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Vite

## Installation
1. **Clone the repository**

```sh
   git clone https://github.com/yourusername/Payment-App
   cd Payment-App
   ```

2. **Install backend dependencies**:

   ```sh
   cd Backend
   npm install
   ```

3. **Install frontend dependencies**:

   ```sh
   cd ../frontend
   npm install
   ```


## Running the Project

#### Backend
1. **Configure environment variables**:

   Create a `config.env` file in the `Backend` directory


   ```sh
   PORT = 3000
   JWT_SECRET = "YOUR JWT SECRET KEY"
   MONGO_URI = "YOUR MONGO DB CLUSTER CONNECTION STRING"
   ```

2. **Start the backend server**:

   ```sh
   cd Backend
   node server.js
   ```

   The backend server will start on `http://localhost:3000`.


#### Frontend
1. **Configure environment variables**:

   Create a `.env` file in the `frontend` directory


   ```sh
   VITE_URL='YOUR BACKENT API URL'
   ```

2. **Start the frontend server**:

   ```sh
   cd ../frontend
   npm run dev
   ```

   The frontend application will start on `http://localhost:5173`.


<br>

## 📜 License
This project is licensed under the MIT License.

## 🤠 Project Admin 

<a href="https://github.com/parasss19"> <img src="https://res.cloudinary.com/dxxeks4o5/image/upload/v1695653091/admin_bdga2f_yla8qm.png" height="80px"/></a>

<p align="right">(<a href="#top">Back to top</a>)</p>
