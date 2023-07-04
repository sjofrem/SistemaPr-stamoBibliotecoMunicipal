import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useFormik } from "formik";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const GET_USERS = gql`
  {
    users {
		id
		rut
		nombres
		apellidos
		direccion
		telefono
		mail
		huella
		foto
		administrador
		contrasena
	  }
  }
`;

export const Login = () => {
	const navigate = useNavigate();
	const { data: dataUsers } = useQuery(GET_USERS);
	const {setUserLoggedIn, setUserAdmin, setCurrentUser} = useContext(UserContext);
	//console.log(dataUsers);
	const formik = useFormik({
		initialValues: {
			email: "",
			password: ""
		},
		onSubmit: (data) => {
			console.log("Form submitted");
			console.log(data);
			if (dataUsers && dataUsers.users) {
				let searchUser = dataUsers.users.find((user) => user.mail === data.email && user.contrasena === data.password);
				if (searchUser !== undefined){
					setUserLoggedIn(true);
					setCurrentUser(searchUser);
					if (searchUser.administrador === true){
						setUserAdmin(true);
					}
					navigate("/");
				} else {
					alert("Usuario no existe");
				}
			}
			formik.resetForm();
		}
	});
	return (
		<>
			<div className="px-5 min-h-screen flex justify-content-center align-items-center">
				<div className="border-1 surface-border surface-card border-round py-7 px-4 md:px-7 z-1">
					<div className="mb-4">
						<div className="text-900 text-xl font-bold mb-2">Inicio de sesión</div>
						<span className="text-600 font-medium">Por favor, introduzca sus datos</span>
					</div>
					<div className="flex flex-column">
						<form onSubmit={formik.handleSubmit} className="p-fluid">
							<span className="p-input-icon-left w-full mb-4">
								<i className="pi pi-envelope"></i>
								<InputText id="email" type="text" className="w-full md:w-25rem" placeholder="Email" value={formik.values.email} onChange={formik.handleChange}/>
								<label htmlFor="email" className="font-semibold ml-3"/>
							</span>
							<span className="p-input-icon-left w-full mb-4">
								<i className="pi pi-lock"></i>
								<InputText id="password" type="password" className="w-full md:w-25rem" placeholder="Contraseña" value={formik.values.password} onChange={formik.handleChange}/>
								<label htmlFor="password" className="font-semibold ml-3"/>
							</span>
							<Button label="Ingresar" className="w-full" type="submit"></Button>
						</form>
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
