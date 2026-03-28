# 🎒 Campus Lost and Found System

A full-stack web application designed to help students easily report, search, and recover lost items within a campus.  
This platform improves item tracking, reduces loss, and ensures faster recovery using a simple and user-friendly interface.

---

## 🚀 Live Overview

🔹 Users can report lost or found items  
🔹 Search items using filters  
🔹 Match lost items with found items  
🔹 Secure login & registration system  

---

## 🛠️ Tech Stack

### 🌐 Frontend
- React.js
- HTML5, CSS3, JavaScript

### ⚙️ Backend
- Spring Boot (Java)
- REST API

### 🗄️ Database
- MySQL

### 🔧 Tools
- Git & GitHub
- Eclipse IDE
- VS Code
- Postman (API Testing)

---

## 📁 Project Structure
lost_found_app/
│
├── 📁 frontend/                      # React Application
│   ├── 📁 public/
│   │   └── index.html
│   │
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── 📁 LoginComponent/
│   │   │   ├── 📁 ItemComponent/
│   │   │   ├── 📁 Profile/
│   │   │   └── 📁 Dashboard/
│   │   │
│   │   ├── 📁 services/
│   │   │   ├── LoginService.js
│   │   │   ├── FoundItemService.js
│   │   │   ├── LostItemService.js
│   │   │   └── MatchItemService.js
│   │   │
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles.css
│   │
│   ├── package.json
│   └── README.md
│
├── 📁 backend/                       # Spring Boot Application
│   ├── 📁 src/main/java/
│   │   └── 📁 com/infosys/lostfound/
│   │       ├── 📁 controller/
│   │       ├── 📁 service/
│   │       ├── 📁 repository/
│   │       ├── 📁 model/
│   │       └── 📁 dto/
│   │
│   ├── 📁 src/main/resources/
│   │   ├── application.properties
│   │
│   ├── pom.xml
│   └── mvnw
│
├── .gitignore
├── README.md


3. Run Backend
Open project in Eclipse
Navigate to:
lostFoundLocatorApplication
Run as:
Spring Boot App

Backend runs on:
👉 http://localhost:9595

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
