import React, { lazy, Suspense, useState, useCallback } from 'react'
import { Emoji } from 'emoji-mart'
import styled from 'styled-components/macro'

import { Button } from '../../Sidebar.styles'

const EmojiPicker = lazy(_ => import('./EmojiPicker'))

function AddEmoji({ storeDispatch }) {
	const [isOverlayActive, setIsOverlayActive] = useState(false)

	const showOverlay = useCallback(function(event) {
		event.stopPropagation()
		setIsOverlayActive(true)
	}, [])

	const hideOverlay = useCallback(function(event) {
		event.stopPropagation()
		event.preventDefault()
		setIsOverlayActive(false)
	}, [])

	const handlePreventDefault = useCallback(function(event) {
		// prevent toggling overlay and preventing the App's event
		event.stopPropagation()
		event.preventDefault()
	}, [])

	const handlePickEmoji = useCallback(function(emoji, event) {
		// this callback gets `emoji` obj instead of `event`
		storeDispatch({ type: 'ADD_EMOJI', emoji: emoji.native })
		setIsOverlayActive(false)
	}, [])

	return (
		<div>
			<EmojiDiv onClick={showOverlay}>
				<Emoji size={26} emoji="heart_eyes" set="apple" />
			</EmojiDiv>

			{isOverlayActive && (
				<EmojiOverlay onClick={hideOverlay}>
					<PickerContainer onClick={handlePreventDefault}>
						<Suspense fallback={<EmptyWhiteDiv />}>
							<EmojiPicker onClick={handlePickEmoji} />
						</Suspense>
					</PickerContainer>
				</EmojiOverlay>
			)}
		</div>
	)
}

const EmojiDiv = styled(Button)`
	margin-left: 1rem;
	width: 3rem;

	/* Emoji is wrapped in a span */
	&,
	& > span {
		display: flex;
		align-items: center;
		justify-content: center;
	}
`
const EmojiOverlay = styled.div`
	cursor: pointer;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100vw;
	z-index: 500;

	display: flex;
	align-items: center;
	justify-content: center;

	background-color: rgba(177, 169, 180, 0.8);
`
const PickerContainer = styled.div`
	height: 425px;
	width: 355px;
`
const EmptyWhiteDiv = styled.div`
	background-color: white;
	height: 100%;
	width: 100%;
`

export default React.memo(AddEmoji)
