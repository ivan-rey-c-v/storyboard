import React from 'react'
import {
	RowPanel,
	RowPanelName,
	RowPanelInput,
	RowPanelBox
} from '../../../Sidebar.styles'

import ColorSwatch from './ColorSwatch'

function Colors(props) {
	const { currentText, storeDispatch } = props

	return (
		<div>
			<RowPanel>
				<RowPanelName>Text</RowPanelName>
				<RowPanelInput>{currentText.fill}</RowPanelInput>
				<RowPanelBox>
					<ColorSwatch
						fillName="fill"
						opacityName="opacity"
						color={currentText.fill}
						opacity={currentText.opacity}
						storeDispatch={storeDispatch}
					/>
				</RowPanelBox>
			</RowPanel>
			<RowPanel>
				<RowPanelName>Highlight</RowPanelName>
				<RowPanelInput>{currentText.boxFill}</RowPanelInput>
				<RowPanelBox>
					<ColorSwatch
						fillName="boxFill"
						opacityName="boxOpacity"
						color={currentText.boxFill}
						opacity={currentText.boxOpacity}
						storeDispatch={storeDispatch}
					/>
				</RowPanelBox>
			</RowPanel>
		</div>
	)
}

export default React.memo(Colors)
