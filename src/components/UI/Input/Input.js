import React, {useRef, useImperativeHandle} from 'react';

import classes from './Input.module.css'

/*div input component reuse refactor*/
const Input = React.forwardRef((props, ref) => {

	/*input first field focusing*/
	const inputRef = useRef();
	const activate = () => {
		inputRef.current.focus();
	};
	/*useEffect(()=>{ 이런식으로 사용하면 렌더링되는 최신 인풋인 두번째 password field 로 focusing 됨
		inputRef.current.focus();
	},[])*/

	useImperativeHandle(ref,()=>{
		return {
			focus: activate,
		};
	})

	return (
			<div
					className={`${classes.control} ${
							props.isValid === false ? classes.invalid : '' /*인풋 유효성 검사*/
					}`}
			>
				<label htmlFor={props.id}>{props.label}</label>
				<input
						ref = {inputRef}
						type={props.type}
						id={props.id}
						value={props.value}
						onChange={props.onChange}
						onBlur={props.onBlur}
				/>
			</div>
	)
})
export default Input ;