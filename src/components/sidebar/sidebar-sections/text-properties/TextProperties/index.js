import React, { useCallback } from 'react'
import styled from 'styled-components/macro'

import { hoverActive } from '../../../../../mixins/button'

import { ReactComponent as BoldSVG } from '../../../../../icons/bold.svg'
import { ReactComponent as ItalicSVG } from '../../../../../icons/italic.svg'
import { ReactComponent as AlignLeftSVG } from '../../../../../icons/alignLeft.svg'
import { ReactComponent as AlignCenterSVG } from '../../../../../icons/alignCenter.svg'
import { ReactComponent as AlignRightSVG } from '../../../../../icons/alignRight.svg'

import FontSizes from './FontSizes'

const alignsTuple = {
	left: AlignLeftSVG,
	center: AlignCenterSVG,
	right: AlignRightSVG
}

function TextProperties(props) {
	console.log('rendering text-properties...')

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
			</PropertyDiv>

			<PropertyDiv onClick={stopPropagation}>
				<Property active onClick={handleChangeAlign}>
					<AlignSVG />
					<span>align</span>
				</Property>
			</PropertyDiv>

			<PropertyDiv onClick={stopPropagation}>
				<Property onClick={handleChangeFontSize}>
					<FontSizes currentSize={currentText.fontSize} />
					<span>font size</span>
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
	font-size: 0.7rem;
	font-weight: 600;
	color: gray;
`
const Property = styled.div`
	margin: 0.25rem 0.5rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	cursor: pointer;

	> svg {
		height: 1.25rem;
		width: 1.25rem;
		fill: ${props => (props.active ? 'black' : 'gray')};
	}

	${hoverActive};
`

export default React.memo(TextProperties)
