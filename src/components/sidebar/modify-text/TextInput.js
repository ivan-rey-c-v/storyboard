import React from 'react'
import styled from 'styled-components'

function TextInput(props) {
	return (
		<Input
			value={props.textValue}
			name="text"
			onChange={props.handleOnTextInputChange}
			onClick={props.preventPropagation}
			placeholder="No text value!"
		/>
	)
}

const Input = styled.input`
	margin-top: 0.5rem;
	width: 100%;
	height: 1.75rem;
	font-size: 1rem;
	padding: 0 0.25rem;
	border-radius: 3px;
	color: #565656;
	border: 1px solid lightgray;

	:focus {
		border: 1px solid rebeccapurple;
	}
`

export default React.memo(TextInput)
