# 🛒 Cartify – Modern E-commerce Web App

🚀 **Live Preview:** https://cartify-five-xi.vercel.app/

Cartify is a modern, responsive, and feature-rich e-commerce web application built using **React + Vite + Tailwind CSS**.
It provides a smooth shopping experience with features like product browsing, cart management, wishlist, authentication, and dark mode.

---

## ✨ Features

### 🏠 Core Features

* 🛍️ Product Listing with filters & sorting
* 🔍 Search functionality
* 📦 Product Details page with image gallery
* 🛒 Add to Cart / Remove / Update Quantity
* ❤️ Wishlist system
* 💳 Checkout flow (mock)
* 🔐 Login / Signup (localStorage-based auth)
* 👤 User Dashboard & Orders page

---

### 🌙 UI/UX Features

* 🌗 Dark Mode Toggle (saved in localStorage)
* 📱 Fully Responsive (Mobile-first design)
* 🎨 Modern UI using Tailwind CSS
* ⚡ Fast performance with Vite

---

### 🇮🇳 India-Focused Features

* 💰 Prices in Indian Rupees (₹)
* 🚚 Delivery info (Free delivery, estimated days)
* 💵 Cash on Delivery (COD) option
* 📲 UPI payment option (UI only)
* 📍 Pincode check (UI)

---

### ⭐ Advanced Features

* ✍️ Write a Review (star rating + comments)
* 🖼️ Product Image Gallery with thumbnails
* 🔍 Zoom-on-hover image effect
* 📊 Dynamic ratings & review count
* 💾 LocalStorage persistence (cart, wishlist, auth)

---

## 🛠️ Tech Stack

* **Frontend:** React (Vite)
* **Styling:** Tailwind CSS
* **Routing:** React Router
* **State Management:** Context API
* **Storage:** LocalStorage
* **Deployment:** Vercel

---

## 📁 Project Structure

```
src/
  components/    # Reusable UI components
  contexts/      # Global state (cart, auth, wishlist)
  data/          # Mock product data
  hooks/         # Custom hooks
  lib/           # Utility functions
  pages/         # Application pages
  App.tsx        # Main app component
  main.tsx       # Entry point
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Abhishekkumarsharma1001/Cartify.git
cd Cartify
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run locally

```bash
npm run dev
```

👉 Open: `http://localhost:5173/`

---

## 🚀 Deployment

This project is deployed on **Vercel**.

To deploy:

1. Push code to GitHub
2. Import project in Vercel
3. Use:

   * Build Command: `npm run build`
   * Output Directory: `dist`

---

## 🔧 Important Configuration

For React Router support on Vercel:

Create `vercel.json` in root:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

---

## 📌 Future Improvements

* 🔐 Firebase Authentication
* 💳 Razorpay / Stripe Integration
* 📦 Backend with Node.js & MongoDB
* 🧾 Order tracking system
* 🌐 Multi-language support (Hindi/English)
* 🎯 Recommendation system

---

## 👨‍💻 Author

**Abhishek Kumar Sharma**
GitHub: https://github.com/Abhishekkumarsharma1001
Linkedin: https://www.linkedin.com/in/abhishek-kumar-sharma-3b2bb0213/

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!

---

## 📄 License

This project is open-source and available under the MIT License.
