# NASA Data Explorer

An interactive web application to explore data from multiple NASA APIs — including Astronomy Picture of the Day (APOD), Near Earth Objects (NEO), EPIC Earth imagery and NASA's Image & Video Library.

Built using **React + Redux Toolkit + Tailwind CSS** for frontend and **Express.js** for backend. Designed as a **progressive web app (PWA)** and deployed on **Vercel** and **Render**.

---

## Live Demo

-  Frontend: [nasa-data-explorer.vercel.app](https://nasa-data-explorer-xi.vercel.app/)


---

## 📁 Project Structure
nasa-data-explorer/
├──frontend #React
│ ├── public/
│ ├── src/
    ├── assets/
│ │ ├── components/
│ │ ├── constants/
│ │ ├── contexts/
    ├── helpers/
    ├── pages/
│ │ ├── redux/ # Redux slices & store
│ │ └── services
│ └── ...
├──backend #Node.js
│ ├── logs/
│ ├── routes/
│ ├── middleware/
│ ├── services/
  ├── tests/
│ └── index.js
├── README.md
├── .env
└── ...


---

## Features

- **APOD**: View Astronomy Picture of the Day with date filters & favorites
- **EPIC**: Browse Earth images in carousel with coordinates
- **NEO**: Analyze Near-Earth Objects with charts & filters
- **NASA Media**: Search NASA’s image/video library with preview
- Responsive design with Tailwind
- Redux + Redux Persist for state management
- Test cases with Jest (backend) 
- Secure CORS & API handling
- Progressive Web App (PWA) support

---

## Setup Instructions

### Clone the repository

```bash
git clone https://github.com/Pravalika8/nasa-data-explorer.git
cd nasa-data-explorer

### Environment Variables
.env(backend)
    -NASA_PUBLIC_API=https://api.nasa.gov
    -NASA_API_KEY=DEMO_KEY
    -NASA_IMAGE_API=https://images-api.nasa.gov
    -CLIENT_ORIGIN=http://localhost:3000

.env(frontend)
    -REACT_APP_BACKEND_API =http://localhost:5000

### Deployment
Frontend (Vercel)
    -Push frontend to GitHub
    -Import repo on Vercel
    -Set REACT_APP_API_URL in Vercel Environment Variables
    -Output directory: build

Backend (Render)
    -Push backend/ to GitHub
    -Import repo to Render
    -Set environment variables
    -Use npm start as start command
    -Expose port (Render sets it automatically)

### Testing
Backend Tests (Jest + Supertest)
-cd backend
-npm test

### APIs Used
-APOD API
-EPIC Earth API
-NEO Feed API
-NASA Image & Video Library

### Technologies
Frontend	            Backend	                Deployment
-React	            -Express.js	            -Vercel (Frontend)
-Redux Toolkit	    -Axios	                -Render (Backend)
-Tailwind CSS	      -Winston Logger	    
-Charts(recharts)   -CORS	            
-React Router		    -jest & supertest           
