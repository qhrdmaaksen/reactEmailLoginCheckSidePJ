import React, {useState, useEffect} from 'react';

const AuthContext = React.createContext({
	isLoggedIn: false,
	onLogout: () => {},
	onLogin: (email, password) => {}
})

// useState 를 import 하기 위해 AuthContextProvider 를 기본 값에 추가
export const AuthContextProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	useEffect(() => {
		const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
		if (storedUserLoggedInInformation === 'login') {
			setIsLoggedIn(true);
		}
	}, [])

	const loginHandler = () => {
		localStorage.setItem('isLoggedIn', 'login');
		setIsLoggedIn(true)
	}
	const logoutHandler = () => {
		localStorage.removeItem('isLoggedIn');
		setIsLoggedIn(false)
	}
	return (
			<AuthContext.Provider
					value={{
						isLoggedIn: isLoggedIn,
						onLogout: logoutHandler,
						onLogin: loginHandler
					}}
			>
				{props.children}
			</AuthContext.Provider>
	);
};

export default AuthContext;