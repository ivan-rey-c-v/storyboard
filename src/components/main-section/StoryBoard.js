import React, { lazy, Suspense, useCallback } from 'react'
import styled from 'styled-components'

import { ReactComponent as TrashSVG } from '../../icons/trash.svg'

import useWindowSize from '../../hooks/useWindowSize'

// lazy load to be used with Suspense
const Canvas = lazy(_ => import('./Canvas'))

const headerHeight = 32

function StoryBoard(props) {
	const { height } = useWindowSize()
	// aspect ratio 16:9
	const canvasHeight = height * 0.704
	const canvasWidth = height * 0.396

	const handleSetStoryBoard = useCallback(
		function(event) {
			// not to trigger App's event when clicking inside canvas
			event.stopPropagation()
			props.storeDispatch({ type: 'SET_STORY_BOARD', index: props.index })
		},
		[props.index]
	)

	const handleDeleteBoard = useCallback(
		function(event) {
			// not to trigger App's event when clicking inside canvas
			event.stopPropagation()
			props.storeDispatch({
				type: 'DELETE_STORY_BOARD',
				index: props.index
			})
		},
		[props.index]
	)

	return (
		<Board canvasHeight={canvasHeight} canvasWidth={canvasWidth}>
			<Header isCurrentStory={props.isCurrentStory}>
				<div>{props.id}</div>
				<div className="actions-div">
					<span className="editing">Editing</span>
					{props.currentStoryIndex > 0 && (
						<span className="delete" onClick={handleDeleteBoard}>
							<TrashSVG />
						</span>
					)}
				</div>
			</Header>

			{/* suspend loading <Canvas /> , if not loaded, use <EmptyDiv/> instead  */}
			<CanvasContainer
				onClick={handleSetStoryBoard}
				isCurrentStory={props.isCurrentStory}
			>
				<Suspense fallback={<EmptyDiv />}>
					<Canvas
						canvasHeight={canvasHeight}
						canvasWidth={canvasWidth}
						// story props, id, backgroundImg etc...
						{...props}
					/>
				</Suspense>
			</CanvasContainer>
		</Board>
	)
}

const Board = styled.article`
	margin-left: 2rem;
	height: ${props =>
		props.canvasHeight ? `${props.canvasHeight + headerHeight}px` : '50px'};
	width: ${props => (props.canvasWidth ? `${props.canvasWidth}px` : '50px')};
	display: flex;
	flex-direction: column;
`
const Header = styled.header`
	padding: 0 0.5rem;
	height: ${headerHeight}px;
	font-size: 0.9rem;
	font-weight: 600;
	color: ${props => (props.isCurrentStory ? '545454' : 'gray')};
	letter-spacing: 1px;

	display: flex;
	justify-content: space-between;
	align-items: center;

	.actions-div {
		display: ${props => (props.isCurrentStory ? 'flex' : 'none')};

		.editing {
			color: rebeccapurple;
			display: ${props => (props.isCurrentStory ? 'inherit' : 'none')};
		}

		.delete {
			margin-left: 0.5rem;
			height: 0.9rem;
			width: 1rem;
			fill: #ff4949;
			cursor: pointer;

			svg {
				height: 100%;
				width: 100%;
			}

			:hover {
				fill: firebrick;
			}
			:active {
				transform: scale(0.95);
			}
		}
	}
`
const CanvasContainer = styled.div`
	cursor: pointer;
	flex: 1;
	border-style: solid;
	transition: all 100ms ease-in-out;
	${props =>
		props.isCurrentStory
			? {
					borderColor: 'rebeccapurple',
					borderWidth: '2px',
					boxShadow: '-4px 4px 8px rgba(115, 94, 122, 0.50)'
			  }
			: {
					borderColor: 'lightgray',
					borderWidth: '1px'
			  }}
`
const EmptyDiv = styled.div`
	height: 100%;
	width: 100%;
`

export default React.memo(StoryBoard)
