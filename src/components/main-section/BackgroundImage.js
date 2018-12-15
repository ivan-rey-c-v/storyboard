import React, { Component } from 'react'
import { Image } from 'react-konva'

// use React Class since Konva can't use useCallback(react16.7)
class BackgroundImage extends Component {
	dragOnHorizontally = pos => {
		const { canvasWidth, width } = this.props
		// make sure it is always positive before convert to negative value
		const leftBoundary = -Math.abs(width - canvasWidth)
		return {
			x: pos.x < leftBoundary ? leftBoundary : pos.x >= 0 ? 0 : pos.x,
			y: 0
		}
	}

	render() {
		return (
			<Image
				// get image, name, height, width
				{...this.props}
				draggable
				dragBoundFunc={this.dragOnHorizontally}
				// performance boost: no transformation, only posX and posY
				transformsEnabled="position"
			/>
		)
	}
}

export default BackgroundImage
