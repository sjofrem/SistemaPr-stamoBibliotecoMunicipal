import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Layout = () => {
	const navigate = useNavigate();
	const {userLoggedIn, setUserLoggedIn, userAdmin} = useContext(UserContext);
	console.log(userLoggedIn);

	const start =
	<Button className="flex gap-2 align-items-center" text onClick={() => navigate("/")}>
		<span className="font-bold text-lg">
			SmartLib
		</span>
		<i className="pi pi-book" style={{ fontSize: "1.5rem" }} />
	</Button>;
	const end =
	<div className="flex gap-2 align-items-center">
		{userLoggedIn && userAdmin ? <Button icon="pi pi-list" rounded text aria-label="Admin catalog" onClick={() => navigate("/admin-catalog")}/>: null}
		{userLoggedIn && userAdmin ? <Button icon="pi pi-book" rounded text aria-label="Requests" onClick={() => navigate("/book-requests")}/>: null}
		{userLoggedIn ? <Button icon="pi pi-shopping-cart" rounded text aria-label="Cart" onClick={() => navigate("/cart")}/>: null}
		{userLoggedIn ? <Button icon="pi pi-sign-out" rounded text aria-label="User" onClick={() => {
			setUserLoggedIn(false);
			navigate("/login");
		}}/>: <Button icon="pi pi-user" rounded text aria-label="User" onClick={() => navigate("/login")}/>}
	</div>;

	useEffect(() => {
		if (!userLoggedIn){
			navigate("/login");
		}
	},[userLoggedIn]);

	return (
		<div className="App">
			<div className="card">
				<Menubar start={start} end={end} />
			</div>
			<Outlet />
		</div>
	);
};

export default Layout;
