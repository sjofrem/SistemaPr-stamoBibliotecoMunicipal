import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Tag } from "primereact/tag";
import { InputText } from "primereact/inputtext";

export const Home = () => {
	const [layout, setLayout] = useState("grid");
	const [globalFilterValue, setGlobalFilterValue] = useState("");
	const [filteredValue, setFilteredValue] = useState(null);
	const products = [
		{
			name: "Cálculo Tomo 1",
			author: "Ron Larson y Bruce Edwars",
			image: "https://image.isu.pub/150625191505-5af8235b1fff212aadb78af6cbaf8ebe/jpg/page_1.jpg",
			status: "INSTOCK"
		},
		{
			name: "Cálculo Diferencial",
			author: "Luis Alberto Puga",
			image: "https://simehbucket.s3.amazonaws.com/images/7a665c7977e7b9df2eee119f351df745-large.jpg",
			status: "INSTOCK"
		},
		{
			name: "Aplicaciones de calculo diferencial",
			author: "Hernán Alberto Escobar J.",
			image: "https://simehbucket.s3.amazonaws.com/images/7a665c7977e7b9df2eee119f3526f3bf-medium.jpg",
			status: "INSTOCK"
		},
	];

	const getSeverity = (product) => {
		switch (product.status) {
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

	const listItem = (product) => {
		return (
			<div className="col-12">
				<div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
					<img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={product.image} alt={product.name} />
					<div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
						<div className="flex flex-column align-items-center sm:align-items-start gap-3">
							<div className="text-2xl font-bold text-900">{product.name}</div>
							<div className="text-lg font-semibold text-900">{product.author}</div>
							<div className="flex align-items-center gap-3">
								<Tag value={product.status} severity={getSeverity(product)}></Tag>
							</div>
						</div>
						<div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
							<Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.status === "OUTOFSTOCK"}></Button>
						</div>
					</div>
				</div>
			</div>
		);
	};

	const gridItem = (product) => {
		return (
			<div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
				<div className="p-4 border-1 surface-border surface-card border-round">
					<div className="flex flex-wrap align-items-center justify-content-between gap-2">
						<Tag value={product.status} severity={getSeverity(product)}></Tag>
					</div>
					<div className="flex flex-column align-items-center gap-3 py-5">
						<img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={product.image} alt={product.name} />
						<div className="text-2xl font-bold text-center">{product.name}</div>
						<div className="text-lg font-semibold text-center">{product.author}</div>
						<Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.status === "OUTOFSTOCK"}></Button>
					</div>
				</div>
			</div>
		);
	};

	const itemTemplate = (product, layout) => {
		if (!product) {
			return;
		}

		if (layout === "list") return listItem(product);
		else if (layout === "grid") return gridItem(product);
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
				<DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
			</div>
		);
	};

	return (
		<div className="card">
			<DataView value={filteredValue || products} itemTemplate={itemTemplate} layout={layout} header={header()} paginator rows={9}/>
		</div>
	);
};