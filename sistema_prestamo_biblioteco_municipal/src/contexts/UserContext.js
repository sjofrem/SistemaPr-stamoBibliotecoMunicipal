import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
	const [userLoggedIn, setUserLoggedIn] = useState(false);
	const [shoppingCart, setShoppingCart] = useState([]);

	const value = useMemo(() => {
		return {
			userLoggedIn,
			setUserLoggedIn,
			shoppingCart,
			setShoppingCart

		};
	}, [userLoggedIn, shoppingCart]);

	return (
		<UserContext.Provider value={value}>
			<>
				{children}
			</>
		</UserContext.Provider>
	);
};

UserProvider.propTypes = {
	children: PropTypes.node.isRequired,
};