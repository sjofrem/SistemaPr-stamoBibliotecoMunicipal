import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {ColumnGroup} from "primereact/columngroup";
import {Row} from "primereact/row";

export const AdminCatalog = () => {
	const [globalFilterValue, setGlobalFilterValue] = useState("");
	const [filteredValue, setFilteredValue] = useState(null);
	const products = [
		{
			name: "Cálculo Tomo 1",
			author: "Ron Larson y Bruce Edwars",
			image: "https://image.isu.pub/150625191505-5af8235b1fff212aadb78af6cbaf8ebe/jpg/page_1.jpg",
			status: "INSTOCK",
			category: "Cálculo",
			editorial: "Springer",
			edition: "Cuarta",
			year: "1987",
			location: "C-22",
			stock: "5",
			available: "2",
			psala: "2",
			pdomicilio: "1"
		},
		{
			name: "Cálculo Diferencial",
			author: "Luis Alberto Puga",
			image: "https://simehbucket.s3.amazonaws.com/images/7a665c7977e7b9df2eee119f351df745-large.jpg",
			status: "INSTOCK",
			category: "Cálculo diferencial",
			editorial: "Universitaria UTE",
			edition: "Primera",
			year: "2013",
			location: "C-12",
			stock: "10",
			available: "7",
			psala: "3",
			pdomicilio: "0"
		},
		{
			name: "Aplicaciones de calculo diferencial",
			author: "Hernán Alberto Escobar J.",
			image: "https://simehbucket.s3.amazonaws.com/images/7a665c7977e7b9df2eee119f3526f3bf-medium.jpg",
			status: "INSTOCK",
			category: "Cálculo diferencial",
			editorial: "Altaya",
			edition: "Tercera",
			year: "2011",
			location: "T-55",
			stock: "4",
			available: "4",
			psala: "0",
			pdomicilio: "0"
		},
	];

	useEffect(() => {
		setGlobalFilterValue("");
	}, []);

	const onFilter = (e) => {
		const value = e.target.value;
		setGlobalFilterValue(value);
		if (value.length === 0) {
			setFilteredValue(null);
		} else {
			const filtered = products.filter((product) => {
				return product.name.toLowerCase().includes(value);
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

	let headerGroup = <ColumnGroup>
		<Row>
			<Column header="Título" frozen sortable field="name"/>
			<Column header="Autor" sortable field="author"/>
			<Column header="Categoria" sortable field="category"/>
			<Column header="Editorial" sortable field="editorial"/>
			<Column header="Edición" sortable field="edition"/>
			<Column header="Año" sortable field="year"/>
			<Column header="Ubicación" sortable field="location"/>
			<Column header="Stock" sortable field="stock"/>
			<Column header="Disponibles" sortable field="available"/>
			<Column header="P. sala" sortable field="psala"/>
			<Column header="P. domicilio" sortable field="pdomicilio"/>
			<Column header="Acciones" alignFrozen="right" frozen colSpan={2}/>
		</Row>
	</ColumnGroup>;

	return (
		<div className="card">
			<DataTable  value={filteredValue || products} headerColumnGroup={headerGroup} header={header()} editMode="row" sortField="name" sortOrder={-1} removableSort showGridlines stripedRows tableStyle={{ minWidth: "50rem" }} scrollable paginator rows={9} >
				<Column field="name" frozen  style={{ width: "10%" }}></Column>
				<Column field="author"  style={{ width: "20%" }}></Column>
				<Column field="category" style={{ width: "20%" }}></Column>
				<Column field="editorial" style={{ width: "20%" }}></Column>
				<Column field="edition"  style={{ width: "20%" }}></Column>
				<Column field="year" style={{ width: "20%" }}></Column>
				<Column field="location"  style={{ width: "20%" }}></Column>
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