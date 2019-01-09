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

	checkNode() {
		// here we need to manually attach or detach Transformer node
		this.transformer.getLayer().batchDraw()
		const stage = this.transformer.getStage()
		const { shapeName } = this.props

		if (!shapeName) {
			this.transformer.detach()
			this.transformer.getLayer().batchDraw()
			return //
		}

		const selectedNode = stage.findOne('.' + shapeName)
		console.log(this.props.shapeName, { selectedNode })

		if (selectedNode) {
			this.transformer.attachTo(selectedNode)
			this.transformer.getLayer().batchDraw()
		} else {
			this.transformer.detach()
			this.transformer.getLayer().batchDraw()
		}
	}

	render() {
		console.info(
			'rendering transformer... autobots assemble!',
			this.props.shapeName
		)
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
				boundBoxFunc={this.props.onTransform}
			/>
		)
	}
}

export default ShapeTransformer
