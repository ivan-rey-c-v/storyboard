import produce from 'immer'

export default produce((draftState, action) => {
	switch (action.type) {
		case 'SET_STORY_BOARD': {
			draftState.currentStoryIndex = action.index
			return
		}

		case 'SET_BG_IMG': {
			const { currentStoryIndex } = draftState
			draftState.stories[currentStoryIndex].backgroundImg = action.file
			return
		}

		case 'SET_SELECTED_SHAPE_NAME': {
			draftState.actives.selectedShapeName = action.name
			draftState.actives.textIndex = action.textIndex
			return
		}

		case 'ADD_TEXT': {
			const { currentStoryIndex } = draftState
			const { name: storyName } = draftState.stories[currentStoryIndex]
			const { length } = draftState.stories[currentStoryIndex].texts
			const newTextName = `${storyName}-text-${length}`

			const text = {
				fontSize: 48,
				fontStyle: 'normal',
				text: 'Hello!',
				align: 'left',
				padding: 10,
				fill: '#232323',
				opacity: 1
			}

			draftState.stories[currentStoryIndex].texts.push(text)
			draftState.actives = {
				textIndex: length,
				selectedShapeName: newTextName
			}
			return
		}

		case 'ADD_EMOJI': {
			const { currentStoryIndex } = draftState
			const emoji = {
				emoji: action.emoji,
				fontSize: 46
			}

			draftState.stories[currentStoryIndex].emojies.push(emoji)
			return
		}

		case 'MODIFY_TEXT': {
			const { currentStoryIndex } = draftState
			const { textIndex } = draftState.actives

			const lastText =
				draftState.stories[currentStoryIndex].texts[textIndex]

			draftState.stories[currentStoryIndex].texts[textIndex] = {
				...lastText,
				...action.properties
			}
			return
		}

		case 'RESET_ACTIVES': {
			draftState.actives.selectedShapeName = ''
			return
		}

		default: {
			return draftState
		}
	}
})
