import React, { lazy, Suspense } from 'react'
import styled from 'styled-components'

import useWindowSize from '../../hooks/useWindowSize'

// lazy load to be used with Suspense
const Canvas = lazy(_ => import('./Canvas'))

const headerHeight = 32

function StoryBoard(props) {
	const { height } = useWindowSize()
	// aspect ratio 16:9
	const canvasHeight = height * 0.704
	const canvasWidth = height * 0.396

	function onClick(event) {
		event.stopPropagation()
	}

	return (
		<Board canvasHeight={canvasHeight} canvasWidth={canvasWidth}>
			<Header>
				<span>Screen</span>
				<span>Editing</span>
			</Header>

			{/* suspend loading <Canvas /> , if not loaded, use <EmptyDiv/> instead  */}
			<CanvasContainer onClick={onClick}>
				<Suspense fallback={<EmptyDiv />}>
					<Canvas
						height={canvasHeight}
						width={canvasWidth}
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
	padding: 0 1rem;
	height: ${headerHeight}px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`
const CanvasContainer = styled.div`
	flex: 1;
	border: 1px solid lightgray;
`
const EmptyDiv = styled.div`
	height: 100%;
	width: 100%;
`

export default React.memo(StoryBoard)
