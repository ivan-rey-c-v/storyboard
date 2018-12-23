import React, { useCallback } from 'react'
import styled from 'styled-components/macro'
import { ReactComponent as PlusSVG } from '../../icons/plus.svg'

function AddBoard(props) {
	const handleAddStoryBoard = useCallback(function(event) {
		event.stopPropagation()
		//dispatch({ type: 'ADD_STORY_BOARD' })
	}, [])

	return (
		<Layout>
			<div className="button-div" onClick={handleAddStoryBoard}>
				<PlusSVG />
			</div>
			<span className="description">
				<p>Add story board</p>
			</span>
		</Layout>
	)
}

const Layout = styled.div`
	margin-left: 7rem;
	display: flex;
	flex-direction: column;
	align-items: center;

	> .button-div {
		margin: 1rem;
		height: 5rem;
		width: 5rem;
		border: 1px solid darkgray;
		border-radius: 4px;
		cursor: pointer;
		fill: darkgray;

		display: flex;
		align-items: center;
		justify-content: center;

		> svg {
			height: 50%;
			width: 50%;
		}

		:hover {
			fill: #8d7993;
			box-shadow: -1px 1px 4px lightgray;
		}
		:active {
			transform: scale(0.97);
		}
	}

	> .description {
		color: gray;
	}
`

export default React.memo(AddBoard)
