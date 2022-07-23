import React, {useState, useEffect} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
	const [enteredEmail, setEnteredEmail] = useState('');
	const [emailIsValid, setEmailIsValid] = useState();
	const [enteredPassword, setEnteredPassword] = useState('');
	const [passwordIsValid, setPasswordIsValid] = useState();
	const [formIsValid, setFormIsValid] = useState(false);

	useEffect(()=>{
		console.log('effect running')
		return ()=> {
			console.log('effect cleanup');
		}
	}, [])

	useEffect(() => {
		const identifier = setTimeout(() => {
			console.log('유효성 식별 검사')
			//이메일에 @ 가 포함되어야하며 입력된 비밀번호가 정확한지 체크 및 입력 이메일또는 비번이 변경될때 업데이트
			setFormIsValid(
					enteredEmail.includes('@') && enteredPassword.trim().length > 6);
		}, 500) // 0.5초 딜레이
		return () => {
			console.log('clean up')
			clearTimeout(identifier) // 타이머 초기화

		}
	}, [enteredEmail, enteredPassword])

	const emailChangeHandler = (event) => {
		setEnteredEmail(event.target.value);
	};

	const passwordChangeHandler = (event) => {
		setEnteredPassword(event.target.value);

		//비밀번호가 6자리 이상인지 @가 포함되어있는지
		setFormIsValid(
				event.target.value.trim().length > 6 && enteredEmail.includes('@')
		);
	};

	const validateEmailHandler = () => {
		setEmailIsValid(enteredEmail.includes('@'));
	};

	const validatePasswordHandler = () => {
		setPasswordIsValid(enteredPassword.trim().length > 6);
	};

	const submitHandler = (event) => {
		event.preventDefault();
		props.onLogin(enteredEmail, enteredPassword);
	};

	return (
			<Card className={classes.login}>
				<form onSubmit={submitHandler}>
					<div
							className={`${classes.control} ${
									emailIsValid === false ? classes.invalid : ''
							}`}
					>
						<label htmlFor="email">E-Mail</label>
						<input
								type="email"
								id="email"
								value={enteredEmail}
								onChange={emailChangeHandler}
								onBlur={validateEmailHandler}
						/>
					</div>
					<div
							className={`${classes.control} ${
									passwordIsValid === false ? classes.invalid : ''
							}`}
					>
						<label htmlFor="password">Password</label>
						<input
								type="password"
								id="password"
								value={enteredPassword}
								onChange={passwordChangeHandler}
								onBlur={validatePasswordHandler}
						/>
					</div>
					<div className={classes.actions}>
						<Button type="submit" className={classes.btn} disabled={!formIsValid}>
							Login
						</Button>
					</div>
				</form>
			</Card>
	);
};

export default Login;
