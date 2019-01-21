import React from 'react'
import styled from 'styled-components/macro'

import StoryBoard from './StoryBoard/StoryBoard'
import AddBoard from './AddBoard'

import useCanvasSizeFromWindowHeight from '../../hooks/useCanvasSizeFromWindowHeight'

function MainSection(props) {
	const { state, dispatch } = props
	const { active, storiesByID, boardsByID } = state
	const { activeStoryID, activeBoardID, activeTextShapeID } = active
	const { canvasHeight, canvasWidth } = useCanvasSizeFromWindowHeight()

	const { boardsList } = storiesByID[activeStoryID]
	const totalBoards = boardsList.length

	return (
		<MainLayout>
			{boardsList.map((boardID, index) => {
				const board = boardsByID[boardID]

				return (
					<StoryBoard
						key={boardID}
						boardID={boardID}
						board={board}
						boardIndex={index}
						canMoveLeft={index === 0 ? false : true}
						canMoveRight={index + 1 === totalBoards ? false : true}
						activeTextShapeID={activeTextShapeID}
						isActiveBoard={activeBoardID === boardID}
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
