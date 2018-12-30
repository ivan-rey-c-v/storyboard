import React, { useCallback } from 'react'
import styled from 'styled-components/macro'

import {
	SidebarSection,
	SectionName,
	Button,
	HiddenEl
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
			<SectionName>Set background</SectionName>

			{imgFile ? (
				<ImgContainer>
					<Img src={window.URL.createObjectURL(imgFile)} />
					<ImgDesc>
						<p>{imgFile.name}</p>
						<Delete onClick={handleRemoveBackground}>Delete</Delete>
					</ImgDesc>
				</ImgContainer>
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

const ImgContainer = styled.div`
	display: flex;
`
const Img = styled.img`
	margin: 0;
	height: 3rem;
	width: 3rem;
`
const ImgDesc = styled.div`
	padding: 0.25rem 1rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	font-size: 0.8rem;
	font-weight: 600;
	color: #666070;
`
const Delete = styled.span`
	color: crimson;
	font-size: 90%;
	letter-spacing: 1px;
	cursor: pointer;
`

export default React.memo(SetBackground)
