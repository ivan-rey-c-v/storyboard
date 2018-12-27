import React, { useCallback, useState } from 'react'
import styled from 'styled-components/macro'

import { ReactComponent as PlusSVG } from '../../../icons/plus.svg'
import { ReactComponent as DownSVG } from '../../../icons/down.svg'

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
				<PlusContainer onClick={handleAddStoryBoard}>
					<PlusSVG />
				</PlusContainer>
			</ActionDiv>

			<ActionDiv message="You can drop image files here">
				<DownContainer>
					<DownSVG />
				</DownContainer>
			</ActionDiv>
		</Layout>
	)
}

const Layout = styled.div`
	/* should be same as the boardheader's height */
	margin-top: 24px;

	margin-left: 3rem;
	padding: 2rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	outline: dashed lightgray;

	${props => {
		return {
			height: `${props.height}px`,
			width: `${props.width}px`
		}
	}};

	transition: transform 100ms ease-in-out;
	transform: ${props => (props.isdragging ? 'scale(1.015)' : 'none')};
`

const PlusContainer = styled.div`
	height: 100%;
	width: 100%;
	border-radius: 4px;
	border: 1px solid lightgray;
	cursor: pointer;

	display: flex;
	justify-content: center;
	align-items: center;
	fill: #a57fa5;

	> svg {
		height: 60%;
		width: 60%;
	}

	:hover {
		background-color: #e8e8e8;
	}
	:active {
		transform: scale(0.95);
	}
`
const DownContainer = styled.div`
	height: 100%;
	width: 100%;
	border-bottom: 2px solid #cccccc;

	> svg {
		fill: #cccccc;
		height: 100%;
		width: 100%;
	}
`

export default React.memo(AddBoard)
