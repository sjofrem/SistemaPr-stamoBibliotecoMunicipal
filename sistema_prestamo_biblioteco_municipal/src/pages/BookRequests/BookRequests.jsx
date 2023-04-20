import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { useRef } from "react";

export const BookRequests = () => {
	const [displayRequestForm, setDisplayRequestForm] = useState(false);
	const toast = useRef(null);

	const onUpload = () => {
		toast.current.show({ severity: "info", summary: "Success", detail: "File Uploaded" });
	};
	const bookRequests = [
		{
			nombre: "Sebastián",
			apellidos: "Jofré Machuca",
			documentos: ["Cálculo Tomo 1", "Cálculo Diferencial"],
			modalidad: "Presencial",
			fechaInicio: "20-04-2023",
			fechaTermino: "27-04-2023"
		}
	];
	const footer = (
		<div>
			<Button label="Ingresar" aria-label="Submit" className="w-full" onClick={() => setDisplayRequestForm(false)} />
		</div>
	);


	return (
		<div>
			<div className="card">
				<DataTable value={bookRequests} responsiveLayout="scroll">
					<Column field="nombre" header="Nombre"></Column>
					<Column field="apellidos" header="Apellidos"></Column>
					<Column field="documentos" header="Documentos" body={(rowData) => {
						return(
							<>
								{rowData.documentos.map((document, index) => {
									return(
										<div key={index}>
											{document}
										</div>
									);
								})}
							</>
						);
					}}></Column>
					<Column field="modalidad" header="Modalidad"></Column>
					<Column field="fechaInicio" header="Fecha inicio"></Column>
					<Column field="fechaTermino" header="Fecha final"></Column>
					<Column header="Acciones" body={(rowData) => {
						console.log(rowData);
						return(
							<div>
								<Button label="Ingresar" aria-label="Submit" onClick={() => setDisplayRequestForm(true)} />
							</div>
						);
					}}></Column>
				</DataTable>
			</div>
			<Dialog header="Solicitud" visible={displayRequestForm} style={{ width: "50vw" }} onHide={() => setDisplayRequestForm(false)} footer={footer}>
				<div className="py-3 formgrid grid">
					<div className="mb-4 p-float-label col-12">
						<InputText id="rut" type="text" className="w-full" />
						<label htmlFor="rut" className="font-semibold ml-3">Rut</label>
					</div>
					<div className="mb-4 p-float-label col-12">
						<InputText id="nombres" type="text" className="w-full" />
						<label htmlFor="nombres" className="font-semibold ml-3">Nombres</label>
					</div>
					<div className="col-12">
						<Toast ref={toast}></Toast>
						<FileUpload className="w-full" mode="basic" name="demo[]" url="/api/upload" accept="image/*" maxFileSize={1000000} onUpload={onUpload} auto chooseLabel="Ingresar huella" />
					</div>
				</div>
			</Dialog>
		</div>
	);
};