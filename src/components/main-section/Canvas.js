import React, { useState, useEffect, useCallback } from 'react'
// Konva is needed for react-konva
import Konva from 'konva'
import { Stage, Layer, Image } from 'react-konva'

function Canvas(props) {
	const [image, setImage] = useState(null)

	useEffect(
		function() {
			if (props.backgroundImg) {
				const newImage = new window.Image()
				newImage.src = window.URL.createObjectURL(props.backgroundImg)
				newImage.onload = () => {
					// render konva Image when ready
					setImage(newImage)
				}
			} else {
				// dont render konva Image
				setImage(null)
			}
		},
		[props.backgroundImg]
	)

	const dragOnHorizontally = useCallback(function(pos) {
		return {
			x: pos.x,
			y: this.getAbsolutePosition().y
		}
	}, [])

	return (
		<Stage height={props.height} width={props.width}>
			<Layer>
				{image && (
					<Image
						image={image}
						draggable
						height={props.height}
						dragBoundFunc={dragOnHorizontally}
					/>
				)}
			</Layer>
		</Stage>
	)
}

export default React.memo(Canvas)
