import { Button } from "primereact/button";
import React from "react";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Message } from "primereact/message";

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

const CREATE_PRESTAMO = gql`
	mutation Mutation($apellido: String, $documentos: String, $fechaDevolucion: String, $fechaDevolucionReal: String, $fechaPrestamo: String, $modalidad: String, $nombre: String) {
		createPrestamo(apellido: $apellido, documentos: $documentos, fechaDevolucion: $fechaDevolucion, fechaDevolucionReal: $fechaDevolucionReal, fechaPrestamo: $fechaPrestamo, modalidad: $modalidad, nombre: $nombre) {
		apellido
		documentos
		fechaDevolucion
		fechaDevolucionReal
		fechaPrestamo
		id
		modalidad
		nombre
		}
	}
`;

function Cart() {
	const {shoppingCart, setShoppingCart, currentUser} = useContext(UserContext);

	const { loading, error, data } = useQuery(GET_CATALOG);
	if (loading) return "Loading...";
	if (error) return <pre>{error.message}</pre>;

	const getDocuments = (cart) => {
		let documents = cart.map((documentId) => data.documents.filter((document) => documentId === document.id)[0]);
		documents = documents.map((document) => document.titulo);
		documents = documents.join(";");
		return documents;
	};

	const [createPrestamo] = useMutation(CREATE_PRESTAMO);

	const CartWithDocuments = () => {
		return (
			<>
				<ul className="list-none p-0 m-0">
					{shoppingCart.map((documentId) => {
						const document = data.documents.filter((document) => document.id === documentId)[0];

						return (
							<li key={documentId} className="flex flex-column md:flex-row py-6 border-top-1 border-bottom-1 surface-border">
								<img src={document.imagen} className="w-12rem flex-shrink-0 mx-auto md:mx-0" alt="shopping-cart-2-1" />
								<div className="flex-auto py-5 md:pl-5">
									<div className="flex flex-wrap align-items-start sm:align-items-center sm:flex-row sm:justify-content-between surface-border pb-6">
										<div className="w-full sm:w-6 flex flex-column">
											<span className="text-900 text-xl font-medium mb-3">{document.titulo}</span>
											<span className="text-700">{document.author}</span>
										</div>
										<div className="flex flex-column sm:align-items-end">
											<a className="cursor-pointer text-pink-500 font-medium text-sm hover:text-pink-600 transition-colors transition-duration-300" tabIndex="0" onClick={() => {setShoppingCart((shoppingCart) => shoppingCart.filter((id) => id !== documentId));}}>
													Eliminar
											</a>
										</div>
									</div>
								</div>
							</li>
						);
					})}
				</ul>
				<div className="flex">
					<div className="w-12rem hidden md:block"></div>
					<ul className="list-none py-0 pr-0 pl-0 md:pl-5 mt-6 mx-0 mb-0 flex-auto">
						<li className="flex justify-content-end">
							<Button label="Crear solicitud" onClick={(e) => {
								e.preventDefault();
								const data = {
									apellido: currentUser.apellidos,
									documentos: getDocuments(shoppingCart),
									fechaDevolucion: "08-07-2023", 
									fechaDevolucionReal: null, 
									fechaPrestamo: "01-07-2023",  
									modalidad: "Presencial", 
									nombre: currentUser.nombre
								};
								createPrestamo({ variables: { ...data } });
							}}/>
						</li>
					</ul>
				</div>
			</>
		);
	};

	const EmptyCart = () => {
		return (
			<Message text="El carro está vació." className="border-primary w-full justify-content-start" />
		);
	};

	return (
		<div className="surface-section border-1 surface-border border-round px-4 py-8 md:px-6 lg:px-8">
			<div className="flex flex-column align-items-center mb-6">
				<div className="text-900 text-4xl mb-4 font-medium">Carro de libros</div>
			</div>
			{shoppingCart.length > 0 ? CartWithDocuments() : EmptyCart()}
		</div>
	);
}

export default Cart;
