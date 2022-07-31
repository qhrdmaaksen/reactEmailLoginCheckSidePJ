import React, {useContext} from 'react';

import classes from './Navigation.module.css';
import AuthContext from '../../Store/auth-context'

const Navigation = (props) => {
	const contextLoggedIn = useContext(AuthContext)
	return (
			/*소비자는 자식을 가지고 함수여야함*/
			<nav className={classes.nav}>
				<ul>
					{contextLoggedIn.isLoggedIn && (
							<li>
								<a href="/">Users</a>
							</li>
					)}
					{contextLoggedIn.isLoggedIn && (
							<li>
								<a href="/">Admin</a>
							</li>
					)}
					{contextLoggedIn.isLoggedIn && (
							<li>
								<button onClick={props.onLogout}>Logout</button>
							</li>
					)}
				</ul>
			</nav>
	);
};

export default Navigation;
