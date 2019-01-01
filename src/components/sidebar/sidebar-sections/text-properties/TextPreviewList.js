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
						<TextBox
							boxfill={text.boxFill}
							boxopacity={text.boxOpacity}
						/>
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
	border: 0.5px solid lightgray;
	cursor: pointer;
	display: flex;
	position: relative;

	outline: ${props => (props.activetext ? 'dashed purple' : 'none')};
	box-shadow: ${props => (props.activetext ? '1px 1px 4px gray' : 'none')};

	p {
		display: block;
		margin: auto 0;
		width: 100%;
		z-index: 1;

		${props => {
			const { color, opacity, align, bold, italic, font, size } = props

			return {
				color,
				opacity,
				textAlign: align,
				fontFamily: font,
				fontWeight: bold ? 'bold' : 'normal',
				fontStyle: italic ? 'italic' : 'normal',
				fontSize: `${size / 2.5}px`
			}
		}}
	}
`
const TextBox = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 0;

	background-color: ${props => props.boxfill};
	opacity: ${props => props.boxopacity};
`

export default React.memo(TextPreviewList)
