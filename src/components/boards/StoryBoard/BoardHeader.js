import React from 'react'
import styled from 'styled-components/macro'

import { ReactComponent as CrossSVG } from '../../../icons/cross.svg'

function BoardHeader(props) {
	const { storyID, isCurrentStory, handleDeleteBoard, canBeDeleted } = props

	return (
		<Header>
			<TitleDiv isCurrentStory={isCurrentStory}> {storyID} </TitleDiv>
			{isCurrentStory && (
				<RightDiv>
					<span>Editing</span>

					{canBeDeleted && (
						<CrossSpan onClick={handleDeleteBoard}>
							<CrossSVG />
						</CrossSpan>
					)}
				</RightDiv>
			)}
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
const RightDiv = styled.div`
	color: #936793;
	display: flex;
	align-items: center;
`
const CrossSpan = styled.span`
	margin-left: 0.5rem;
	height: 1.3rem;
	width: 1.3rem;
	cursor: pointer;

	> svg {
		fill: firebrick;
		height: 100%;
		width: 100%;
	}

	:hover {
		transform: scale(1.1);
	}
	:active {
		transform: scale(0.99);
	}
`

export default React.memo(BoardHeader)
