import React, { PureComponent } from 'react'
import { Rect, Text } from 'react-konva'

class TextBox extends PureComponent {
	state = {
		rectHeight: 0,
		rectWidth: 0
	}

	componentDidMount() {
		this.setRectSize()
	}

	componentDidUpdate() {
		this.setRectSize()
	}

	componentWillUnmount() {
		this.rectNode.destroy()
		this.textNode.destroy()
	}

	setRectSize = () => {
		const { handleSetTextBoxWidth, lineTextIndex } = this.props

		const rectHeight = this.textNode.height()
		const rectWidth = this.textNode.width()
		handleSetTextBoxWidth(lineTextIndex, rectWidth)

		this.setState({
			rectHeight,
			rectWidth
		})
	}

	getCoordX = align => {
		if (align === 'left') {
			const greatestWidth = this.props.textBoxesWidth.reduce(
				(width_1, width_2) => (width_1 > width_2 ? width_1 : width_2),
				0
			)

			return -(greatestWidth / 2)
		}

		if (align === 'center') {
			const { rectWidth } = this.state
			return -(rectWidth / 2)
		}

		if (align === 'right') {
			const { rectWidth } = this.state
			const greatestWidth = this.props.textBoxesWidth.reduce(
				(width_1, width_2) => (width_1 > width_2 ? width_1 : width_2),
				0
			)

			return greatestWidth / 2 - rectWidth
		}
	}

	render() {
		const { textProperties, lineText, lineTextIndex, name } = this.props

		const coordX = this.getCoordX(textProperties.align)

		return (
			<>
				<Rect
					ref={node => (this.rectNode = node)}
					// name is used for attaching Transformer
					name={name}
					//
					x={coordX}
					offsetY={-(this.state.rectHeight * lineTextIndex)}
					height={this.state.rectHeight}
					width={this.state.rectWidth}
					//
					fill={
						textProperties.hasBoxHighlight
							? textProperties.boxFill
							: 'transparent'
					}
					alpha={textProperties.boxOpacity * 100}
					cornerRadius={10}
				/>
				<Text
					ref={node => (this.textNode = node)}
					// name is used for attaching Transformer
					name={name}
					//
					x={coordX}
					offsetY={-(this.state.rectHeight * lineTextIndex)}
					//
					lineHeight={0.75}
					{...textProperties}
					text={lineText}
					alpha={textProperties.opacity * 100}
					fontStyle={textProperties.isItalic ? 'italic' : 'normal'}
					textDecoration={`${
						textProperties.isUnderline ? 'underline' : ''
					} ${textProperties.isStrikethrough ? 'line-through' : ''}`}
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
