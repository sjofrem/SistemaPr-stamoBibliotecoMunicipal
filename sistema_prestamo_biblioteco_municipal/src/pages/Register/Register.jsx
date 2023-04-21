import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import React, { useRef } from "react";

export const Register = () => {
	const toast = useRef(null);
	const navigate = useNavigate();

	const onUpload = () => {
		toast.current.show({ severity: "info", summary: "Success", detail: "File Uploaded" });
	};
	return (
		<>
			<div className="px-5 min-h-screen flex justify-content-center align-items-center">
				<div className="border-1 surface-border surface-card border-round py-7 px-4 md:px-7 z-1">
					<div className="mb-4">
						<div className="text-900 text-xl font-bold mb-2">Registrar usuario</div>
					</div>
					<div className="py-3 formgrid grid">
						<div className="mb-4 p-float-label col-12 md:col-6">
							<InputText id="rut" type="text" className="w-full" />
							<label htmlFor="rut" className="font-semibold ml-3">Rut</label>
						</div>
						<div className="mb-4 p-float-label col-12 md:col-6">
							<InputText id="nombres" type="text" className="w-full" />
							<label htmlFor="nombres" className="font-semibold ml-3">Nombres</label>
						</div>
						<div className="mb-4 p-float-label col-12 md:col-6">
							<InputText id="apellidos" type="text" className="w-full" />
							<label htmlFor="apellidos" className="font-semibold ml-3">Apellidos</label>
						</div>
						<div className="mb-4 p-float-label col-12 md:col-6">
							<InputText id="email" type="text" className="w-full" />
							<label htmlFor="email" className="font-semibold ml-3">Correo electrónico</label>
						</div>
						<div className="mb-4 p-float-label col-12 md:col-6">
							<InputText id="direccion" type="text" className="w-full" />
							<label htmlFor="direccion" className="font-semibold ml-3">Dirección</label>
						</div>
						<div className="mb-4 p-float-label col-12 md:col-6">
							<InputText id="telefono" type="text" className="w-full" />
							<label htmlFor="telefono" className="font-semibold ml-3">Correo electrónico</label>
						</div>
						<div className="mb-4 col-12 md:col-6">
							<Toast ref={toast}></Toast>
							<FileUpload className="w-full" mode="basic" name="demo[]" url="/api/upload" accept="image/*" maxFileSize={1000000} onUpload={onUpload} auto chooseLabel="Registrar huella" />
						</div>
						<div className="mb-4 col-12 md:col-6">
							<Toast ref={toast}></Toast>
							<FileUpload className="w-full" mode="basic" name="demo[]" url="/api/upload" accept="image/*" maxFileSize={1000000} onUpload={onUpload} auto chooseLabel="Registrar Foto" />
						</div>
						<div className="mb-4 p-float-label col-12 md:col-6">
							<InputText id="contraseña" type="password" className="w-full" />
							<label htmlFor="contraseña" className="font-semibold ml-3">Contraseña</label>
						</div>
						<div className="mb-4 p-float-label col-12 md:col-6">
							<InputText id="confirmarContraseña" type="password" className="w-full" />
							<label htmlFor="confirmarContraseña" className="font-semibold ml-3">Confirmar Contraseña</label>
						</div>

					</div>
					<Button label="Ingresar" className="w-full" onClick={() => navigate("/")}></Button>
					<div className="flex gap-3 pt-3">
						<span className="text-600 font-medium">{"¿Ya tienes una cuenta?"}</span>
						<a className="text-600 cursor-pointer hover:text-primary cursor-pointer ml-auto transition-colors transition-duration-300" onClick={() => navigate("/login")}>Iniciar sesión</a>
					</div>
				</div>
			</div>
		</>
	);
};
