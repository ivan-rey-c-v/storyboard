import React, { useCallback } from 'react'
import styled, { css } from 'styled-components/macro'
import Select from 'react-select'

import { ReactComponent as StrikethroughSVG } from '../../../../icons/strikethrough.svg'
import BoldSVG from 'react-feather/dist/icons/bold'
import ItalicSVG from 'react-feather/dist/icons/italic'
import UnderlineSVG from 'react-feather/dist/icons/underline'
import AlignLeftSVG from 'react-feather/dist/icons/align-left'
import AlignCenterSVG from 'react-feather/dist/icons/align-center'
import AlignRightSVG from 'react-feather/dist/icons/align-right'

const alignsTuple = {
	left: AlignLeftSVG,
	center: AlignCenterSVG,
	right: AlignRightSVG
}
const alignOptions = [
	{ label: 'left', value: 'left' },
	{ label: 'center', value: 'center' },
	{ label: 'right', value: 'right' }
]

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

	const handleSelectAlign = useCallback(function(option, action) {
		const properties = {
			[action.name]: option.value
		}
		storeDispatch({ type: 'MODIFY_TEXT', properties })
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
				</Property>
				<Property
					onClick={handleToggleProperty}
					active={currentText.isItalic}
					data-name="isItalic"
				>
					<ItalicSVG />
				</Property>
				<Property
					onClick={handleToggleProperty}
					active={currentText.isUnderline}
					data-name="isUnderline"
				>
					<UnderlineSVG />
				</Property>
				<Property
				// onClick={handleToggleProperty}
				// active={currentText.isUnderline}
				// data-name="isUnderline"
				>
					<StrikethroughSVG />
				</Property>
			</PropertyDiv>

			<AlignDiv onClick={stopPropagation}>
				<Select
					name="align"
					onChange={handleSelectAlign}
					options={alignOptions}
					value={alignOptions.filter(
						option => option.value === currentText.align
					)}
				/>
			</AlignDiv>
		</Container>
	)
}

const Container = styled.div`
	margin-top: 0.75rem;
	display: flex;
`
const PropertyDiv = styled.div`
	display: flex;
	border-radius: 4px;
	border: 1px solid hsl(0, 0%, 80%);
	height: 38px;
	width: 189px;
	padding: 0 0.5rem;
`
const Property = styled.div.attrs({
	tabIndex: 0
})`
	flex: 1 0 0;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;

	> svg {
		height: 60%;
		width: 100%;
	}

	&:hover {
		background-color: #c9e0ff;
	}

	${props =>
		props.active
			? css`
					color: white;
					background-color: var(--color-secondary);
			  `
			: css`
					color: darkslategray;
			  `}
`
const AlignDiv = styled.div`
	margin: 0 0 0 1rem;
	min-width: 112px;
`

export default React.memo(TextProperties)
