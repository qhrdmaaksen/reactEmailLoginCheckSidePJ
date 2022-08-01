import React from 'react';
import classes from './Input.module.css'

/*div input component reuse refactor*/
const Input = (props) => {
	return (
			<div
					className={`${classes.control} ${
							props.isValid === false ? classes.invalid : '' /*인풋 유효성 검사*/
					}`}
			>
				<label htmlFor={props.id}>{props.label}</label>
				<input
						type={props.type}
						id={props.id}
						value={props.value}
						onChange={props.onChange}
						onBlur={props.onBlur}
				/>
			</div>
	)
}
export default Input ;