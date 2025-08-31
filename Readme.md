# PayEasy 💸

<div id="top" align="center">
 <img src="https://res.cloudinary.com/dxxeks4o5/image/upload/v1756624919/image_5_morwwi.png" alt="logo"/>
</div>

## Now transfer money 💸 hassle free with PayEasy
### 🎯 Aim:
To provide a **simple, secure, and user-friendly platform** where users can:  
- Send & receive money seamlessly  
- Add funds to their wallet via payment gateway (Razorpay)  
- Track their transaction history in real-time  

---

### 🥅 Goal:
To build a **fully functional peer-to-peer money transfer system** with:  
- **JWT authentication (cookies-based)** for security  
- **Real-time wallet balance updates**  
- **P2P and wallet transaction history** for complete transparency  
- **Robust backend transaction handling** with MongoDB transactions  
- A reliable **prototype for fintech solutions** like Paytm/PhonePe wallets
  
<br>

## 🚀 Features
- 🔐 **JWT Authentication** – Secure signup & signin with protected routes (cookies-based).  
- ➕ **Add Funds to Wallet** – Seamlessly add money using Razorpay integration.  
- 📋 **Dashboard View** – Real-time balance display, user list, and profile management modal.  
- 🔎 **Search Functionality** – Quickly find users to send money.  
- 💸 **Send Money Page** – Transfer balance using MongoDB transactions to ensure atomicity.  
- 🧾 **Transaction History** –  
  - View **P2P transactions history**  
  - View **Add Funds transactions history**  
- 👤 **User Profile Management** – Update user details via a modal.  

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
   FRONTEND_URL="http://localhost:5173"
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
