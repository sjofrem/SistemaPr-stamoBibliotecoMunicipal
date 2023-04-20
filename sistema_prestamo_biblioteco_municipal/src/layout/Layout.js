import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";

const Layout = () => {
	const navigate = useNavigate();

	const start =
	<Button className="flex gap-2 align-items-center" text onClick={() => navigate("/")}>
		<span className="font-bold text-lg">
			SmartLib
		</span>
		<i className="pi pi-book" style={{ fontSize: "1.5rem" }} />
	</Button>;
	const end =
	<div className="flex gap-2 align-items-center">
		<Button icon="pi pi-shopping-cart" rounded text aria-label="Cart" onClick={() => navigate("/cart")}/>
		<Button icon="pi pi-user" rounded text aria-label="User" onClick={() => navigate("/login")}/>
	</div>;

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
