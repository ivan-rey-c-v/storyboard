import React from 'react'
import styled from 'styled-components/macro'

const sizes = [24, 34, 44, 54]

function FontSizes(props) {
	return (
		<Div>
			{sizes.map(size => (
				<Font
					key={`font-size-${size}`}
					size={size}
					iscurrentsize={props.currentSize === size}
				>
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
	line-height: 1.25rem;
	font-size: ${props => `${props.size / 2}px`};
	padding: 0 0.15rem;
	color: ${props => (props.iscurrentsize ? 'black' : 'gray')};
	font-weight: ${props => (props.iscurrentsize ? 900 : 600)};
`

export default React.memo(FontSizes)
