export default function storeReducer(state, action) {
	switch (action.type) {
		case 'SET_BG_IMG': {
			const { currentStory, stories } = state
			const newStories = stories.map((story, index) => {
				// story.id is equal to index
				if (currentStory === story.id) {
					story.backgroundImg = action.file
				}
				return story
			})

			return { ...state, stories: newStories }
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

		case 'TOGGLE_EMOJI': {
			return { ...state, isEmojiActive: action.toggle }
		}

		case 'ADD_EMOJI': {
			const { currentStoryIndex, stories } = state
			const emoji = {
				type: 'text',
				value: action.emoji,
				color: 'black',
				fontSize: 54
			}
			stories[currentStoryIndex].texts.push(emoji)

			return { ...state, stories }
		}

		default: {
			return state
		}
	}
}
