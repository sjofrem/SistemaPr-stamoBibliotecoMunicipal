import React from "react";
import { Outlet } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";

const Layout = () => {

	const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
	const end = <InputText placeholder="Search" type="text" className="w-full" />;

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
