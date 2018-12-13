import React from 'react'
import styled from 'styled-components'

function TextInput(props) {
	return <Input value="Add Text" />
}

const Input = styled.input`
	margin-top: 0.5rem;
	width: 100%;
	height: 1.75rem;
	font-size: 1rem;
	padding: 0 0.25rem;
	border-radius: 3px;
	color: #707070;
	border: 1px solid lightgray;
`

export default React.memo(TextInput)
