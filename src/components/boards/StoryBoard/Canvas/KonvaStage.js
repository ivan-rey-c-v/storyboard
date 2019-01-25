import React, { useEffect, useRef } from 'react'
import { Layer, Stage } from 'react-konva'

function KonvaStage(props) {
	const stageRef = useRef(null)

	useEffect(function() {
		const canvas = stageRef.current.content.children[0]
		canvas.setAttribute('id', props.boardID)
		canvas.setAttribute('class', 'konva-canvas')
	}, [])

	return (
		<Stage ref={stageRef} {...props}>
			<Layer>{props.children}</Layer>
		</Stage>
	)
}

export default React.memo(KonvaStage)
