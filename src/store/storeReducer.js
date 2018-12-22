import produce from 'immer'

export default produce((draftState, action) => {
	switch (action.type) {
		case 'RESET_ACTIVE': {
			draftState.active.textIndex = null
			draftState.active.shapeName = null
			return
		}

		case 'SELECT_STORY_BOARD': {
			const { storyIndex } = action
			draftState.active.storyIndex = storyIndex
			return
		}

		// case 'DELETE_STORY_BOARD': {
		// 	const { stories } = draftState
		// 	draftState.stories = stories.filter(
		// 		(story, index) => index !== action.index
		// 	)
		// 	draftState.currentStoryIndex = 0
		// 	draftState.actives.textIndex = null

		// 	return
		// }

		case 'SET_BACKGROUND_IMAGE': {
			const { imgFile } = action
			const { storyIndex } = draftState.active
			draftState.stories[storyIndex].backgroundImg = imgFile
			return
		}

		case 'ADD_EMOJI': {
			const { storyIndex } = draftState.active
			const emoji = {
				emoji: action.emoji,
				fontSize: 46
			}
			draftState.stories[storyIndex].emojies.push(emoji)
			return
		}

		// below has not been refactored

		//

		case 'SET_SELECTED_SHAPE_NAME': {
			draftState.active.shapeName = action.name
			draftState.active.textIndex = action.textIndex
			return
		}

		case 'ADD_TEXT': {
			const { currentStoryIndex } = draftState
			const { canvasName } = draftState.stories[currentStoryIndex]
			const { length } = draftState.stories[currentStoryIndex].texts
			const newTextName = `${canvasName}-text-${length}-label`

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

		case 'TOGGLE_FONT_STYLE': {
			const { currentStoryIndex } = draftState
			const { textIndex } = draftState.actives

			const lastText =
				draftState.stories[currentStoryIndex].texts[textIndex]

			draftState.stories[currentStoryIndex].texts[textIndex] = {
				...lastText,
				[action.styleName]: !lastText[action.styleName]
			}
			return
		}

		case 'CHANGE_TEXT_ALIGN': {
			const { currentStoryIndex } = draftState
			const { textIndex } = draftState.actives

			const lastText =
				draftState.stories[currentStoryIndex].texts[textIndex]

			const { align } = lastText
			const aligns = ['left', 'center', 'right']
			const lastAlignIndex = aligns.indexOf(align)
			const newAlignIndex = (lastAlignIndex + 1) % aligns.length

			draftState.stories[currentStoryIndex].texts[textIndex] = {
				...lastText,
				align: aligns[newAlignIndex]
			}
			return
		}

		case 'CHANGE_FONT_SIZE': {
			const { currentStoryIndex } = draftState
			const { textIndex } = draftState.actives

			const lastText =
				draftState.stories[currentStoryIndex].texts[textIndex]

			const { fontSize } = lastText
			const fontSizes = [24, 34, 44, 54]
			const lastFontSizeIndex = fontSizes.indexOf(fontSize)
			const newFontSizeIndex = (lastFontSizeIndex + 1) % fontSizes.length

			draftState.stories[currentStoryIndex].texts[textIndex] = {
				...lastText,
				fontSize: fontSizes[newFontSizeIndex]
			}
			return
		}

		case 'ADD_STORY_BOARD': {
			const length = draftState.stories.length

			const newBoard = {
				id: `Screen ${length + 1}`,
				canvasName: `screen-${length + 1}`,
				backgroundImg: null,
				texts: [],
				emojies: [],
				objects: []
			}

			draftState.stories.push(newBoard)
			draftState.currentStoryIndex = length

			return
		}

		default: {
			return draftState
		}
	}
})
