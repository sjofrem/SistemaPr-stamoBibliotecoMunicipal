import React, { useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { useRef } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";

const GET_PRESTAMOS = gql`
query Prestamo {
	prestamos {
	  apellido
	  documentos
	  fechaDevolucion
	  fechaDevolucionReal
	  fechaPrestamo
	  id
	  modalidad
	  nombre
	  estado
	}
  }
`;


const UPDATE_QUERY = gql`
mutation Mutation($estado: String, $updatePrestamoId: ID) {
	updatePrestamo(estado: $estado, id: $updatePrestamoId) {
	  estado
	  id
	}
  }
`;

export const BookRequests = () => {
	const [displayRequestForm, setDisplayRequestForm] = useState(false);
	const toast = useRef(null);
	const [updatePrestamo, { data: updateData, error }] = useMutation(UPDATE_QUERY);

	useEffect(() => {
		if (error) {
			alert(error.message);
		} else if (updateData) {
			console.log(updateData);
		}
	}, [error]);

	function updateRow(estado, id){
		let data = {
			estado: estado,
			updatePrestamoId: id
		};
		if (id !== undefined){
			updatePrestamo({ variables: { ...data } }
			);
		}
	}

	const onUpload = () => {
		toast.current.show({ severity: "info", summary: "Success", detail: "File Uploaded" });
	};
	// const bookRequests = [
	// 	{
	// 		nombre: "Sebastián",
	// 		apellidos: "Jofré Machuca",
	// 		documentos: ["Cálculo Tomo 1", "Cálculo Diferencial"],
	// 		modalidad: "Presencial",
	// 		fechaInicio: "20-04-2023",
	// 		fechaTermino: "27-04-2023"
	// 	}
	// ];
	const [bookRequests, setBookRequests] = useState([]);
	const footer = (
		<div>
			<Button label="Ingresar" aria-label="Submit" className="w-full" onClick={() => setDisplayRequestForm(false)} />
		</div>
	);

	// const { loading, error, data } = useQuery(GET_PRESTAMOS);
	const { data } = useQuery(GET_PRESTAMOS);	
	useEffect(()=>{
		if(data != undefined){
			setBookRequests(data?.prestamos);
		}
	},[data]);
	// if (loading) return "Loading...";
	// if (error) return <pre>{error.message}</pre>;
	console.log("hola", data?.prestamos);

	return (
		<div>
			<div className="card">
				<DataTable value={bookRequests} responsiveLayout="scroll">
					<Column field="nombre" header="Nombre"></Column>
					<Column field="apellido" header="Apellidos"></Column>
					<Column field="documentos" header="Documentos" body={(rowData) => {
						return(
							<>
								{rowData?.documentos.split(";").map((docu)=>{
									return(<>
										<div key={docu.id}>{docu}</div>
									</>);
								})
								
								}  
							</>
						);
					}}></Column>
					<Column field="modalidad" header="Modalidad"></Column>
					<Column field="fechaPrestamo" header="Fecha inicio"></Column>
					<Column field="fechaDevolucion" header="Fecha final"></Column>
					<Column header="Acciones" body={(rowData) => {
						console.log(rowData.id);
						return(
							<div>
								<Button icon="pi pi-check" rounded text aria-label="Admin catalog" onClick={() => updateRow("Aprobar", rowData.id)}/>
								<Button icon="pi pi-times" rounded text aria-label="Admin catalog" onClick={() => updateRow("Rechazar", rowData.id)}/>
							</div>
						);
					}}></Column>
					<Column field="estado" header="Estado"></Column>
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