import React, { lazy, Suspense, useState, useCallback, useEffect } from 'react'
import { Emoji } from 'emoji-mart'
import styled from 'styled-components'

import { buttonMixin } from '../../../../mixins/styledComponent'

const EmojiPicker = lazy(_ => import('./EmojiPicker'))

function Emojies(props) {
	const [isEmojiPickerActive, setIsEmojiPickerActive] = useState(false)
	//const store = useContext(AppContext)
	console.log('rendering emojies...')

	const handleEmojiClick = useCallback(function(emoji) {
		// this callback gets `emoji` obj instead of `event`
		props.dispatch({ type: 'ADD_EMOJI', emoji: emoji.native })
		setIsEmojiPickerActive(false)
	}, [])

	const handleToggleEmojiOn = useCallback(function(event) {
		event.stopPropagation()
		setIsEmojiPickerActive(true)
	}, [])

	const handleToggleEmojiOff = useCallback(function(event) {
		event.stopPropagation()
		setIsEmojiPickerActive(false)
	}, [])

	const handleOnPickerClick = useCallback(function(event) {
		// prevents triggering App's event
		event.stopPropagation()
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
			<div className="emoji-button" onClick={handleToggleEmojiOn}>
				<Emoji emoji="heart_eyes" size={24} />
			</div>

			{isEmojiPickerActive && (
				<div className="overlay" onClick={handleToggleEmojiOff}>
					<div
						className="picker-container"
						onClick={handleOnPickerClick}
					>
						<Suspense fallback={<EmptyDiv />}>
							<EmojiPicker handleEmojiClick={handleEmojiClick} />
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

	.emoji-button {
		${buttonMixin};
		width: 2.5rem;

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
	}
`

const EmptyDiv = styled.div`
	height: 100%;
	width: 100%;
	background-color: white;
`

export default React.memo(Emojies)
