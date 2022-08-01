import React, {useState, useEffect, useReducer, useContext} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from "../../Store/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => { //최신 스냅샷 state, dispatch 된 action
	if (action.type === 'USER_INPUT') {
		return {value: action.val, isValid: action.val.includes('@')}
	}
	if (action.type === 'USER_BLUR') {
		return {value: state.value, isValid: state.value.includes('@')}
	}
	return {value: '', isValid: false}
}

const passwordReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return {value: action.val, isValid: action.val.trim().length > 6}
	}
	if (action.type === 'INPUT_BLUR') {
		return {value: state.value, isValid: state.value.trim().length > 6}
	}
	return {value: '', isValid: false}
}

const Login = () => {
	/*const [enteredEmail, setEnteredEmail] = useState('');
	const [emailIsValid, setEmailIsValid] = useState();*/
	/*const [enteredPassword, setEnteredPassword] = useState('');
	const [passwordIsValid, setPasswordIsValid] = useState();*/
	const [formIsValid, setFormIsValid] = useState(false);

	//인수로 reducerFn 과 초기 state 설정
	const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: null,})
	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: null})

	const contextLogInOut = useContext(AuthContext)

	/*useEffect(() => {
		console.log('effect running')
		return () => {
			console.log('effect cleanup');
		}
	}, [])*/

	// 객체 디스트럭쳐링으로 emailState 에서 isValid 속성을 가져왔고 유효성 검사를 하지않을땐 useEffect 가 실행되지않음
	const {isValid: emailIsValid} = emailState;
	const {isValid: passwordIsValid} = passwordState;

	useEffect(() => { // 다른 state 를 기준으로 state 를 update 하는 좋은 방법
		const identifier = setTimeout(() => {
			console.log('유효성 식별 검사')
			//이메일에 @ 가 포함되어야하며 입력된 비밀번호가 정확한지 체크 및 입력 이메일또는 비번이 변경될때 업데이트
			setFormIsValid( // setFormIsValid 가 useEffect 안에있기때문에 여전히 state 스냅샷을 참조한다
					emailState.isValid && passwordState.isValid)
		}, 500) // 0.5초 딜레이
		return () => {
			console.log('clean up')
			clearTimeout(identifier) // 타이머 초기화

		}
	}, [emailIsValid, passwordIsValid])

	const emailChangeHandler = (event) => {
		dispatchEmail({
			type: 'USER_INPUT',
			val: event.target.value,
		});

		setFormIsValid(
				event.target.value.includes('@') && passwordState.isValid
		)
	};

	const passwordChangeHandler = (event) => {
		// 비밀번호가 변경될때 dispatchPassword 호출
		dispatchPassword({
			type: 'USER_INPUT',
			val: event.target.value,
		});

		//비밀번호가 6자리 이상인지 @가 포함되어있는지
		setFormIsValid(
				event.target.value.trim().length > 6 && emailState.isValid
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
		contextLogInOut.onLogin(emailState.value, passwordState.value);
	};

	return (
			<Card className={classes.login}>
				<form onSubmit={submitHandler}>
					<Input
							id="email"
							type="email"
							label="E-Mail"
							isValid={emailIsValid}
							value={emailState.value}
							onChange={emailChangeHandler}
							onBlur={validateEmailHandler}
					/>
						<Input
								id="password"
								type="password"
								label="Password"
								value={passwordState.value}
								autoComplete="on"
								onChange={passwordChangeHandler}
								onBlur={validatePasswordHandler}
						/>
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
