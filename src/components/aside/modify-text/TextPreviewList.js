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
	background-color: gray;
	cursor: pointer;
	margin-right: 1rem;
	display: flex;
	padding: 0 0.2rem;

	box-shadow: ${props => (props.activetext ? '2px 2px 2px purple' : 'none')};

	p {
		font-size: 0.8rem;
		display: block;
		margin: auto 0;
	}
`

export default React.memo(TextPreviewList)
