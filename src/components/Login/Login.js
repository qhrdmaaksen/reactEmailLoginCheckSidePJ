import React, {useState, useEffect, useReducer} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => { //최신 스냅샷 state, dispatch 된 action
	if (action.type === 'USER_INPUT') {
		return {value: action.val, isValid: action.val.includes('@')}
	}
	if(action.type === 'USER_BLUR'){
		return {value: state.value, isValid: state.value.includes('@')}
	}
		return {value: '', isValid: false}
}

const passwordReducer = (state, action) => {
	if(action.type === 'USER_INPUT'){
		return {value: action.val, isValid: action.val.trim().length > 6}
	}
	if (action.type === 'INPUT_BLUR'){
		return {value: state.value, isValid: state.value.trim().length > 6}
	}
	return {value: '', isValid: false}
}

const Login = (props) => {
	/*const [enteredEmail, setEnteredEmail] = useState('');
	const [emailIsValid, setEmailIsValid] = useState();*/
	/*const [enteredPassword, setEnteredPassword] = useState('');
	const [passwordIsValid, setPasswordIsValid] = useState();*/
	const [formIsValid, setFormIsValid] = useState(false);

	//인수로 reducerFn 과 초기 state 설정
	const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: null,})
	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: null})

	/*useEffect(() => {
		console.log('effect running')
		return () => {
			console.log('effect cleanup');
		}
	}, [])

	useEffect(() => {
		const identifier = setTimeout(() => {
			console.log('유효성 식별 검사')
			//이메일에 @ 가 포함되어야하며 입력된 비밀번호가 정확한지 체크 및 입력 이메일또는 비번이 변경될때 업데이트
			setFormIsValid(
					emailState.value.includes('@') && passwordState.value.trim().length > 6);
		}, 500) // 0.5초 딜레이
		return () => {
			console.log('clean up')
			clearTimeout(identifier) // 타이머 초기화

		}
	}, [emailState, passwordState])*/

	const emailChangeHandler = (event) => {
		dispatchEmail({
			type: 'USER_INPUT',
			val: event.target.value,
		});
	};

	const passwordChangeHandler = (event) => {
		dispatchPassword({
			type: 'USER_INPUT',
			val: event.target.value,
		});

		//비밀번호가 6자리 이상인지 @가 포함되어있는지
		setFormIsValid(
				passwordState.isValid && emailState.isValid
		);
	};

	const validateEmailHandler = () => {
		//setEmailIsValid(emailState.isValid.includes('@'));
		dispatchEmail({
			type: 'INPUT_BLUR',
		})
	};

	const validatePasswordHandler = () => {
		//setPasswordIsValid(passwordState.value.trim().length > 6);
		dispatchPassword({
			type: 'USER_BLUR',
		})
	};

	const submitHandler = (event) => {
		event.preventDefault();
		props.onLogin(emailState.value, passwordState.value);
	};

	return (
			<Card className={classes.login}>
				<form onSubmit={submitHandler}>
					<div
							className={`${classes.control} ${
									emailState.isValid === false ? classes.invalid : ''
							}`}
					>
						<label htmlFor="email">E-Mail</label>
						<input
								type="email"
								id="email"
								value={emailState.value}
								onChange={emailChangeHandler}
								onBlur={validateEmailHandler}
						/>
					</div>
					<div
							className={`${classes.control} ${
									passwordState.isValid === false ? classes.invalid : ''
							}`}
					>
						<label htmlFor="password">Password</label>
						<input
								type="password"
								id="password"
								value={passwordState.value}
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
