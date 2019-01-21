import React, { PureComponent } from 'react'
import Konva from 'konva'
import { Image } from 'react-konva'

// use React Class since Konva can't use useCallback(react16.7)
class BackgroundImage extends PureComponent {
	state = {
		fittedImage: {
			height: null,
			width: null
		}
	}

	componentDidMount() {
		this.updateImageFromType()
	}

	componentDidUpdate() {
		this.updateImageFromType()
	}

	componentWillUnmount() {
		this.backgroundImageRef.destroy()
	}

	blurImage = () => {
		const blurRadius = 30

		this.backgroundImageRef.cache()
		this.backgroundImageRef.filters([Konva.Filters.Blur])
		this.backgroundImageRef.blurRadius(blurRadius)
		//this.backgroundImageRef.getLayer().batchDraw()
	}

	unblurImage = () => {
		//this.backgroundImageRef.clearCache()
		this.backgroundImageRef.filters()
		this.backgroundImageRef.blurRadius(0)
		//const layer = this.backgroundImageRef.getLayer()
	}

	updateImageFromType = () => {
		const { type } = this.props
		if (type === 'blur') {
			return this.blurImage()
		}
		if (type === 'scale') {
			return this.unblurImage()
		}
		if (type === 'fit') {
			return this.blurImage()
		}
	}

	dragOnHorizontally = pos => {
		const { canvasWidth, width: imageWidth, storeDispatch } = this.props
		// make sure it is always positive before convert to negative value
		const leftBoundary = -Math.abs(imageWidth - canvasWidth)
		const newX =
			pos.x < leftBoundary ? leftBoundary : pos.x >= 0 ? 0 : pos.x

		storeDispatch({
			type: 'SET_BACKGROUND_IMAGE',
			properties: {
				x: newX
			}
		})

		return {
			x: newX,
			y: 0
		}
	}

	render() {
		return (
			<Image
				ref={node => (this.backgroundImageRef = node)}
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
