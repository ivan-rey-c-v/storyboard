import React from 'react'
import styled from 'styled-components'

function AdditionalProperties(props) {
	return (
		<Container>
			<Card />
			<Card />
			<Card />
			<Card />
		</Container>
	)
}

const Container = styled.div`
	padding-top: 0.5rem;
	display: flex;
	justify-content: space-around;
`
const Card = styled.div`
	flex: 0 0 auto;
	height: 2.5rem;
	width: 2.5rem;
	background-color: lightseagreen;
`

export default React.memo(AdditionalProperties)
