# 🥗 Corporate Kitchens – Client Settings Module (Assessment Project)

Corporate Kitchens is a platform designed to help organizations—such as companies, schools, and institutions—streamline food ordering for their employees or members.  
This project is a simplified version of the **Client Settings page**.

---

## 📌 Project Overview

This web application allows system administrators to:

- 🔐 Log in securely
- ⚙️ Access their assigned client’s settings
- ✏️ Edit and update configuration details
- 💾 Save client settings with persistent storage
- 🎨 Experience a clean and user-friendly UI

> All data is stored locally to simulate a backend system.

---

## 🎯 Assessment Objectives

This project evaluates the ability to:

- Build a clean, maintainable **React** application
- Work with **localForage** as a simulated database
- Implement **authentication** and **protected routes**
- Manage application **state logically**
- Follow a provided **UI design** accurately
- Offer a smooth experience using **form validation** + **toastr notifications**

---

## 🛠 Technology Stack

| Frontend       | State Management | Styling       | Routing       | Notifications   | Persistence       |
|----------------|----------------|--------------|---------------|----------------|-----------------|
| React (Vite)   | Redux Toolkit   | Tailwind CSS | React Router  | react-toastify | localForage     |

---

## 📂 Data Source (Simulated Backend)

- `team-members.json` – List of administrators  
- `clients.json` – List of clients  

> These JSON files simulate the backend database.

---

## 🔐 Authentication Flow

### Login

1. User logs in using **email + password**  
2. Credentials are validated against `team-members.json`  
3. **If valid:**  
   - Save session state to `localForage`  
   - Redirect user to `/settings`  
4. **If invalid:**  
   - Show error alert (toastr)  
   - Stay on login page  

### Protected Routes

- Only authenticated users can access the Settings page  
- Refreshing the page maintains user authentication  

---

## ⚙️ Settings Page Functionality

After login, the app:

- Loads the client matched by the admin’s `client_id`  
- Pre-fills the settings form with stored client data  
- Displays admin information in the header  

### Admin Can Update:

- Subsidy type  
- Subsidy value  
- Payment method  

### On Save:

- Validate all required fields  
- Save updated data to `localForage`  
- Show success notification  

---

## 🧩 Architecture & Best Practices

- Component-based architecture  
- Clean folder structure  
- Clear separation of concerns:  
  - Authentication logic  
  - Settings form logic  
  - Reusable UI components  

---

## 🚀 How to Run the Project

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd corporate-kitchens

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev

# 4. Open in browser
http://localhost:5173


##Project Hosted Link
https://mawuse.netlify.app/
