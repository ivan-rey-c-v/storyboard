export default function storeReducer(state, action) {
	switch (action.type) {
		case 'SET_STORY_BOARD': {
			return { ...state, currentStoryIndex: action.index }
		}

		case 'SET_BG_IMG': {
			const { currentStoryIndex, stories } = state
			const newStories = stories.map((story, index) => {
				if (currentStoryIndex === index) {
					return {
						...story,
						backgroundImg: action.file
					}
				}

				return story
			})

			return { ...state, stories: newStories }
		}

		case 'SET_SELECTED_SHAPE_NAME': {
			return {
				...state,
				actives: {
					...state.actives,
					selectedShapeName: action.name,
					textIndex: action.textIndex
				}
			}
		}

		case 'ADD_TEXT': {
			const { currentStoryIndex, stories } = state
			const text = {
				fontSize: 48,
				fontStyle: 'normal',
				text: 'Hello!',
				align: 'left',
				padding: 10,
				fill: '#232323',
				opacity: 1
			}

			const newStories = stories.map((story, index) => {
				if (currentStoryIndex === index) {
					return {
						...story,
						texts: [...story.texts, text]
					}
				}

				return story
			})

			return { ...state, stories: newStories }
		}

		case 'ADD_EMOJI': {
			const { currentStoryIndex, stories } = state
			const emoji = {
				emoji: action.emoji,
				fontSize: 46
			}

			const newStories = stories.map((story, index) => {
				if (currentStoryIndex === index) {
					return {
						...story,
						emojies: [...story.emojies, emoji]
					}
				}

				return story
			})

			return { ...state, stories: newStories }
		}

		case 'MODIFY_TEXT': {
			const { currentStoryIndex, stories } = state
			const { textIndex } = state.actives

			const newStories = stories.map((story, index) => {
				if (currentStoryIndex === index) {
					const newTexts = story.texts.map((text, idx) => {
						if (textIndex === idx) {
							return {
								...text,
								...action.properties
							}
						}

						return text
					})
					return {
						...story,
						texts: newTexts
					}
				}

				return story
			})

			return {
				...state,
				stories: newStories
			}
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
