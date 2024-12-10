import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../src/Components/Navbar";
import Home from "../src/Pages/Home";
import Footer from "../src/Components/Footer";

function PublicLayout() {
	const user = useSelector((state) => state.Auth.user);
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			if (user.role == "admin") {
				navigate("/admin");
			} else if (user.role == "user") {
				navigate("/");
			} else {
				navigate("/public");
			}
		}
	}, [user, navigate]);
	return (
		<>
			<Navbar />
			<Outlet />
			<Footer />
		</>
	);
}

export default PublicLayout;
