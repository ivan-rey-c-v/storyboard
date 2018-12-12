import React, { lazy, Suspense, useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'

import { buttonMixin } from '../../mixins/styledComponent'

const EmojiPicker = lazy(_ => import('./EmojiPicker'))

function Emojies(props) {
	const [isEmojiPickerActive, setIsEmojiPickerActive] = useState(false)

	const handleToggleEmojiOn = useCallback(function(event) {
		event.stopPropagation()
		setIsEmojiPickerActive(true)
	}, [])

	const handleToggleEmojiOff = useCallback(function(event) {
		event.stopPropagation()
		setIsEmojiPickerActive(false)
	}, [])

	const handleAddEmoji = useCallback(function(event) {
		event.stopPropagation()
		const emoji = event.target.textContent
		props.dispatch({ type: 'ADD_EMOJI', emoji })
	}, [])

	useEffect(function() {
		// `Esc` key should toggle off emoji overlay
		const removeOverlay = function(event) {
			return event.key === 'Escape' ? setIsEmojiPickerActive(false) : null
		}
		window.addEventListener('keyup', removeOverlay)

		return () => window.removeEventListener('keyup', removeOverlay)
	}, [])

	return (
		<EmojiContainer>
			<Emoji
				onClick={handleToggleEmojiOn}
				role="img"
				aria-label="img"
				aria-labelledby="img"
			>
				☺️
			</Emoji>

			{isEmojiPickerActive && (
				<div className="overlay" onClick={handleToggleEmojiOff}>
					{/* emoji-mart is styled in globastyles */}
					<div className="picker-container">
						<Suspense fallback={<EmptyDiv />}>
							<EmojiPicker />
						</Suspense>
					</div>
				</div>
			)}
		</EmojiContainer>
	)
}

const EmojiContainer = styled.div`
	margin-left: 1rem;

	.overlay {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		z-index: 500;

		max-height: 100vh;
		max-width: 100vw;
		overflow: hidden;

		background-color: rgba(177, 169, 180, 0.8);
		display: flex;
		justify-content: center;
		align-items: center;

		.picker-container {
			height: 425px;
			width: 355px;
		}
	}
`

const Emoji = styled.span`
	${buttonMixin};
	padding: 0;
	padding-bottom: 0.25rem;
	width: 2.5rem;
	max-height: 2.25rem;

	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 2rem;

	:hover {
		opacity: 0.75;
	}
	:active {
		transform: scale(0.95);
	}
`

const EmptyDiv = styled.div`
	height: 100%;
	width: 100%;
	background-color: white;
`

export default React.memo(Emojies)
