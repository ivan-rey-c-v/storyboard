import React, { lazy, Suspense, useCallback } from 'react'
import styled from 'styled-components/macro'

import BoardHeader from './BoardHeader'

const Canvas = lazy(_ => import('./Canvas'))

function StoryBoard(props) {
	const { canvasHeight, canvasWidth, storeDispatch } = props

	const preventPropagation = useCallback(function(event) {
		event.stopPropagation()
		event.preventDefault()
	}, [])

	return (
		<Container canvasWidth={canvasWidth}>
			<BoardHeader />

			<CanvasContainer
				canvasHeight={canvasHeight}
				onClick={preventPropagation}
			>
				<Suspense fallback={<EmptyDiv />}>
					<Canvas
						// canvasHeight/Width, story, shapeName, storeDispatch
						{...props}
					/>
				</Suspense>
			</CanvasContainer>
		</Container>
	)
}

const Container = styled.div`
	width: ${props => `${props.canvasWidth}px`};

	margin-left: 2rem;
	display: flex;
	flex-direction: column;
`
const CanvasContainer = styled.div`
	height: ${props => `${props.canvasHeight}px`};

	width: 100%;
	border: 1px solid lightgray;
`
const EmptyDiv = styled.div`
	height: 100%;
	width: 100%;
`

export default React.memo(StoryBoard)
