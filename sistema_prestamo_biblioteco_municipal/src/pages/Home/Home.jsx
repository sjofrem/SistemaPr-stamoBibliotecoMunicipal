import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Tag } from "primereact/tag";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Image } from "primereact/image";
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
 
export const Home = () => {
	const [layout, setLayout] = useState("grid");
	const [globalFilterValue, setGlobalFilterValue] = useState("");
	const [filteredValue, setFilteredValue] = useState(null);
	const [displayDetails, setDisplayDetails] = useState(false);

	const getSeverity = (document) => {
		switch (document.estado) {
		case "INSTOCK":
			return "success";

		case "LOWSTOCK":
			return "warning";

		case "OUTOFSTOCK":
			return "danger";

		default:
			return null;
		}
	};

	const listItem = (document) => {
		return (
			<div className="col-12">
				<div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
					<img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={document.imagen} alt={document.titulo} />
					<div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
						<div className="flex flex-column align-items-center sm:align-items-start gap-3">
							<div className="text-2xl font-bold text-900">{document.titulo}</div>
							<div className="text-lg font-semibold text-900">{document.autor}</div>
							<div className="flex align-items-center gap-3">
								<Tag value={document.estado} severity={getSeverity(document)}></Tag>
							</div>
						</div>
						<div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
							<Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={document.estado === "OUTOFSTOCK"}></Button>
							<Button icon="pi pi-ellipsis-h" className="p-button-rounded" onClick={()=>setDisplayDetails(true)}></Button>
						</div>
					</div>
				</div>
			</div>
		);
	};

	const gridItem = (document) => {
		return (
			<div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
				<div className="p-4 border-1 surface-border surface-card border-round">
					<div className="flex flex-wrap align-items-center justify-content-between gap-2">
						<Tag value={document.estado} severity={getSeverity(document)}></Tag>
					</div>
					<div className="flex flex-column align-items-center gap-3 py-5">
						<img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={document.imagen} alt={document.titulo} />
						<div className="text-2xl font-bold text-center">{document.titulo}</div>
						<div className="text-lg font-semibold text-center">{document.autor}</div>
						<Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={document.estado === "OUTOFSTOCK"}></Button>
						<Button icon="pi pi-ellipsis-h" className="p-button-rounded" onClick={()=>setDisplayDetails(true)}></Button>
					</div>
				</div>
			</div>
		);
	};

	const itemTemplate = (document, layout) => {
		if (!document) {
			return;
		}

		if (layout === "list") return listItem(document);
		else if (layout === "grid") return gridItem(document);
	};

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
				console.log(document.titulo, value, document.titulo.toLowerCase().includes(value.toLowerCase()));
				return document.titulo.toLowerCase().includes(value.toLowerCase());
			});
			setFilteredValue(filtered);
		}
	};

	const header = () => {
		return (
			<div className="flex flex-column md:flex-row md:justify-content-between gap-2">
				<span className="p-input-icon-left">
					<i className="pi pi-search" />
					<InputText value={globalFilterValue} onChange={onFilter} placeholder="Buscar por Nombre" />
				</span>
				<DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
			</div>
		);
	};

	const { loading, error, data } = useQuery(GET_CATALOG);
	if (loading) return "Loading...";
	if (error) return <pre>{error.message}</pre>;

	return (
		<>
			<div className="card">
				<DataView value={filteredValue || data.documents} itemTemplate={itemTemplate} layout={layout} header={header()} paginator rows={9}/>
			</div>
			<Dialog header="Detalles" visible={displayDetails} style={{ width: "50vw" }} onHide={() => setDisplayDetails(false)}>
				<div className="grid">
					<div className="col-6">
						<Image src="https://image.isu.pub/150625191505-5af8235b1fff212aadb78af6cbaf8ebe/jpg/page_1.jpg" alt="Image" width="300" preview />
					</div>
					<div className="col-6">
						<div className="text-900 text-xl font-bold mb-2">Cálculo Tomo 1</div>
						<div className="text-800 text-xl font-bold mb-2">Ron Larson y Bruce Edwars</div>
						<div className="text-700 text-xl font-medium mb-2">Ha sido ampliamente elogiado por una generación de estudiantes y profesores por su pedagogía sólida y eficaz que aborda las necesidades de una amplia gama de estilos y entornos de enseñanza y aprendizaje. Cada título es sólo un componente de un completo programa de cursos de cálculo que integra y coordina cuidadosamente documentos impresos, multimedia y tecnológicos para una enseñanza y un aprendizaje satisfactorios.</div>
					</div>
				</div>
			</Dialog>
		</>
		
	);
};