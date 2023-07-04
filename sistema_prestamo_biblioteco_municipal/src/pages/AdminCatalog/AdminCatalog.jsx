import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
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
			<Column header="Título" frozen sortable field="titulo"/>
			<Column header="Autor" sortable field="author"/>
			<Column header="Categoria" sortable field="category"/>
			<Column header="Editorial" sortable field="editorial"/>
			<Column header="Edición" sortable field="edition"/>
			<Column header="Año" sortable field="year"/>
			<Column header="Stock" sortable field="stock"/>
			<Column header="Disponibles" sortable field="available"/>
			<Column header="P. sala" sortable field="psala"/>
			<Column header="P. domicilio" sortable field="pdomicilio"/>
			<Column header="Acciones" alignFrozen="right" frozen colSpan={2}/>
		</Row>
	</ColumnGroup>;
	console.log(data.documents);
	return (
		<div className="card">
			<DataTable  value={filteredValue || data.documents} headerColumnGroup={headerGroup} header={header()} editMode="row" sortField="name" sortOrder={-1} removableSort showGridlines stripedRows tableStyle={{ minWidth: "50rem" }} scrollable paginator rows={9} >
				<Column field="titulo" frozen  style={{ width: "10%" }}>{document.titulo}</Column>
				<Column field="autor"  style={{ width: "20%" }}>{document.autor}</Column>
				<Column field="categoria" style={{ width: "20%" }}>{document.categoria}</Column>
				<Column field="editorial" style={{ width: "20%" }}>{document.editorial}</Column>
				<Column field="edicion"  style={{ width: "20%" }}>{document.edicion}</Column>
				<Column field="ano" style={{ width: "20%" }}>{document.ano}</Column>
				<Column field="stock" style={{ width: "20%" }}></Column>
				<Column field="available"  style={{ width: "20%" }}></Column>
				<Column field="psala"  style={{ width: "20%" }}></Column>
				<Column field="pdomicilio"  style={{ width: "20%" }}></Column>
				<Column rowEditor alignFrozen="right" frozen headerStyle={{ minWidth: "8rem" }}> </Column>
				<Column alignFrozen="right" frozen body={<i className="pi pi-trash" />} rowSpan={2}></Column>
			</DataTable>
		</div>
	);
};