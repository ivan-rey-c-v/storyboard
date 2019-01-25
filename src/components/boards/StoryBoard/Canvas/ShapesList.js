import React from 'react'
import Shape from './Shape'

function Shapes(props) {
	const {
		boardID,
		shapesList,
		shapesByID,
		onDragKonvaShape,
		handleOnTransform
	} = props

	return shapesList.map((shapeID, index) => {
		const shape = shapesByID[shapeID]

		return (
			<Shape
				shape={shape}
				shapeID={shapeID}
				boardID={boardID}
				onDragKonvaShape={onDragKonvaShape}
				handleOnTransform={handleOnTransform}
			/>
		)
	})
}

export default React.memo(Shapes)
