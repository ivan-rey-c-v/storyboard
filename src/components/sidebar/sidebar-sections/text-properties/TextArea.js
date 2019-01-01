import React, { useCallback } from 'react'
import styled from 'styled-components'

function TextInput(props) {
	const { textValue, storeDispatch } = props

	const preventPropagation = useCallback(function(event) {
		event.stopPropagation()
	}, [])

	const handleOnTextInputChange = useCallback(function(event) {
		event.stopPropagation()
		const properties = {
			text: event.target.value
		}
		storeDispatch({ type: 'MODIFY_TEXT', properties })
	}, [])

	return (
		<TextArea
			value={textValue}
			name="text"
			onChange={handleOnTextInputChange}
			onClick={preventPropagation}
			placeholder="No text value!"
		/>
	)
}

const TextArea = styled.textarea`
	margin-top: 1rem;
	width: 100%;
	height: 5rem;
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
