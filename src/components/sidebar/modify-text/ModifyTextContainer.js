import React, { useCallback } from 'react'
import styled from 'styled-components'

import TextPreviewList from './TextPreviewList'
import TextProperties from './TextProperties'

function ModifyTextContainer(props) {
	const { selectedShapeName, canvasName, textIndex } = props

	const handleSelectText = useCallback(
		index => event => {
			event.stopPropagation()
			const name = `${canvasName}-text-${index}-label`
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

	const handleOnColorChange = useCallback(
		(fillName, opacityName) => colors => {
			const { color, alpha } = colors

			const properties = {
				[fillName]: color,
				[opacityName]: alpha / 100
			}
			props.storeDispatch({ type: 'MODIFY_TEXT', properties })
		},
		[]
	)

	const handleToggleFontStyle = useCallback(
		styleName => event => {
			props.storeDispatch({ type: 'TOGGLE_FONT_STYLE', styleName })
		},
		[]
	)

	const handleChangeAlign = useCallback(function(event) {
		props.storeDispatch({ type: 'CHANGE_TEXT_ALIGN' })
	}, [])

	const handleChangeFontSize = useCallback(function(event) {
		props.storeDispatch({ type: 'CHANGE_FONT_SIZE' })
	}, [])

	return (
		<ContainerDiv>
			<Header>
				<p>Texts in {props.storyID}</p>
			</Header>

			<TextPreviewList
				textList={props.texts}
				canvasName={canvasName}
				selectedShapeName={selectedShapeName}
				handleSelectText={handleSelectText}
			/>
			{textIndex != null && textIndex < props.texts.length && (
				<TextProperties
					storyID={props.storyID}
					storeDispatch={props.storeDispatch}
					currentText={props.texts[textIndex]}
					handleOnTextInputChange={handleOnTextInputChange}
					handleOnColorChange={handleOnColorChange}
					handleToggleFontStyle={handleToggleFontStyle}
					handleChangeAlign={handleChangeAlign}
					handleChangeFontSize={handleChangeFontSize}
				/>
			)}
		</ContainerDiv>
	)
}

const ContainerDiv = styled.div`
	padding-top: 0.75rem;
`
const Header = styled.header`
	font-size: 0.75rem;
	font-weight: 600;
	color: darkgray;
`

export default React.memo(ModifyTextContainer)
