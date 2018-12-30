import React, { useCallback } from 'react'
import styled from 'styled-components/macro'

function TextPreviewList(props) {
	const {
		texts,
		storyID,
		storyIndex,
		canvasName,
		shapeName,
		storeDispatch
	} = props

	const handleSelectText = useCallback(
		textIndex => event => {
			event.stopPropagation()
			const name = `${canvasName}-text-${textIndex}-group`
			storeDispatch({
				type: 'SET_ACTIVE_SHAPE_NAME',
				storyIndex,
				name,
				textIndex
			})
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
							shapeName === `${canvasName}-text-${index}-group`
						}
						color={text.fill}
						opacity={text.opacity}
						align={text.align}
						bold={text.isBold}
						italic={text.isItalic}
						font={text.fontFamily}
						size={text.fontSize}
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

	p {
		display: block;
		margin: auto 0;
		width: 100%;
	}

	${props => {
		const {
			activetext,
			color,
			opacity,
			align,
			bold,
			italic,
			font,
			size
		} = props

		return {
			color,
			opacity,
			textAlign: align,
			fontFamily: font,
			fontWeight: bold ? 'bold' : 'normal',
			fontStyle: italic ? 'italic' : 'normal',
			fontSize: `${size / 2.5}px`,
			outline: activetext ? 'dashed purple' : 'none',
			boxShadow: activetext ? '1px 1px 4px gray' : 'none'
		}
	}};
`

export default React.memo(TextPreviewList)
