import React from 'react'
import styled from 'styled-components'
import ColorPicker from 'rc-color-picker'

import '../../../rc-color-picker.css'

function AdditionalProperties(props) {
	const { fill, opacity } = props.currentText

	return (
		<Container>
			<Card />
			<Card />
			<Card />
			<Card>
				<ColorPicker
					className="color-picker"
					color={fill}
					alpha={opacity * 100}
					onChange={props.handleOnColorChange}
					placement="topLeft"
					defaultColor={fill}
				>
					<ColorPickerTrigger color={fill} />
				</ColorPicker>
			</Card>
		</Container>
	)
}

const Container = styled.div`
	padding-top: 0.5rem;
	display: flex;
	justify-content: space-around;
`
const Card = styled.div`
	flex: 0 0 auto;
	height: 2.5rem;
	width: 2.5rem;
	background-color: lightgray;
`
const ColorPickerTrigger = styled.div`
	height: 2rem;
	width: 2rem;
	margin: 0.25rem;
	border-radius: 4px;
	cursor: pointer;
`

export default React.memo(AdditionalProperties)
