import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React from "react";
import { useFormik } from "formik";

import { gql, useMutation } from "@apollo/client";

const CREATE_USER = gql`
mutation CreateUser($rut: String, $nombres: String, $apellidos: String, $direccion: String, $telefono: Int, $mail: String, $huella: String, $foto: String, $administrador: Boolean, $contrasena: String) {
	createUser(rut: $rut, nombres: $nombres, apellidos: $apellidos, direccion: $direccion, telefono: $telefono, mail: $mail, huella: $huella, foto: $foto, administrador: $administrador, contrasena: $contrasena) {
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

export const Register = () => {
	const navigate = useNavigate();

	const [createUser, { createData }] = useMutation(CREATE_USER);

	const formik = useFormik({
		initialValues: {
			nombres: "",
			rut: "",
			apellidos: "",
			direccion: "",
			telefono: "",
			mail: "",
			huella: "",
			foto: "",
			administrador: false,
			contrasena: ""
		},
		validate: (data) => {
			let errors = {};

			if (!data.nombres) {
				errors.nombres = "Name is required.";
			}

			return errors;
		},
		onSubmit: (data) => {
			data.telefono = 
			createUser({ variables: { data } });
			console.log(createData);
			// navigate("/");

			formik.resetForm();
		}
	});

	return (
		<>
			<div className="px-5 min-h-screen flex justify-content-center align-items-center">
				<div className="border-1 surface-border surface-card border-round py-7 px-4 md:px-7 z-1">
					<form onSubmit={formik.handleSubmit} className="p-fluid">
						<div className="mb-4">
							<div className="text-900 text-xl font-bold mb-2">Registrar usuario</div>
						</div>
						<div className="py-3 formgrid grid">
							<div className="mb-4 p-float-label col-12 md:col-6">
								<InputText id="rut" type="text" className="w-full" value={formik.values.rut} onChange={formik.handleChange} autoFocus/>
								<label htmlFor="rut" className="font-semibold ml-3">Rut</label>
							</div>
							<div className="mb-4 p-float-label col-12 md:col-6">
								<InputText id="nombres" type="text" className="w-full" value={formik.values.nombres} onChange={formik.handleChange} autoFocus />
								<label htmlFor="nombres" className="font-semibold ml-3">Nombres</label>
							</div>
							<div className="mb-4 p-float-label col-12 md:col-6">
								<InputText id="apellidos" type="text" className="w-full" value={formik.values.apellidos} onChange={formik.handleChange} autoFocus/>
								<label htmlFor="apellidos" className="font-semibold ml-3">Apellidos</label>
							</div>
							<div className="mb-4 p-float-label col-12 md:col-6">
								<InputText id="mail" type="text" className="w-full" value={formik.values.mail} onChange={formik.handleChange} autoFocus/>
								<label htmlFor="mail" className="font-semibold ml-3">Correo electrónico</label>
							</div>
							<div className="mb-4 p-float-label col-12 md:col-6">
								<InputText id="direccion" type="text" className="w-full" value={formik.values.direccion} onChange={formik.handleChange} autoFocus/>
								<label htmlFor="direccion" className="font-semibold ml-3">Dirección</label>
							</div>
							<div className="mb-4 p-float-label col-12 md:col-6">
								<InputText id="telefono" type="text" className="w-full" value={formik.values.telefono} onChange={formik.handleChange} autoFocus/>
								<label htmlFor="telefono" className="font-semibold ml-3">Telefono</label>
							</div>
							<div className="mb-4 p-float-label col-12 md:col-6">
								<InputText id="huella" type="text" className="w-full" value={formik.values.huella} onChange={formik.handleChange} autoFocus/>
								<label htmlFor="huella" className="font-semibold ml-3">Huella</label>
							</div>
							<div className="mb-4 p-float-label col-12 md:col-6">
								<InputText id="foto" type="text" className="w-full" value={formik.values.foto} onChange={formik.handleChange} autoFocus/>
								<label htmlFor="foto" className="font-semibold ml-3">Foto</label>
							</div>
							<div className="mb-4 p-float-label col-12 md:col-6">
								<InputText id="contrasena" type="password" className="w-full" value={formik.values.contrasena} onChange={formik.handleChange} autoFocus/>
								<label htmlFor="contrasena" className="font-semibold ml-3">Contraseña</label>
							</div>

						</div>
						<Button label="Ingresar" className="w-full" type="submit"></Button>
						<div className="flex gap-3 pt-3">
							<span className="text-600 font-medium">{"¿Ya tienes una cuenta?"}</span>
							<a className="text-600 cursor-pointer hover:text-primary cursor-pointer ml-auto transition-colors transition-duration-300" onClick={() => navigate("/login")}>Iniciar sesión</a>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};
