import React from 'react'
import styled from 'styled-components'

function TextPreviewList(props) {
	return (
		<List>
			{props.textList.map((text, index) => (
				<TextCard
					key={`preview-text-${index}`}
					onClick={props.handleSelectText(index)}
					activetext={
						props.selectedShapeName ===
						`${props.storyName}-text-${index}`
					}
					color={text.fill}
					opacity={text.opacity}
				>
					<p>Aa</p>
				</TextCard>
			))}
		</List>
	)
}

const List = styled.ol`
	margin: 0;
	list-style: none;
	padding-bottom: 0.5rem;
	display: flex;

	overflow: auto;
`
const TextCard = styled.li`
	flex: 0 0 auto;
	height: 2rem;
	width: 2rem;
	background-color: #f2f2f2;
	cursor: pointer;
	margin-right: 1rem;
	display: flex;
	justify-content: center;

	p {
		font-weight: 600;
		display: block;
		margin: auto 0;
	}

	${props => {
		const { activetext, color, opacity } = props
		return {
			color,
			opacity,
			border: activetext ? '2px 2px 2px purple' : 'none'
		}
	}};
`

export default React.memo(TextPreviewList)
