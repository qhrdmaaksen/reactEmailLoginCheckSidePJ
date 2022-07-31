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
		const storedUserLoggedInInfomation = localStorage.getItem('isLoggedIn');
		if (storedUserLoggedInInfomation === 'login') {
			setIsLoggedIn(true);
		}
	}, [])

	const loginHandler = () => {
		setIsLoggedIn(true)
		localStorage.setItem('isLoggedIn', 'login');
	}
	const logoutHandler = () => {
		setIsLoggedIn(false)
		localStorage.setItem('isLogout', 'logout');
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