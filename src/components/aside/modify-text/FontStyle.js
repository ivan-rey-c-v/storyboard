import React from 'react'
import styled from 'styled-components'

function FontStyle(props) {
	const { fontStyle } = props

	return (
		<Container onClick={props.handleOnFontStyleChange(fontStyle)}>
			<Par fontStyle={fontStyle}>{fontStyle.charAt(0)}</Par>
		</Container>
	)
}

const Container = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
`
const Par = styled.p`
	font-size: 1.5rem;
	text-transform: uppercase;
	${props =>
		props.fontStyle === 'bold'
			? {
					fontWeight: 900
			  }
			: {
					fontStyle: props.fontStyle
			  }}
`

export default React.memo(FontStyle)
