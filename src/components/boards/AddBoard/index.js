import React, { useCallback } from 'react'
import styled from 'styled-components/macro'

import { ReactComponent as PlusSVG } from '../../../icons/plus.svg'
import { ReactComponent as DownSVG } from '../../../icons/down.svg'

import ActionDiv from './ActionDiv'

function AddBoard(props) {
	const { canvasHeight, canvasWidth, storeDispatch } = props

	const handleAddStoryBoard = useCallback(function(event) {
		event.stopPropagation()
		storeDispatch({ type: 'ADD_STORY_BOARD' })
	}, [])

	return (
		<Layout height={canvasHeight} width={canvasWidth}>
			<ActionDiv message="Add board">
				<PlusContainer onClick={handleAddStoryBoard}>
					<PlusSVG />
				</PlusContainer>
			</ActionDiv>

			<ActionDiv message="You can drop image files here">
				<DownContainer>
					<DownSVG />
				</DownContainer>
			</ActionDiv>
		</Layout>
	)
}

const Layout = styled.div`
	/* should be same as the boardheader's height */
	margin-top: 24px;

	margin-left: 3rem;
	padding: 2rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	outline: dashed lightgray;

	${props => {
		return {
			height: `${props.height}px`,
			width: `${props.width}px`
		}
	}}
`

const PlusContainer = styled.div`
	height: 100%;
	width: 100%;
	border-radius: 4px;
	border: 1px solid lightgray;
	cursor: pointer;

	display: flex;
	justify-content: center;
	align-items: center;
	fill: #a57fa5;

	> svg {
		height: 60%;
		width: 60%;
	}

	:hover {
		background-color: #e8e8e8;
	}
	:active {
		transform: scale(0.95);
	}
`
const DownContainer = styled.div`
	height: 100%;
	width: 100%;
	border-bottom: 2px solid #cccccc;

	> svg {
		fill: #cccccc;
		height: 100%;
		width: 100%;
	}
`

export default React.memo(AddBoard)
