import React from 'react'
import styled from 'styled-components/macro'

import ArrowLeftSVG from 'react-feather/dist/icons/arrow-left-circle'
import ArrowRightSVG from 'react-feather/dist/icons/arrow-right-circle'

function BoardHeader(props) {
	const { storyID, isCurrentStory, handleDeleteBoard, canBeDeleted } = props

	return (
		<Header>
			<SVGDiv>
				<ArrowLeftSVG />
			</SVGDiv>

			<HeaderName isCurrentStory={isCurrentStory}>
				{isCurrentStory ? 'Editing' : null} {storyID}
			</HeaderName>

			<SVGDiv>
				<ArrowRightSVG />
			</SVGDiv>
		</Header>
	)
}

const headerHeight = 42

const Header = styled.header`
	padding: 0 1rem;
	height: ${headerHeight}px;

	display: flex;
	align-items: center;
	justify-content: space-between;
`
const HeaderName = styled.p`
	align-self: center;
	font-size: 0.8rem;
	font-weight: 600;
	letter-spacing: 1px;
	color: ${props =>
		props.isCurrentStory ? 'var(--color-primary)' : '#5e5960'};
`
const SVGDiv = styled.div`
	height: 75%;
	cursor: pointer;

	svg {
		height: 100%;
	}
`

export default React.memo(BoardHeader)
