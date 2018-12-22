import React from 'react'
import styled from 'styled-components'

import { ReactComponent as BoldSVG } from '../../../icons/bold.svg'
import { ReactComponent as ItalicSVG } from '../../../icons/italic.svg'
import { ReactComponent as AlignLeftSVG } from '../../../icons/alignLeft.svg'
import { ReactComponent as AlignCenterSVG } from '../../../icons/alignCenter.svg'
import { ReactComponent as AlignRightSVG } from '../../../icons/alignRight.svg'

import FontSizes from './FontSizes'

const alignsTuple = {
	left: AlignLeftSVG,
	center: AlignCenterSVG,
	right: AlignRightSVG
}

function AdditionalProperties(props) {
	const AlignSVG = alignsTuple[props.currentText.align]

	return (
		<Container>
			<PropertyDiv onClick={props.preventPropagation}>
				<Property
					onClick={props.handleToggleFontStyle('isBold')}
					active={props.currentText.isBold}
				>
					<BoldSVG />
					<span>bold</span>
				</Property>
				<Property
					onClick={props.handleToggleFontStyle('isItalic')}
					active={props.currentText.isItalic}
				>
					<ItalicSVG />
					<span>italic</span>
				</Property>
			</PropertyDiv>

			<PropertyDiv onClick={props.preventPropagation}>
				<Property active onClick={props.handleChangeAlign}>
					<AlignSVG />
					<span>align</span>
				</Property>
			</PropertyDiv>

			<PropertyDiv onClick={props.preventPropagation}>
				<Property onClick={props.handleChangeFontSize}>
					<FontSizes currentSize={props.currentText.fontSize} />
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
`

export default React.memo(AdditionalProperties)
