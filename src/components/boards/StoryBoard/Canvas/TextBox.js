import React, { PureComponent } from 'react'
import { Text, Rect } from 'react-konva'

class TextBox extends PureComponent {
	state = {
		rectHeight: 0,
		rectWidth: 0,
	}

	componentDidMount() {
		this.setState({
			rectHeight: this.textNode.height(),
			rectWidth: this.textNode.width(),
		})
	}

	componentDidUpdate() {
		this.setState({
			rectHeight: this.textNode.height(),
			rectWidth: this.textNode.width(),
		})
	}

	getOffsetX = (align) => {
		const aligns = {
			left: 1,
			center: 2,
			right: 0
		}
		const divisor = aligns[align]
		return -(Math.abs(this.state.rectWidth / divisor))
	}

	render() {
		const {
			textProperties,
			lineText,
			lineTextIndex,
			name,
			textIndex,
		} = this.props

		const offsetX = this.getOffsetX(textProperties.align)
		console.log({offsetX})

		return (
			<>
				<Rect
					// name and textIndex is used for attaching Transformer
					name={name}
					textIndex={textIndex}
					//
					x={offsetX}
					//offsetX={50}
					offsetY={-50 * lineTextIndex}
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
					x={offsetX}
					//offsetX={50}
					offsetY={-50 * lineTextIndex}
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
