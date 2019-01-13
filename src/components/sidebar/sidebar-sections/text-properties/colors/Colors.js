import React, { useCallback } from 'react'
import {
	RowPanel,
	RowPanelName,
	RowPanelInput,
	RowPanelBox
} from '../../../Sidebar.styles'

import ColorSwatch from './ColorSwatch'

function Colors(props) {
	const { currentText, storeDispatch, colorPickerName } = props

	const handleOnColorChange = useCallback(
		(fillName, opacityName) => (color, event) => {
			const properties = {
				[fillName]: color.hex,
				[opacityName]: color.rgb.a
			}

			storeDispatch({ type: 'MODIFY_TEXT', properties })
		},
		[]
	)

	return (
		<div>
			<RowPanel>
				<RowPanelName>Text</RowPanelName>
				<RowPanelInput>{currentText.fill}</RowPanelInput>
				<RowPanelBox>
					<ColorSwatch
						name="text-color-picker"
						position="top"
						isColorPickerActive={
							colorPickerName === 'text-color-picker'
						}
						color={currentText.fill}
						opacity={currentText.opacity}
						storeDispatch={storeDispatch}
						handleOnColorChange={handleOnColorChange(
							'fill',
							'opacity'
						)}
					/>
				</RowPanelBox>
			</RowPanel>
			<RowPanel>
				<RowPanelName>Highlight</RowPanelName>
				<RowPanelInput>{currentText.boxFill}</RowPanelInput>
				<RowPanelBox>
					<ColorSwatch
						name="box-color-picker"
						position="top"
						isColorPickerActive={
							colorPickerName === 'box-color-picker'
						}
						color={currentText.boxFill}
						opacity={currentText.boxOpacity}
						storeDispatch={storeDispatch}
						handleOnColorChange={handleOnColorChange(
							'boxFill',
							'boxOpacity'
						)}
					/>
				</RowPanelBox>
			</RowPanel>
		</div>
	)
}

export default React.memo(Colors)
