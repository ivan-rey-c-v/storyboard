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

		default: {
			return state
		}
	}
}
