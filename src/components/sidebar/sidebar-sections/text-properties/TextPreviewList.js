import React, { useCallback } from 'react'
import styled from 'styled-components/macro'

function TextPreviewList(props) {
	const { texts, storyID, canvasName, shapeName, storeDispatch } = props

	const handleSelectText = useCallback(
		textIndex => event => {
			event.stopPropagation()
			const name = `${canvasName}-text-${textIndex}-label`
			storeDispatch({ type: 'SET_ACTIVE_SHAPE_NAME', name, textIndex })
		},
		[]
	)

	return (
		<>
			<Description> Texts in {storyID}</Description>
			<List>
				{texts.map((text, index) => (
					<TextCard
						key={`preview-text-${index}`}
						onClick={handleSelectText(index)}
						activetext={
							shapeName === `${canvasName}-text-${index}-label`
						}
						color={text.fill}
						opacity={text.opacity}
					>
						<p>Aa</p>
					</TextCard>
				))}
			</List>
		</>
	)
}

const Description = styled.p`
	margin-top: 1rem;
	font-size: 0.75rem;
	font-weight: 600;
	color: darkgray;
`

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
