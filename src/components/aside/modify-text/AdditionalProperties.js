import React, { lazy, Suspense } from 'react'
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
	const AlignSVG = alignsTuple['center']

	return (
		<Container>
			<PropertyDiv onClick={props.preventPropagation}>
				<Property>
					<BoldSVG />
					<span>bold</span>
				</Property>
				<Property>
					<ItalicSVG />
					<span>italic</span>
				</Property>
			</PropertyDiv>

			<PropertyDiv onClick={props.preventPropagation}>
				<Property>
					<AlignSVG />
					<span>align</span>
				</Property>
			</PropertyDiv>

			<PropertyDiv onClick={props.preventPropagation}>
				<Property>
					<FontSizes />
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
	background-color: lightgray;
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
		fill: gray;
	}
`

export default React.memo(AdditionalProperties)
