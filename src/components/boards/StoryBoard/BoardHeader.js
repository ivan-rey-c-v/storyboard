import React from 'react'
import styled from 'styled-components/macro'

function BoardHeader(props) {
	const { storyID, isCurrentStory } = props

	return (
		<Header>
			<TitleDiv isCurrentStory={isCurrentStory}> {storyID} </TitleDiv>
			<EditingDiv isCurrentStory={isCurrentStory}>Editing</EditingDiv>
			{/* <div className="actions-div">
				{props.currentStoryIndex > 0 && (
					<span className="delete" onClick={handleDeleteBoard}>
						<TrashSVG />
					</span>
				)}
			</div> */}
		</Header>
	)
}

const headerHeight = 24

const Header = styled.header`
	padding: 0 0.5rem;
	height: ${headerHeight}px;
	font-size: 0.9rem;
	font-weight: 600;
	letter-spacing: 1px;

	display: flex;
	justify-content: space-between;
`
const TitleDiv = styled.div`
	color: ${props => (props.isCurrentStory ? 'black' : 'gray')};
`
const EditingDiv = styled.div`
	color: ${props => (props.isCurrentStory ? 'rebeccapurple' : 'gray')};
`

export default React.memo(BoardHeader)
