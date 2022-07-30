import React from 'react';

import classes from './Navigation.module.css';
import AuthContext from '../../Store/auth-context'

const Navigation = (props) => {
	return (
			/*소비자는 자식을 가지고 함수여야함*/
			<AuthContext.Consumer>
				{(contextLoggedIn) => {
					return <nav className={classes.nav}>
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
				}}
			</AuthContext.Consumer>
	);
};

export default Navigation;
