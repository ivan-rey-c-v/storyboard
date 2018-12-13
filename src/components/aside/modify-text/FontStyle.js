import React from 'react'
import styled from 'styled-components'

function FontStyle(props) {
	const { fontStyle } = props

	return (
		<Container onClick={props.handleOnFontStyleChange(fontStyle)}>
			<Par fontStyle={fontStyle}>{fontStyle.charAt(0)}</Par>
			<Small>{fontStyle}</Small>
		</Container>
	)
}

const Container = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-transform: uppercase;
	cursor: pointer;
`
const Par = styled.p`
	font-size: 1.25rem;

	${props =>
		props.fontStyle === 'bold'
			? {
					fontWeight: 900
			  }
			: {
					fontStyle: props.fontStyle
			  }}
`

const Small = styled.p`
	font-size: 0.5rem;
	color: #6b576b;
`

export default React.memo(FontStyle)
