import React, { PureComponent } from 'react'
import { Text, Rect } from 'react-konva'

class TextBox extends PureComponent {
	state = {
		rectHeight: 0,
		rectWidth: 0,
		x: this.props.coordX
	}

	componentDidMount() {
		this.setState({
			rectHeight: this.textNode.height(),
			rectWidth: this.textNode.width(),
			x: this.textNode.x()
		})
	}

	componentDidUpdate() {
		this.setState({
			rectHeight: this.textNode.height(),
			rectWidth: this.textNode.width(),
			x: this.textNode.x()
		})
	}

	render() {
		const {
			textProperties,
			lineText,
			lineTextIndex,
			name,
			textIndex,
			coordX
		} = this.props

		console.log(this.state)

		return (
			<>
				<Rect
					// name and textIndex is used for attaching Transformer
					name={name}
					textIndex={textIndex}
					//
					offsetX={50}
					offsetY={-50 * lineTextIndex}
					// x={this.state.x}
					//
					height={this.state.rectHeight}
					width={this.state.rectWidth}
					//
					fill={textProperties.boxFill}
					alpha={textProperties.boxOpacity * 100}
					cornerRadius={10}
				/>
				<Text
					ref={node => (this.textNode = node)}
					// name and textIndex is used for attaching Transformer
					name={name}
					textIndex={textIndex}
					//
					offsetX={50}
					offsetY={-50 * lineTextIndex}
					// x={this.state.x}
					//
					{...textProperties}
					text={lineText}
					alpha={textProperties.opacity * 100}
					fontStyle={textProperties.isItalic ? 'italic' : 'normal'}
					stroke={
						textProperties.isBold
							? textProperties.fill
							: 'transparent'
					}
					strokeWidth={1.25}
				/>
			</>
		)
	}
}

export default TextBox
