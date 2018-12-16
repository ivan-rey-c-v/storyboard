import React, { Fragment } from 'react'

import { ReactComponent as AlignLeftSVG } from '../../../icons/alignLeft.svg'
import { ReactComponent as AlignCenterSVG } from '../../../icons/alignCenter.svg'
import { ReactComponent as AlignRightSVG } from '../../../icons/alignRight.svg'

const alignsTuple = {
	left: AlignLeftSVG,
	center: AlignCenterSVG,
	right: AlignRightSVG
}

function TextAlignSVG(props) {
	const AlignSVG = alignsTuple[props.align]

	return (
		<Fragment>
			<AlignSVG />
		</Fragment>
	)
}

export default React.memo(TextAlignSVG)
