import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React from "react";

export const Login = () => {
	const navigate = useNavigate();
	return (
		<>
			<div className="px-5 min-h-screen flex justify-content-center align-items-center">
				<div className="border-1 surface-border surface-card border-round py-7 px-4 md:px-7 z-1">
					<div className="mb-4">
						<div className="text-900 text-xl font-bold mb-2">Inicio de sesión</div>
						<span className="text-600 font-medium">Por favor, introduzca sus datos</span>
					</div>
					<div className="flex flex-column">
						<span className="p-input-icon-left w-full mb-4">
							<i className="pi pi-envelope"></i>
							<InputText id="email" type="text" className="w-full md:w-25rem" placeholder="Email" />
						</span>
						<span className="p-input-icon-left w-full mb-4">
							<i className="pi pi-lock"></i>
							<InputText id="password" type="password" className="w-full md:w-25rem" placeholder="Contraseña" />
						</span>
						<Button label="Ingresar" className="w-full" onClick={() => navigate("/")}></Button>
						<div className="flex gap-3 pt-3">
							<span className="text-600 font-medium">{"¿No tienes cuenta?"}</span>
							<a className="text-600 cursor-pointer hover:text-primary cursor-pointer ml-auto transition-colors transition-duration-300" onClick={() => navigate("/register")}>Crear una cuenta</a>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
