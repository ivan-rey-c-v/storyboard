import React, { useCallback } from 'react'
import styled from 'styled-components/macro'

import { hoverActive } from '../../../../../mixins/button'

import BoldSVG from 'react-feather/dist/icons/bold'
import ItalicSVG from 'react-feather/dist/icons/italic'
import UnderlineSVG from 'react-feather/dist/icons/underline'
import AlignLeftSVG from 'react-feather/dist/icons/align-left'
import AlignCenterSVG from 'react-feather/dist/icons/align-center'
import AlignRightSVG from 'react-feather/dist/icons/align-right'

import FontSizes from './FontSizes'

const alignsTuple = {
	left: AlignLeftSVG,
	center: AlignCenterSVG,
	right: AlignRightSVG
}

function TextProperties(props) {
	const { storeDispatch, currentText } = props
	const AlignSVG = alignsTuple[currentText.align]

	const stopPropagation = useCallback(function(event) {
		event.stopPropagation()
	}, [])

	const handleToggleProperty = useCallback(function(event) {
		const propertyName = event.currentTarget.getAttribute('data-name')

		storeDispatch({ type: 'TOGGLE_TEXT_PROPERTY', propertyName })
	}, [])

	const handleChangeAlign = useCallback(function(event) {
		storeDispatch({ type: 'CHANGE_TEXT_ALIGN' })
	}, [])

	const handleChangeFontSize = useCallback(function(event) {
		storeDispatch({ type: 'CHANGE_FONT_SIZE' })
	}, [])

	return (
		<Container>
			<PropertyDiv onClick={stopPropagation}>
				<Property
					onClick={handleToggleProperty}
					active={currentText.isBold}
					data-name="isBold"
				>
					<BoldSVG />
					<span>bold</span>
				</Property>
				<Property
					onClick={handleToggleProperty}
					active={currentText.isItalic}
					data-name="isItalic"
				>
					<ItalicSVG />
					<span>italic</span>
				</Property>
				<Property
					onClick={handleToggleProperty}
					active={currentText.isUnderline}
					data-name="isUnderline"
				>
					<UnderlineSVG />
					<span>underline</span>
				</Property>
			</PropertyDiv>

			<PropertyDiv onClick={stopPropagation}>
				<Property active onClick={handleChangeAlign}>
					<AlignSVG />
					<span>align</span>
				</Property>
			</PropertyDiv>
		</Container>
	)
}

const Container = styled.div`
	padding-top: 0.5rem;
	display: flex;
	justify-content: space-around;
`
const PropertyDiv = styled.div`
	display: flex;
	border-radius: 4px;
	background-color: #f2f2f2;

	color: gray;
`
const Property = styled.div.attrs({
	tabIndex: 0
})`
	margin: 0.25rem 0.5rem;
	font-size: 0.7rem;
	font-weight: 600;
	display: flex;
	flex-direction: column;
	align-items: center;
	cursor: pointer;

	> svg {
		height: 1.25rem;
		width: 1.25rem;
		color: ${props => (props.active ? 'black' : 'gray')};
	}

	${hoverActive};
`

export default React.memo(TextProperties)
