import React, { PureComponent } from 'react'
import { Text } from 'react-konva'

class Emoji extends PureComponent {
	render() {
		return <Text {...this.props} />
	}
}

export default Emoji
