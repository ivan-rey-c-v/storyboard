import React, { useCallback } from 'react'
import styled from 'styled-components/macro'

function TextInput(props) {
	const { textValue, storeDispatch } = props

	const handleOnTextInputChange = useCallback(function(event) {
		event.stopPropagation()
		const properties = {
			text: event.target.value
		}
		storeDispatch({ type: 'MODIFY_TEXT', properties })
	}, [])

	return (
		<Container>
			<TextArea
				value={textValue}
				name="text"
				onChange={handleOnTextInputChange}
				placeholder="No text value!"
			/>
		</Container>
	)
}

const Container = styled.div`
	margin-top: 0.75rem;
`

const TextArea = styled.textarea`
	padding: 0.25rem 0.4rem;
	width: 100%;
	height: 5.5rem;
	min-height: 5.5rem;
	font-size: 1rem;
	border-radius: 3px;
	color: #565656;
	border: 1px solid lightgray;

	:focus {
		border: 2px solid var(--color-secondary);
	}
`

export default React.memo(TextInput)
