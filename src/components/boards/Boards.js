import React from 'react'
import styled from 'styled-components/macro'

import StoryBoard from './StoryBoard'
import AddBoard from './AddBoard'

import useCanvasSizeFromWindowHeight from '../../hooks/useCanvasSizeFromWindowHeight'

function MainSection(props) {
	const { state, dispatch } = props
	const { active, storiesByID, boardsByID } = state
	const { activeStoryID, activeBoardID, activeTextShapeID } = active
	const { canvasHeight, canvasWidth } = useCanvasSizeFromWindowHeight()

	const { boardsList } = storiesByID
	const totalBoards = boardsList.length

	return (
		<MainLayout>
			{boardsList.map(boardID => {
				const board = boardsByID[boardID]

				return (
					<StoryBoard
						key={boardID}
						boardID={boardID}
						board={board}
						//shapeName={shapeName}
						isActiveBoard={activeBoardID === boardID}
						totalBoards={totalBoards}
						canvasHeight={canvasHeight}
						canvasWidth={canvasWidth}
						storeDispatch={dispatch}
					/>
				)
			})}

			<AddBoard
				canvasHeight={canvasHeight}
				canvasWidth={canvasWidth}
				storeDispatch={dispatch}
				newIndex={stories.length}
			/>
		</MainLayout>
	)
}

const MainLayout = styled.main`
	flex: 1;
	padding: 1rem 1.5rem;
	overflow: auto;

	display: flex;
	align-items: center;
`

export default React.memo(MainSection)
