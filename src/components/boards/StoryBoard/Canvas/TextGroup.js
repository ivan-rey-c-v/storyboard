import React, { PureComponent } from 'react'
import { Group } from 'react-konva'

import TextBox from './TextBox'

class TextGroup extends PureComponent {
	state = {
		coordX: this.props.coordX
	}

	onTransform = (oldBox, newBox) => {
		//
		console.log({ newBox })

		return newBox
	}

	render() {
		const {
			textGroup,
			index,
			coordX,
			canvasName,
			onDragKonvaShape
		} = this.props

		const { text, ...textProperties } = textGroup

		const name = `${canvasName}-text-${index}`
		const groupName = `${name}-group`

		const multiline = '\n'
		const multilineTexts = text.split(multiline)

		return (
			<Group
				x={coordX}
				draggable
				name={groupName}
				dragBoundFunc={onDragKonvaShape}
				offsetX={50}
			>
				{multilineTexts.map((lineText, lineTextIndex) => (
					<TextBox
						key={`multiline-text-${lineTextIndex}`}
						lineText={lineText}
						lineTextIndex={lineTextIndex}
						textProperties={textProperties}
						name={name}
						textIndex={index}
						coordX={this.state.coordX}
					/>
				))}
			</Group>
		)
	}
}

export default TextGroup
