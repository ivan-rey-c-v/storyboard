import React, { lazy, Suspense } from 'react'
import styled from 'styled-components'

// lazy load to be used with Suspense
const Canvas = lazy(_ => import('./Canvas'))

const headerHeight = 32
const boardHeight = 450
const canvasHeight = boardHeight - headerHeight
const canvasWidth = 300

function StoryBoard(props) {
	return (
		<Board>
			<Header>
				<span>Screen</span>
				<span>Editing</span>
			</Header>

			{/* suspend loading <Canvas /> , if not loaded, use <EmptyDiv/> instead  */}
			<CanvasContainer>
				<Suspense fallback={<EmptyDiv />}>
					<Canvas
						height={canvasHeight}
						width={canvasWidth}
						backgroundImg={props.backgroundImg}
						texts={props.texts}
					/>
				</Suspense>
			</CanvasContainer>
		</Board>
	)
}

const Board = styled.article`
	height: ${boardHeight}px;
	width: ${canvasWidth}px;
	display: flex;
	flex-direction: column;
`
const Header = styled.header`
	padding: 0 1rem;
	height: ${headerHeight}px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`
const CanvasContainer = styled.div`
	height: ${canvasHeight}px;
	border: 1px solid lightgray;
`
const EmptyDiv = styled.div`
	height: 100%;
	width: 100%;
`

export default React.memo(StoryBoard)
