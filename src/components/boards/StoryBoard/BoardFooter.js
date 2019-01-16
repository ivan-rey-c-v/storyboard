import React, { useCallback } from 'react'
import styled, { css } from 'styled-components/macro'

import CopySVG from 'react-feather/dist/icons/copy'
import DownloadSVG from 'react-feather/dist/icons/download'
import UpSVG from 'react-feather/dist/icons/chevrons-up'
import DownSVG from 'react-feather/dist/icons/chevrons-down'
import TrashSVG from 'react-feather/dist/icons/trash-2'

function BoardFooter(props) {
	const { isCurrentStory, shapeName, storeDispatch, boardIndex } = props
	const zIndexDisabled = isCurrentStory && shapeName != null ? false : true

	const handleMoveShapeZIndex = useCallback(
		increment => event => {
			event.stopPropagation()
			storeDispatch({
				type: 'MOVE_SHAPE_Z_INDEX',
				increment: increment
			})
		},
		[]
	)

	const handleCopyBoard = useCallback(
		event => {
			event.stopPropagation()
			storeDispatch({
				type: 'COPY_STORY_BOARD',
				storyIndex: boardIndex
			})
		},
		[boardIndex]
	)

	const handleDeleteBoard = useCallback(
		event => {
			event.stopPropagation()
			storeDispatch({
				type: 'DELETE_STORY_BOARD',
				storyIndex: boardIndex
			})
		},
		[boardIndex]
	)

	const handleDownloadBoard = useCallback(
		event => {
			event.stopPropagation()
			storeDispatch({
				type: 'SET_ACTIVE_SHAPE_NAME',
				name: null,
				storyIndex: boardIndex
			})

			const delay = 200
			new Promise(resolve => {
				setTimeout(() => {
					resolve()
				}, delay)
			}).then(res => {
				storeDispatch({
					type: 'DOWNLOAD_STORY_BOARD',
					boardIndex: boardIndex
				})
			})
		},
		[boardIndex]
	)

	return (
		<Footer>
			<ActionButton onClick={handleCopyBoard} data-tooltip="Duplicate">
				<CopySVG />
			</ActionButton>
			<ActionButton onClick={handleDownloadBoard} data-tooltip="Download">
				<DownloadSVG />
			</ActionButton>
			<ActionButton
				disabled={zIndexDisabled}
				onClick={handleMoveShapeZIndex(-1)}
				data-tooltip="Send backwards"
			>
				<DownSVG />
			</ActionButton>
			<ActionButton
				disabled={zIndexDisabled}
				onClick={handleMoveShapeZIndex(+1)}
				data-tooltip="Pull forwards"
			>
				<UpSVG />
			</ActionButton>
			<ActionButton onClick={handleDeleteBoard} data-tooltip="Delete">
				<TrashSVG />
			</ActionButton>
		</Footer>
	)
}

const Footer = styled.footer`
	margin-top: 1.5rem;
	width: 100%;
	height: 3rem;
	border-radius: 2px;
	border: 1px solid lightgray;

	display: flex;
	align-items: center;
	justify-content: center;
`
const ActionButton = styled.button.attrs({
	tabIndex: 0
})`
	margin: 0 0.25rem;
	height: 100%;
	width: 2.5rem;
	border: none;
	background-color: transparent;

	display: flex;
	align-items: center;
	justify-content: center;

	${props =>
		props.disabled
			? css`
					color: lightgray;
			  `
			: css`
					cursor: pointer;
					:hover {
						background-color: var(--color-light-hover);
					}
					:active {
						transform: scale(0.95);
					}
			  `}
`

export default React.memo(BoardFooter)
