import React, { Component } from 'react'
import { Transformer } from 'react-konva'

class ShapeTransformer extends Component {
	componentDidMount() {
		this.checkNode()
	}
	componentDidUpdate() {
		this.checkNode()
	}

	checkNode() {
		// here we need to manually attach or detach Transformer node
		const stage = this.transformer.getStage()
		const { selectedShapeName } = this.props

		if (!selectedShapeName) {
			this.transformer.detach()
			this.transformer.getLayer().batchDraw()
			return //
		}

		const selectedNode = stage.findOne('.' + selectedShapeName)
		this.transformer.attachTo(selectedNode)
		this.transformer.getLayer().batchDraw()
	}

	render() {
		return (
			<Transformer
				ref={node => {
					this.transformer = node
				}}
			/>
		)
	}
}

export default ShapeTransformer
