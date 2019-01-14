import React, { useCallback } from 'react'
import styled from 'styled-components/macro'
import Select from 'react-select'
import ColorSwatch from './text-properties/colors/ColorSwatch'

import TrashSVG from 'react-feather/dist/icons/trash-2'
import LockSVG from 'react-feather/dist/icons/lock'

import {
	SidebarSection,
	SectionName,
	Button,
	HiddenEl,
	RowPanel,
	RowPanelName,
	RowPanelInput,
	RowPanelBox
} from '../Sidebar.styles'

const acceptedImages = 'image/x-png,image/gif,image/jpeg,image/jpg'

const imageTypeOptions = [
	{ value: 'scale', label: 'Scale' },
	{ value: 'fit', label: 'Fit' },
	{ value: 'blur', label: 'Blur' }
]

const colorTypeOptions = [
	{ value: 'blur', label: 'Blur' },
	{ value: 'color', label: 'Color' }
]

function SetBackground(props) {
	const {
		backgroundImage,
		storeDispatch,
		storyIndex,
		colorPickerName
	} = props
	const imgFile = backgroundImage.file

	const handleSetBackground = useCallback(
		function(event) {
			event.stopPropagation()
			const imgFile = event.target.files[0]
			storeDispatch({
				type: 'SET_BACKGROUND_IMAGE',
				storyIndex,
				propertyName: 'file',
				propertyValue: imgFile
			})
		},
		[storyIndex]
	)

	const handleRemoveBackground = useCallback(
		function(event) {
			event.stopPropagation()
			storeDispatch({
				type: 'SET_BACKGROUND_IMAGE',
				storyIndex,
				propertyName: 'file',
				propertyValue: null
			})
		},
		[storyIndex]
	)

	const handleSelectImageType = useCallback(function(option, action) {
		storeDispatch({
			type: 'SET_BACKGROUND_IMAGE',
			storyIndex,
			propertyName: 'type',
			propertyValue: option.value
		})
	}, [])

	const handleSelectColorBlur = useCallback(function(option, action) {
		storeDispatch({
			type: 'SET_BACKGROUND_IMAGE',
			storyIndex,
			propertyName: 'colorType',
			propertyValue: option.value
		})
	}, [])

	const handleOnColorChange = useCallback(function(color, event) {
		storeDispatch({
			type: 'SET_BACKGROUND_IMAGE',
			storyIndex,
			propertyName: 'colorFill',
			propertyValue: color.hex
		})
	}, [])

	const stopPropagation = useCallback(function(event) {
		event.stopPropagation()
	})

	const [imageTypeValue] = imageTypeOptions.filter(
		type => type.value === backgroundImage.type
	)
	const [colorTypeValue] = colorTypeOptions.filter(
		type => type.value === backgroundImage.colorType
	)

	return (
		<SidebarSection>
			<SectionName>Primary image</SectionName>

			<Button as="label" htmlFor="img-file-input">
				Set background
				<HiddenEl
					as="input"
					type="file"
					id="img-file-input"
					onChange={handleSetBackground}
					accept={acceptedImages}
				/>
			</Button>

			<RowPanel>
				<StyledRowPanelName active={imgFile ? true : false}>
					{imgFile
						? imgFile.name.length >= 20
							? `${imgFile.name.substring(0, 18)}...`
							: imgFile.name
						: 'choose image'}
				</StyledRowPanelName>

				<RowPanelInput>
					<StyledSelect
						value={imageTypeValue}
						options={imageTypeOptions}
						onChange={handleSelectImageType}
						isDisabled={imgFile ? false : true}
					/>
				</RowPanelInput>
				<RowPanelBox as="label" htmlFor="img-file-input">
					<HiddenEl
						as="input"
						type="file"
						id="img-file-input"
						onChange={handleSetBackground}
						accept={acceptedImages}
					/>

					<ImageDiv>
						{imgFile && (
							<ImageDiv
								as="img"
								src={window.URL.createObjectURL(imgFile)}
								alt="background-image"
							/>
						)}
					</ImageDiv>
				</RowPanelBox>

				{imgFile && (
					<DeleteDiv onClick={handleRemoveBackground}>
						<TrashSVG />
					</DeleteDiv>
				)}
			</RowPanel>

			<RowPanel>
				<RowPanelName>Color</RowPanelName>
				<RowPanelInput>
					<StyledSelect
						value={colorTypeValue}
						options={colorTypeOptions}
						onChange={handleSelectColorBlur}
						//isDisabled={imgFile ? false : true}
					/>
				</RowPanelInput>
				<RowPanelBox onClick={stopPropagation}>
					{backgroundImage.colorType === 'blur' ? (
						<LockSVG />
					) : (
						<ColorSwatch
							name="image-color-picker"
							position="bottom"
							isColorPickerActive={
								colorPickerName === 'image-color-picker'
							}
							color={backgroundImage.colorFill}
							opacity={backgroundImage.colorOpacity}
							storeDispatch={storeDispatch}
							handleOnColorChange={handleOnColorChange}
						/>
					)}
				</RowPanelBox>
			</RowPanel>
		</SidebarSection>
	)
}

const StyledSelect = styled(Select)`
	width: 6rem;
`
const ImageDiv = styled.div`
	height: 100%;
	width: 100%;
	cursor: pointer;
`
const DeleteDiv = styled.div`
	height: 1.5rem;
	width: 1.5rem;
	position: absolute;
	top: 6px;
	left: 100%;
	cursor: pointer;

	display: flex;
	justify-content: center;
	align-items: center;

	svg {
		height: 60%;
		width: 80%;
	}

	:hover {
		opacity: 0.75;
	}
	:active {
		transform: scale(0.95);
	}
`
const StyledRowPanelName = styled(RowPanelName)`
	color: ${props => (props.active ? '#817cff' : 'darkgray')};
`

export default React.memo(SetBackground)
