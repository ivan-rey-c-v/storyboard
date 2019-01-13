import React, { PureComponent } from 'react'
import { Rect } from 'react-konva'

class ColoredBox extends PureComponent {
	componentWillUnmount() {
		this.rectRef.destroy()
	}

	render() {
		return <Rect ref={node => (this.rectRef = node)} {...this.props} />
	}
}

export default ColoredBox
