import React, { useCallback } from 'react'
import styled from 'styled-components/macro'
import Select from 'react-select'
import {
	RowPanel,
	RowPanelName,
	RowPanelInput,
	RowPanelBox
} from '../../../Sidebar.styles'

import ColorSwatch from './ColorSwatch'
import LockSVG from 'react-feather/dist/icons/lock'

const highlightOptions = [
	{ value: false, label: 'None' },
	{ value: true, label: 'Highlight' }
]

function Colors(props) {
	const { currentText, storeDispatch, activeColorPickerID } = props

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

	const handleSelectBoxHighlight = useCallback(function(option, action) {
		const properties = {
			hasBoxHighlight: option.value
		}
		storeDispatch({ type: 'MODIFY_TEXT', properties })
	}, [])

	return (
		<div>
			<RowPanel>
				<RowPanelName>Text</RowPanelName>
				<RowPanelBox>
					<ColorSwatch
						name="text-color-picker"
						position="top"
						isColorPickerActive={
							activeColorPickerID === 'text-color-picker'
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
				<RowPanelInput>
					<StyledSelect
						value={
							currentText.hasBoxHighlight
								? { label: 'Highlight' }
								: { label: 'None' }
						}
						options={highlightOptions}
						onChange={handleSelectBoxHighlight}
					/>
				</RowPanelInput>
				<RowPanelBox>
					{currentText.hasBoxHighlight ? (
						<ColorSwatch
							name="box-color-picker"
							position="top"
							isColorPickerActive={
								activeColorPickerID === 'box-color-picker'
							}
							color={currentText.boxFill}
							opacity={currentText.boxOpacity}
							storeDispatch={storeDispatch}
							handleOnColorChange={handleOnColorChange(
								'boxFill',
								'boxOpacity'
							)}
						/>
					) : (
						<LockSVG />
					)}
				</RowPanelBox>
			</RowPanel>
		</div>
	)
}

const StyledSelect = styled(Select)`
	width: 7rem;
`

export default React.memo(Colors)
