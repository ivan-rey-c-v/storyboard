import React from 'react'
import Emoji from './Emoji'
import TextGroup from './TextGroup'

function Shapes(props) {
	const {
		boardID,
		shape,
		shapeID,
		onDragKonvaShape,
		handleOnTransform
	} = props

	return (
		<>
			{shape.type === 'text' ? (
				<TextGroup
					key={shapeID}
					textGroup={shape}
					boardID={boardID}
					onDragKonvaShape={onDragKonvaShape(shapeID)}
					onTransform={handleOnTransform}
				/>
			) : shape.type === 'emoji' ? (
				<Emoji
					key={shapeID}
					{...shape}
					name={shapeID}
					text={shape.emoji}
					draggable
					x={shape.coord.x}
					y={shape.coord.y}
					scaleX={shape.coord.scaleX}
					scaleY={shape.coord.scaleY}
					rotation={shape.coord.rotation}
					dragBoundFunc={onDragKonvaShape(shapeID)}
					onTransform={handleOnTransform}
				/>
			) : null}
		</>
	)
}

export default React.memo(Shapes)
