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
						`${props.canvasName}-text-${index}-label`
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
	list-style: none;
	display: flex;
	flex-wrap: wrap;
`
const TextCard = styled.li`
	flex: 0 0 auto;
	height: 2rem;
	width: 2rem;
	margin-top: 0.5rem;
	margin-right: 0.75rem;
	background-color: #f2f2f2;
	cursor: pointer;
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
			outline: activetext ? 'dashed purple' : 'none',
			boxShadow: activetext ? '1px 1px 4px gray' : 'none'
		}
	}};
`

export default React.memo(TextPreviewList)
