import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";

// I said I wouldn't use MUI, but I installed it in my thought process? 
// No, I installed `react-icons`, but NOT `@mui/material`.
// Wait, I actually skipped `@mui/material` in the command `run_command`?
// Let me check my command history.
// I ran: `npm install; npm install -D tailwindcss postcss autoprefixer; npx tailwindcss init -p; npm install react-router-dom react-redux @reduxjs/toolkit react-dropzone formik yup react-icons`
// I did NOT install MUI.
// So I should NOT import from MUI.
// I need to use Tailwind for dark mode.
// In `tailwind.config.js`, I didn't set `darkMode: 'class'`. I should do that.

// So App.jsx should just handle routing. Global style is in index.css.
// Dark mode logic is in Redux `mode` state. I need to apply class "dark" to html or body based on state.

import "./index.css";

function App() {
  const mode = useSelector((state) => state.mode);
  const isAuth = Boolean(useSelector((state) => state.token));

  // Apply dark mode class to html element
  useMemo(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/home"
            element={isAuth ? <HomePage /> : <Navigate to="/" />}
          />
          <Route
            path="/profile/:userId"
            element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
