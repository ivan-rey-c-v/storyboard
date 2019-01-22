import React, { PureComponent } from 'react'
import { Transformer } from 'react-konva'

const withCenterAnchors = [
	'top-left',
	'top-center',
	'top-right',
	'middle-right',
	'middle-left',
	'bottom-left',
	'bottom-center',
	'bottom-right'
]
const noCenterAnchors = [
	'top-left',
	//'top-center',
	'top-right',
	//'middle-right',
	//'middle-left',
	'bottom-left',
	//'bottom-center',
	'bottom-right'
]

class ShapeTransformer extends PureComponent {
	componentDidMount() {
		this.checkNode()
	}
	componentDidUpdate() {
		this.checkNode()
	}

	componentWillUnmount() {
		this.transformer.destroy()
	}

	checkNode() {
		// here we need to manually attach or detach Transformer node
		this.transformer.getLayer().batchDraw()
		const stage = this.transformer.getStage()
		let { activeTextShapeID } = this.props

		if (!activeTextShapeID) {
			this.transformer.detach()
			this.transformer.getLayer().batchDraw()
			return //
		}

		if (activeTextShapeID.includes('text')) {
			activeTextShapeID = `${activeTextShapeID}-group`
		}

		const selectedNode = stage.findOne('.' + activeTextShapeID)

		if (selectedNode) {
			this.transformer.attachTo(selectedNode)
			this.transformer.getLayer().batchDraw()
		} else {
			this.transformer.detach()
			this.transformer.getLayer().batchDraw()
		}
	}

	render() {
		return (
			<Transformer
				ref={node => {
					this.transformer = node
				}}
				enabledAnchors={
					this.props.withCenterAnchors
						? withCenterAnchors
						: noCenterAnchors
				}
			/>
		)
	}
}

export default ShapeTransformer
