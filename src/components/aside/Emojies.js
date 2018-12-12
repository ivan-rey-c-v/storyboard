import React, { useCallback } from 'react'
import styled from 'styled-components'

import { buttonMixin } from '../../mixins/styledComponent'
const emojiList = [
	'☺️',
	'☺️',
	'☺️',
	'☺️',
	'☺️',
	'☺️',
	'☺️',
	'☺️',
	'☺️',
	'☺️',
	'☺️',
	'☺️'
]

function Emojies(props) {
	const handleToggleEmoji = useCallback(function(event) {
		event.stopPropagation()
		props.dispatch({ type: 'TOGGLE_EMOJI', toggle: true })
	}, [])

	const handleAddEmoji = useCallback(function(event) {
		event.stopPropagation()
		const emoji = event.target.textContent
		props.dispatch({ type: 'ADD_EMOJI', emoji })
	}, [])

	return (
		<EmojiContainer>
			<Emoji onClick={handleToggleEmoji} role="img" aria-label="img" aria-labelledby="img">
				☺️
			</Emoji>

			{props.isEmojiActive && (
				<div className="emoji-selector">
					{emojiList.map((emoji, index) => (
						<Emoji
							role="img"
							aria-label="img"
							aria-labelledby="img"
							key={`emoji-${index}`}
							data-emoji={emoji}
							onClick={handleAddEmoji}
						>
							{emoji}
						</Emoji>
					))}
				</div>
			)}
		</EmojiContainer>
	)
}

const EmojiContainer = styled.div`
	position: relative;
	margin-left: 1rem;

	.emoji-selector {
		position: absolute;
		right: -1rem;
		top: calc(100% + 0.5rem);
		width: calc(4 * 2.5rem);
		background-color: #f7f7f7;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
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

export default React.memo(Emojies)
