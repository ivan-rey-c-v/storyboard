import React, { useCallback } from 'react'
import styled from 'styled-components/macro'
import Select from 'react-select'

import TrashSVG from 'react-feather/dist/icons/trash-2'

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

const acceptedImages = 'image/x-png,image/gif,image/jpeg'

const imageTypeOptions = [
	{ value: 'scale', label: 'Scale' },
	{ value: 'fit', label: 'Fit' },
	{ value: 'blur', label: 'Blur' }
]

function SetBackground(props) {
	const { backgroundImage, storeDispatch, storyIndex } = props
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

	const [imageTypeValue] = imageTypeOptions.filter(
		type => type.value === backgroundImage.type
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

				<StyledRowPanelInput>
					<StyledSelect
						value={imageTypeValue}
						options={imageTypeOptions}
						onChange={handleSelectImageType}
						isDisabled={imgFile ? false : true}
					/>
				</StyledRowPanelInput>
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
				<RowPanelInput>Blur</RowPanelInput>
				<RowPanelBox />
			</RowPanel>
		</SidebarSection>
	)
}

const StyledRowPanelInput = styled(RowPanelInput)`
	border: none;
`
const StyledSelect = styled(Select)`
	width: 100%;
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
