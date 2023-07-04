import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {ColumnGroup} from "primereact/columngroup";
import {Row} from "primereact/row";
import { useQuery, gql } from "@apollo/client";

const GET_CATALOG = gql`
	query Documents {
		documents {
			ano
			autor
			categoria
			edicion
			editorial
			id
			tipo_medio
			imagen
			estado
			titulo
		}
		ejemplares {
			estado
			ubicacion
			id
		}
		prestamos {
			tipoPrestamo
			idEjemplar
		}
	}
`;

export const AdminCatalog = () => {
	const [globalFilterValue, setGlobalFilterValue] = useState("");
	const [filteredValue, setFilteredValue] = useState(null);
	
	useEffect(() => {
		setGlobalFilterValue("");
	}, []);

	const onFilter = (e) => {
		const value = e.target.value;
		setGlobalFilterValue(value);
		if (value.length === 0) {
			setFilteredValue(null);
		} else {
			const filtered = data.documents.filter((document) => {
				return document.titulo.toLowerCase().includes(value);
			});
			setFilteredValue(filtered);
		}
	};

	const header = () => {
		return (
			<div className="flex flex-column md:flex-row md:justify-content-between gap-2">
				<span className="p-input-icon-left">
					<i className="pi pi-search" />
					<InputText value={globalFilterValue} onChange={onFilter} placeholder="Search by Name" />
				</span>
			</div>
			
		);
	};

	const { loading, error, data } = useQuery(GET_CATALOG);
	if (loading) return "Loading...";
	if (error) return <pre>{error.message}</pre>;

	let headerGroup = <ColumnGroup>
		<Row>
			<Column header="Título" frozen sortable/>
			<Column header="Autor" sortable/>
			<Column header="Categoria" sortable/>
			<Column header="Editorial" sortable />
			<Column header="Edición" sortable />
			<Column header="Año" sortable />
			<Column header="Stock" sortable />
			<Column header="Disponibles" sortable />
			<Column header="P. sala" sortable />
			<Column header="P. domicilio" sortable />
			<Column header="Acciones" alignFrozen="right" frozen colSpan={2}/>
		</Row>
	</ColumnGroup>;
	console.log(data.ejemplares);
	return (
		<div className="card">
			<DataTable  value={filteredValue || data} headerColumnGroup={headerGroup} header={header()} editMode="row" sortField="name" sortOrder={-1} removableSort showGridlines stripedRows tableStyle={{ minWidth: "50rem" }} scrollable paginator rows={9} >
				<Column frozen  style={{ width: "10%" }} body={(rowdata)=>{
					return (
						<div>
							{rowdata.documents.document.titulo}
						</div>
					);
				}}></Column>
				<Column style={{ width: "20%" }} body={(rowdata)=>{
					return (
						<div>
							{rowdata.documents.document.autor}
						</div>
					);
				}}></Column>
				<Column style={{ width: "20%" }} body={(rowdata)=>{
					return (
						<div>
							{rowdata.documents.document.categoria}
						</div>
					);
				}}></Column>
				<Column style={{ width: "20%" }} body={(rowdata)=>{
					return (
						<div>
							{rowdata.documents.document.editorial}
						</div>
					);
				}}></Column>
				<Column style={{ width: "20%" }} body={(rowdata)=>{
					return (
						<div>
							{rowdata.documents.document.edicion}
						</div>
					);
				}}></Column>
				<Column style={{ width: "20%" }} body={(rowdata)=>{
					return (
						<div>
							{rowdata.documents.document.ano}
						</div>
					);
				}}></Column>
				<Column style={{ width: "20%" }} body={(rowdata)=>{
					return (
						<div>
							{rowdata.ejemplares.ejemplar.estado}
						</div>
					);
				}}></Column>
				<Column style={{ width: "20%" }} body={(rowdata)=>{
					return (
						<div>
							{rowdata.ejemplares.ejemplar.ubicacion}
						</div>
					);
				}}></Column>
				<Column style={{ width: "20%" }} body={(rowdata)=>{
					return (
						<div>
							{rowdata.prestamos.prestamo.tipoPrestamo}
						</div>
					);
				}}></Column>
				<Column style={{ width: "20%" }} body={(rowdata)=>{
					return (
						<div>
							{rowdata.prestamos.length}
						</div>
					);
				}}></Column>
				<Column rowEditor alignFrozen="right" frozen headerStyle={{ minWidth: "8rem" }}> </Column>
				<Column alignFrozen="right" frozen body={<Button icon="pi pi-trash" />} rowSpan={2}></Column>
			</DataTable>
		</div>
	);
};