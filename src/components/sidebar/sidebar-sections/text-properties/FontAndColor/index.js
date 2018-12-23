import React, { useCallback, useState } from 'react'
import styled from 'styled-components/macro'

import ColorSwatch from './ColorSwatch'

const fonts = [
	'Arial',
	'Calibri',
	'Times New Roman'
	//
	//
	//
]

function FontAndColor(props) {
	const { currentText, storeDispatch } = props

	return (
		<Container>
			<Select
				name="fontFamily"
				// onChange={props.handleOnTextInputChange}
				// onClick={props.preventPropagation}
				// font={props.currentText.fontFamily}
			>
				{fonts.map(font => (
					<Option key={font} font={font}>
						{font}
					</Option>
				))}
			</Select>

			<ColorsDiv>
				<ColorSwatch name="text">
					<Alpha color={currentText.fill}>A</Alpha>
				</ColorSwatch>

				<ColorSwatch name="box">
					<ColorBox color={currentText.boxFill} />
				</ColorSwatch>
			</ColorsDiv>
		</Container>
	)
}

const Container = styled.div`
	padding-top: 0.5rem;
	position: relative;
	display: flex;
	align-items: center;
`
const ColorsDiv = styled.div`
	margin-left: 0.5rem;
	display: flex;
`
const Alpha = styled.p`
	height: 21px;
	font-weight: 900;
	font-size: 1.25rem;

	color: ${props => props.color};
`
const ColorBox = styled.div`
	height: 21px;
	width: 21px;
	border: 1px solid lightgray;
	border-radius: 3px;

	background-color: ${props => props.color};
`

const Select = styled.select`
	width: 100%;
	height: 2rem;
	font-size: 1rem;
	padding: 0 0.25rem;
	color: #707070;
	cursor: pointer;
	font-family: ${props => `${props.font}`};
`
const Option = styled.option`
	font-family: ${props => `${props.font}`};
`

export default React.memo(FontAndColor)
