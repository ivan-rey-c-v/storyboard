import React from 'react'
import {
	RowPanel,
	RowPanelName,
	RowPanelInput,
	RowPanelBox
} from '../../../Sidebar.styles'

import ColorSwatch from './ColorSwatch'

function Colors(props) {
	const { currentText, storeDispatch, colorPickerName } = props

	return (
		<div>
			<RowPanel>
				<RowPanelName>Text</RowPanelName>
				<RowPanelInput>{currentText.fill}</RowPanelInput>
				<RowPanelBox>
					<ColorSwatch
						name="text-color-picker"
						isColorPickerActive={
							colorPickerName === 'text-color-picker'
						}
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
						name="box-color-picker"
						isColorPickerActive={
							colorPickerName === 'box-color-picker'
						}
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
