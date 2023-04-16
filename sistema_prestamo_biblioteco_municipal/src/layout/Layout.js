import React from "react";
import { Outlet } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";

const Layout = () => {

	const start =
	<div className="flex gap-2 align-items-center">
		<span className="font-bold text-lg">
			SmartLib
		</span>
		<i className="pi pi-book" style={{ fontSize: "1.5rem" }} />
	</div>;
	const end =
	<div className="flex gap-2 align-items-center">
		<Button icon="pi pi-shopping-cart" rounded text aria-label="Cart" />
		<Button icon="pi pi-user" rounded text aria-label="User" />
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
