import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import "./Components/NavBar/Nav.css";
import "./Pages/Landing/landing.css";
import "./Pages/Account/Account.css";
import "./Components/Component.css";
import "./Components/Notes/NotesLayout.css";

import NavBar from "./Components/NavBar/NavBar";

import LandingPage from "./Pages/Landing/LandingPage";
import AboutUs from "./Pages/Landing/AboutUs";
import ContactUs from "./Pages/Landing/ContactUs";

import Dashboard from "./Pages/Account/Dashboard";
import AllNotes from "./Pages/Account/AllNotes";
import HowToUse from "./Pages/Account/HowToUse";
import Settings from "./Pages/Account/Settings";

import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import { AuthContext } from "./AuthContext";

import { Navigate } from "react-router-dom";

const Protected = ({ user, children }) => {
	return !user ? <Navigate to="/login" replace /> : children;
};

function App() {
	const { user } = useContext(AuthContext);

	return (
		<div className="App">
			<NavBar />
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/about-us" element={<AboutUs />} />
				<Route path="/contact-us" element={<ContactUs />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />

				<Route
					path="/dashboard"
					element={
						<Protected user={user}>
							<Dashboard />
						</Protected>
					}
				/>
				<Route
					path="/all-notes"
					element={
						<Protected user={user}>
							<AllNotes />
						</Protected>
					}
				/>
				<Route
					path="/how-to-use"
					element={
						<Protected user={user}>
							<HowToUse />
						</Protected>
					}
				/>
				<Route
					path="/settings"
					element={
						<Protected user={user}>
							<Settings />
						</Protected>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
