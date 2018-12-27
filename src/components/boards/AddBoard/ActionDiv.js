import React from 'react'
import styled from 'styled-components/macro'

function ActionDiv(props) {
	const { message, children } = props

	return (
		<Div>
			<SVGContainer>{children}</SVGContainer>

			<span>{message}</span>
		</Div>
	)
}

const Div = styled.div`
	margin-top: 20%;
	display: flex;
	flex-direction: column;
	align-items: center;

	font-size: 80%;
	font-weight: 600;
	color: gray;
`
const SVGContainer = styled.div`
	margin: 0.75rem;
	height: 4rem;
	width: 4rem;
`

export default React.memo(ActionDiv)
