import React, {useContext} from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from "./Store/auth-context";

function App() {
	const contextLogInOut = useContext(AuthContext)
	return (
			/*AuthContext 를 Wrapper 로 사용(root 수준 컴포넌트로 반환하기때문)
			* MainHeader 뿐만 아니라 Login 및 Home 컴포넌트 등 모든 자식은 AuthContext 에 접근할 수 있음
			* */
			<React.Fragment>
				<MainHeader/>
				<main>
					{/*context 에서 설정한 isLoggedIn 얻기*/}
					{!contextLogInOut.isLoggedIn && <Login />}
					{contextLogInOut.isLoggedIn && <Home />}
				</main>
			</React.Fragment>
	);
}

export default App;
