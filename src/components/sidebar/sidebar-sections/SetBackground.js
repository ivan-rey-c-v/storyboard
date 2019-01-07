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

function SetBackground(props) {
	const { imgFile, storeDispatch, storyIndex } = props

	const handleSetBackground = useCallback(
		function(event) {
			event.stopPropagation()
			const imgFile = event.target.files[0]
			storeDispatch({ type: 'SET_BACKGROUND_IMAGE', imgFile, storyIndex })
		},
		[storyIndex]
	)

	const handleRemoveBackground = useCallback(
		function(event) {
			event.stopPropagation()
			storeDispatch({
				type: 'SET_BACKGROUND_IMAGE',
				imgFile: null,
				storyIndex
			})
			console.log('removing background', storyIndex)
		},
		[storyIndex]
	)

	return (
		<SidebarSection>
			<SectionName>Pimary image</SectionName>

			{imgFile ? (
				<div>
					<RowPanel>
						<RowPanelName>Color</RowPanelName>
						<RowPanelInput>Blur</RowPanelInput>
						<RowPanelBox />
					</RowPanel>

					<RowPanel>
						<RowPanelName>{imgFile.name}</RowPanelName>
						<StyledRowPanelInput>
							<StyledSelect
								value={{
									value: '',
									label: 'Fit'
								}}
								options={[
									{
										value: '',
										label: 'Fit'
									}
								]}
							/>
						</StyledRowPanelInput>
						<RowPanelBox>
							<ImageDiv>
								<ImageDiv
									as="img"
									src={window.URL.createObjectURL(imgFile)}
									alt="background-image"
								/>
								<DeleteDiv onClick={handleRemoveBackground}>
									<TrashSVG />
								</DeleteDiv>
							</ImageDiv>
						</RowPanelBox>
					</RowPanel>
				</div>
			) : (
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
			)}
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
	position: relative;
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

export default React.memo(SetBackground)
