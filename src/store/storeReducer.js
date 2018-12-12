export default function storeReducer(state, action) {
	switch (action.type) {
		case 'SET_STORY_BOARD': {
			return { ...state, currentStoryIndex: action.index }
		}

		case 'SET_BG_IMG': {
			const { currentStoryIndex, stories } = state
			stories[currentStoryIndex].backgroundImg = action.file

			return { ...state, stories }
		}

		case 'SET_SELECTED_SHAPE_NAME': {
			return { ...state, selectedShapeName: action.name }
		}

		case 'ADD_TEXT': {
			const { currentStoryIndex, stories } = state
			const text = {
				type: 'text',
				value: 'Add Text',
				color: 'black',
				fontSize: 36
			}
			stories[currentStoryIndex].texts.push(text)

			return { ...state, stories }
		}

		case 'ADD_EMOJI': {
			const { currentStoryIndex, stories } = state
			const emoji = {
				emoji: action.emoji,
				fontSize: 46
			}

			stories[currentStoryIndex].emojies.push(emoji)

			return { ...state, stories }
		}

		case 'RESET_ACTIVES': {
			return {
				...state,
				selectedShapeName: ''
			}
		}

		default: {
			return state
		}
	}
}
