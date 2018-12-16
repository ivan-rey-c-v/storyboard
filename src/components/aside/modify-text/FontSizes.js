import React from 'react'
import styled from 'styled-components'

const sizes = [12, 16, 20, 24]

function FontSizes(props) {
	return (
		<Div>
			{sizes.map(size => (
				<Font key={`font-size-${size}`} size={size}>
					F
				</Font>
			))}
		</Div>
	)
}

const Div = styled.div`
	display: flex;
	height: 1.25rem;
	width: 4rem;

	display: flex;
	justify-content: center;
`
const Font = styled.p`
	height: 100%;
	font-weight: 600;
	line-height: 1rem;
	font-size: ${props => `${props.size}px`};
	padding: 0 0.2rem;
`

export default React.memo(FontSizes)
