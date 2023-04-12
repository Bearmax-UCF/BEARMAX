import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

function validUser(userData) {
	return (
		userData &&
		typeof userData.id === "string" &&
		typeof userData.token === "string"
	);
}

async function saveUser(userData) {
	if (validUser(userData)) {
		localStorage.setItem("id", userData.id);
		localStorage.setItem("token", userData.token);
	}
}

async function getUser() {
	const id = localStorage.getItem("id");
	const token = localStorage.getItem("token");
	if (!id || !token) return null;
	return {
		id,
		token,
	};
}

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const navigate = useNavigate();

	const loginFunction = async (email, password) => {
		try {
			const res = await fetch(
				`https://carewithbearmax.com/api/auth/login`,
				{
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email, password }),
				}
			);

			if (res.status === 200) {
				const data = await res.json();
				const userData = { token: data.token, id: data.id };
				setUser(userData);
				await saveUser(userData);
				return "";
			}
		} catch (err) {
			console.error(err);
		}
		return "Invalid email or password!";
	};

	const signupFunction = async (email, firstName, lastName, password) => {
		try {
			const res = await fetch(
				`https://carewithbearmax.com/api/auth/register`,
				{
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email,
						firstName,
						lastName,
						password,
					}),
				}
			);
			const data = await res.json();

			if (res.status === 201) return await loginFunction(email, password);
			else if (data.message) return data.message;
		} catch (err) {
			console.error(err);
		}
		return "Signup failed!";
	};

	const logoutFunction = async () => {
		if (!user) return "User not logged in!";

		try {
			const res = await fetch(
				`https://carewithbearmax.com/api/auth/logout`,
				{
					method: "GET",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						Authorization: "Bearer " + user.token,
					},
				}
			);

			if (res.status === 200) {
				setUser(null);
				await saveUser({ id: "", token: "" });
				return "";
			}
		} catch (err) {
			console.error(err);
		}
		return "Logout failed!";
	};

	const getUserData = async () => {
		if (!user) return null;
		try {
			const res = await fetch(
				`https://carewithbearmax.com/api/users/me`,
				{
					method: "GET",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						Authorization: "Bearer " + user.token,
					},
				}
			);

			if (res.status === 200) {
				const data = await res.json();
				return data.me;
			}
		} catch (err) {
			console.error(err);
		}
		return null;
	};

	useEffect(() => {
		getUser().then((userData) => {
			setUser(userData);
			if (userData) navigate("/dashboard");
		});
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				login: loginFunction,
				logout: logoutFunction,
				signup: signupFunction,
				getUserData,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
