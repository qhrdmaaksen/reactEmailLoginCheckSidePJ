import React, {useState, useEffect} from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from "./Store/auth-context";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const storedUserLoggedInInfomation = localStorage.getItem('isLoggedIn');
		if (storedUserLoggedInInfomation === 'login') {
			setIsLoggedIn(true);
		}
	}, [])

	const loginHandler = (email, password) => {
		// We should of course check email and password
		// But it's just a dummy/ demo anyways
		localStorage.setItem('isLoggedIn', 'login');
		setIsLoggedIn(true);
	};

	const logoutHandler = () => {
		localStorage.setItem('isLogout', 'logout');
		setIsLoggedIn(false);
	};

	return (
			/*AuthContext 를 Wrapper 로 사용(root 수준 컴포넌트로 반환하기때문)
			* MainHeader 뿐만 아니라 Login 및 Home 컴포넌트 등 모든 자식은 AuthContext 에 접근할 수 있음
			* */
			<AuthContext.Provider value={{ /*객체 전달 가능하며 해당 객체를 변경 할 수 있다 ex) state 나 앱컴포넌트를 통해 변경경될때마다 새 값이 모든 소비 컴포넌트에 전달됨*/
				isLoggedIn: isLoggedIn, /*value 객체는 isLoggedIn 이 변경 될때마다 리액트에의해 업데이트됨 그리고 새로운 객체 새로운 컨텍스트 객체는 모든 리스닝 컴포넌트로 전달됨*/
			}}>
				<MainHeader onLogout={logoutHandler}/>
				<main>
					{!isLoggedIn && <Login onLogin={loginHandler}/>}
					{isLoggedIn && <Home onLogout={logoutHandler}/>}
				</main>
			</AuthContext.Provider>
	);
}

export default App;
