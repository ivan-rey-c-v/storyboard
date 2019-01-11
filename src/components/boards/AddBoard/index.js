import React, { useCallback, useState } from 'react'
import styled from 'styled-components/macro'

import PlusSVG from 'react-feather/dist/icons/plus-square'
import DownloadSVG from 'react-feather/dist/icons/download'

import ActionDiv from './ActionDiv'

function AddBoard(props) {
	const { canvasHeight, canvasWidth, storeDispatch, newIndex } = props
	// isDragging is used for css
	const [isDragging, setIsDragging] = useState(false)

	const handleAddStoryBoard = useCallback(function(event) {
		event.stopPropagation()
		storeDispatch({ type: 'ADD_STORY_BOARD' })
	}, [])

	const handleOnImageDrop = useCallback(function(event) {
		event.stopPropagation()
		event.preventDefault()
		setIsDragging(false)

		const data = event.dataTransfer
		const file = data.files[0]

		if (file.type.includes('image')) {
			storeDispatch({ type: 'ADD_STORY_BOARD' })
			storeDispatch({
				type: 'SET_BACKGROUND_IMAGE',
				imgFile: file,
				storyIndex: newIndex
			})
		}
	}, [])

	const handleOnDragLeave = useCallback(function(event) {
		setIsDragging(false)
	}, [])
	const handleOnDragOver = useCallback(function(event) {
		setIsDragging(true)
	}, [])

	return (
		<Layout
			isdragging={isDragging}
			height={canvasHeight}
			width={canvasWidth}
			onDrop={handleOnImageDrop}
			onDragOver={handleOnDragOver}
			onDragLeave={handleOnDragLeave}
		>
			<ActionDiv message="Add board">
				<StyledPlusSVG onClick={handleAddStoryBoard} />
			</ActionDiv>

			<ActionDiv message="You can drop image files here">
				<StyledDownloadSVG />
			</ActionDiv>
		</Layout>
	)
}

const Layout = styled.div`
	/* should match with boardheader's height */
	margin-top: 42px;
	/* should match with boardfooter's height and margin-top */
	margin-bottom: calc(2rem + 1.5rem);

	margin-left: 3rem;
	padding: 2rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	outline: dashed lightgray;

	${props => {
		return {
			height: `${props.height}px`,
			width: `${props.width}px`,
			minWidth: `${props.width}px`
		}
	}};

	transition: transform 100ms ease-in-out;
	transform: ${props => (props.isdragging ? 'scale(1.015)' : 'none')};
`

const StyledPlusSVG = styled(PlusSVG)`
	height: 100%;
	width: 100%;
	color: #a57fa5;
	cursor: pointer;

	:hover {
		transform: scale(1.05);
	}
	:active {
		transform: scale(0.95);
	}
`
const StyledDownloadSVG = styled(DownloadSVG)`
	color: #cccccc;
	height: 100%;
	width: 100%;
`

export default React.memo(AddBoard)
