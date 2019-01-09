import React, { PureComponent } from 'react'
import { Group } from 'react-konva'
import produce from 'immer'
import generateUniqueID from '../../../../utils/generateUniqueID'

import TextBox from './TextBox'

class TextGroup extends PureComponent {
	state = {
		textBoxesWidth: [],
		name: generateUniqueID('text')
	}

	handleSetTextBoxWidth = (textBoxIndex, width) => {
		this.setState(
			produce(draft => {
				draft.textBoxesWidth[textBoxIndex] = width
			})
		)
	}

	render() {
		const { textGroup, coordX, onDragKonvaShape } = this.props

		const { text, ...textProperties } = textGroup

		const groupName = `${this.state.name}-group`

		const multiline = '\n'
		const multilineTexts = text.split(multiline)

		return (
			<Group
				ref={node => (this.groupNode = node)}
				x={coordX}
				y={50}
				draggable
				name={groupName}
				dragBoundFunc={onDragKonvaShape}
			>
				{multilineTexts.map((lineText, lineTextIndex) => (
					<TextBox
						key={`multiline-text-${lineTextIndex}`}
						textBoxesWidth={this.state.textBoxesWidth}
						lineText={lineText}
						lineTextIndex={lineTextIndex}
						textProperties={textProperties}
						name={this.state.name}
						handleSetTextBoxWidth={this.handleSetTextBoxWidth}
					/>
				))}
			</Group>
		)
	}
}

export default TextGroup
