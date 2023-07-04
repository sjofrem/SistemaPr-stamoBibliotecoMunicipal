import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
	const [userLoggedIn, setUserLoggedIn] = useState(false);
	const [userAdmin, setUserAdmin] = useState(false);
	const [shoppingCart, setShoppingCart] = useState([]);
	const [currentUser, setCurrentUser] = useState(undefined);

	const value = useMemo(() => {
		return {
			userLoggedIn,
			setUserLoggedIn,
			userAdmin,
			setUserAdmin,
			shoppingCart,
			setShoppingCart,
			currentUser,
			setCurrentUser

		};
	}, [userLoggedIn, userAdmin, shoppingCart, currentUser]);

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