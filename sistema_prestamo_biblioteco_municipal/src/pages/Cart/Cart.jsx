import { Button } from "primereact/button";
import React from "react";

function Cart() {

	return (
		<div className="surface-section border-1 surface-border border-round px-4 py-8 md:px-6 lg:px-8">
			<div className="flex flex-column align-items-center mb-6">
				<div className="text-900 text-4xl mb-4 font-medium">Carro de libros</div>
				<Button label="Crear solicitud" />
			</div>
			<ul className="list-none p-0 m-0">
				<li className="flex flex-column md:flex-row py-6 border-top-1 border-bottom-1 surface-border">
					<img src={"https://image.isu.pub/150625191505-5af8235b1fff212aadb78af6cbaf8ebe/jpg/page_1.jpg"} className="w-12rem flex-shrink-0 mx-auto md:mx-0" alt="shopping-cart-2-1" />
					<div className="flex-auto py-5 md:pl-5">
						<div className="flex flex-wrap align-items-start sm:align-items-center sm:flex-row sm:justify-content-between surface-border pb-6">
							<div className="w-full sm:w-6 flex flex-column">
								<span className="text-900 text-xl font-medium mb-3">Cálculo Tomo 1</span>
								<span className="text-700">Ron Larson y Bruce Edwars</span>
							</div>
							<div className="flex flex-column sm:align-items-end">
								<a className="cursor-pointer text-pink-500 font-medium text-sm hover:text-pink-600 transition-colors transition-duration-300" tabIndex="0">
                                        Eliminar
								</a>
							</div>
						</div>
					</div>
				</li>
				<li className="flex flex-column md:flex-row py-6 border-top-1 border-bottom-1 surface-border">
					<img src={"https://simehbucket.s3.amazonaws.com/images/7a665c7977e7b9df2eee119f351df745-large.jpg"} className="w-12rem flex-shrink-0 mx-auto md:mx-0" alt="shopping-cart-2-2" />
					<div className="flex-auto py-5 md:pl-5">
						<div className="flex flex-wrap align-items-start sm:align-items-center sm:flex-row sm:justify-content-between surface-border pb-6">
							<div className="w-full sm:w-6 flex flex-column">
								<span className="text-900 text-xl font-medium mb-3">Cálculo Diferencial</span>
								<span className="text-700">Luis Alberto Puga</span>
							</div>
							<div className="flex flex-column sm:align-items-end">
								<a className="cursor-pointer text-pink-500 font-medium text-sm hover:text-pink-600 transition-colors transition-duration-300" tabIndex="0">
                                        Eliminar
								</a>
							</div>
						</div>
					</div>
				</li>
			</ul>
			<div className="flex">
				<div className="w-12rem hidden md:block"></div>
				<ul className="list-none py-0 pr-0 pl-0 md:pl-5 mt-6 mx-0 mb-0 flex-auto">
					<li className="flex justify-content-end">
						<Button label="Crear solicitud" />
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Cart;
