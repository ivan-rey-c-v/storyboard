import React from 'react'
import styled, { css } from 'styled-components/macro'

import ArrowLeftSVG from 'react-feather/dist/icons/arrow-left-circle'
import ArrowRightSVG from 'react-feather/dist/icons/arrow-right-circle'

function BoardHeader(props) {
	const {
		boardIndex,
		isCurrentStory,
		canMoveLeft,
		canMoveRight,
		handleMoveBoard
	} = props

	return (
		<Header>
			<SVGButton
				disabled={canMoveLeft ? false : true}
				onClick={handleMoveBoard(-1, boardIndex)}
			>
				<ArrowLeftSVG />
			</SVGButton>

			<HeaderName isCurrentStory={isCurrentStory}>
				{isCurrentStory ? 'Editing' : null} {`Screen ${boardIndex + 1}`}
			</HeaderName>

			<SVGButton
				disabled={canMoveRight ? false : true}
				onClick={handleMoveBoard(+1, boardIndex)}
			>
				<ArrowRightSVG />
			</SVGButton>
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
const SVGButton = styled.button`
	height: 75%;
	border: none;
	background-color: transparent;

	svg {
		height: 100%;
	}

	${props =>
		props.disabled
			? css`
					cursor: not-allowed;
			  `
			: css`
					cursor: pointer;
					:hover {
						color: var(--color-secondary);
					}
					:active {
						transform: scale(0.95);
					}
			  `};
`

export default React.memo(BoardHeader)
