import React, { lazy, Suspense } from 'react'
import styled from 'styled-components'

const ColorPicker = lazy(_ => import('./ColorPicker'))

const fonts = [
	'Arial',
	'Calibri',
	'Times New Roman'
	//
	//
	//
]

function FontAndColor(props) {
	return (
		<Container>
			<Select
				name="fontFamily"
				onChange={props.handleOnTextInputChange}
				onClick={props.preventPropagation}
				font={props.currentText.fontFamily}
			>
				{fonts.map((font, index) => (
					<Option key={font} font={font}>
						{font}
					</Option>
				))}
			</Select>

			<div className="colors">
				<div className="color-div">
					<Suspense fallback={<div />}>
						<ColorPicker
							fillName="fill"
							opacityName="opacity"
							fill={props.currentText.fill}
							opacity={props.currentText.opacity}
							currentText={props.currentText}
							handleOnColorChange={props.handleOnColorChange}
						>
							<PickerBoxDiv color={props.currentText.fill}>
								<p>A</p>
							</PickerBoxDiv>
						</ColorPicker>
					</Suspense>
					<span className="picker-name">text</span>
				</div>

				<div className="color-div" onClick={props.preventPropagation}>
					<Suspense fallback={<div />}>
						<ColorPicker
							fillName="boxFill"
							opacityName="boxOpacity"
							fill={props.currentText.boxFill}
							opacity={props.currentText.boxOpacity}
							currentText={props.currentText}
							handleOnColorChange={props.handleOnColorChange}
						>
							<PickerBoxDiv color={props.currentText.boxFill}>
								<div />
							</PickerBoxDiv>
						</ColorPicker>
					</Suspense>
					<span className="picker-name">box</span>
				</div>
			</div>
		</Container>
	)
}

const Container = styled.div`
	padding-top: 0.5rem;
	position: relative;
	display: flex;
	align-items: center;

	.colors {
		margin-left: 0.5rem;
		display: flex;

		.color-div {
			height: 2.25rem;
			width: 2rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;

			> .picker-name {
				font-size: 0.75rem;
				font-weight: 600;
				color: gray;
			}
		}
	}
`

const PickerBoxDiv = styled.div`
	height: 24px;
	width: 24px;
	cursor: pointer;
	background-color: transparent !important;
	border: 1px solid lightgray;
	display: flex;
	align-items: center;
	justify-content: center;

	> p {
		font-size: 1.5rem;
		font-weight: 600;
		color: ${props => props.color};
	}

	> div {
		height: 90%;
		width: 90%;
		background-color: ${props => props.color};
	}
`

const Select = styled.select`
	width: 100%;
	height: 2rem;
	font-size: 1rem;
	padding: 0 0.25rem;
	color: #707070;
	cursor: pointer;
	font-family: ${props => `${props.font}, sans-serif`};
`
const Option = styled.option`
	font-family: ${props => `${props.font}`};
`

export default React.memo(FontAndColor)
