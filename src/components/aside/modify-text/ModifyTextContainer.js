import React, { useCallback } from 'react'
import styled from 'styled-components'

import TextPreviewList from './TextPreviewList'
import TextProperties from './TextProperties'

function ModifyTextContainer(props) {
	const { selectedShapeName, storyName, textIndex } = props

	const handleSelectText = useCallback(
		index => event => {
			event.stopPropagation()
			const name = `${storyName}-text-${index}`
			props.storeDispatch({
				type: 'SET_SELECTED_SHAPE_NAME',
				name,
				textIndex: index
			})
		},
		[]
	)

	const handleOnTextInputChange = useCallback(function(event) {
		event.stopPropagation()
		const { value, name } = event.target

		const properties = {
			[name]: value
		}
		props.storeDispatch({ type: 'MODIFY_TEXT', properties })
	}, [])

	const handleOnColorChange = useCallback(function(colors) {
		const { color, alpha } = colors

		const properties = {
			fill: color,
			opacity: alpha / 100
		}
		props.storeDispatch({ type: 'MODIFY_TEXT', properties })
	}, [])

	return (
		<ContainerDiv>
			<Header>
				<p>Texts in {props.storyID}</p>
			</Header>

			<TextPreviewList
				textList={props.texts}
				storyName={storyName}
				selectedShapeName={selectedShapeName}
				handleSelectText={handleSelectText}
			/>
			{textIndex != null && (
				<TextProperties
					storyID={props.storyID}
					storeDispatch={props.storeDispatch}
					currentText={props.texts[textIndex]}
					handleOnTextInputChange={handleOnTextInputChange}
					handleOnColorChange={handleOnColorChange}
				/>
			)}
		</ContainerDiv>
	)
}

const ContainerDiv = styled.div`
	padding-top: 0.75rem;
`
const Header = styled.header`
	padding-bottom: 0.5rem;
	font-size: 0.75rem;
	font-weight: 600;
	color: darkgray;
`

export default React.memo(ModifyTextContainer)
