import React, { PureComponent } from 'react'
import { Image } from 'react-konva'

class FittedImage extends PureComponent {
	componentWillUnmount() {
		this.fittedImageRef.destroy()
	}

	render() {
		const {
			name,
			image,
			canvasWidth,
			canvasHeight,
			originalHeight,
			originalWidth
		} = this.props

		const aspectRatio = originalHeight / originalWidth
		const fittedImageHeight = canvasWidth * aspectRatio
		const fittedImageYCoord = (canvasHeight - fittedImageHeight) / 2
		const heightRatio = originalHeight / fittedImageHeight
		const diff = fittedImageHeight - canvasHeight / 2

		const crop =
			fittedImageHeight > canvasHeight / 2
				? {
						x: 0,
						y: fittedImageYCoord + diff / 2,
						width: originalWidth,
						height: originalHeight - diff * heightRatio
				  }
				: {
						x: 0,
						y: 0,
						height: 0,
						width: 0
				  }

		return (
			<Image
				ref={node => (this.fittedImageRef = node)}
				name={name}
				image={image}
				crop={crop}
				width={canvasWidth}
				height={fittedImageHeight - diff}
				y={fittedImageYCoord + diff / 2}
			/>
		)
	}
}

export default FittedImage
