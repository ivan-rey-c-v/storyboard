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

		case 'ADD_STORY_BOARD': {
			const length = draftState.stories.length

			const newBoard = {
				storyID: `Story ${length + 1}`,
				canvasName: `storyboard-${length + 1}`,
				backgroundImage: null,
				texts: [],
				emojies: [],
				objects: []
			}

			draftState.stories.push(newBoard)
			draftState.active = {
				storyIndex: length,
				textIndex: null,
				shapeName: null
			}

			return
		}

		case 'DELETE_STORY_BOARD': {
			const { stories } = draftState
			draftState.stories = stories.filter(
				story => story.storyID !== action.storyID
			)
			const { length } = draftState.stories
			draftState.active.storyIndex = (length + 1) % length
			draftState.active.textIndex = null

			return
		}

		case 'SET_BACKGROUND_IMAGE': {
			const { imgFile, storyIndex } = action
			draftState.stories[storyIndex].backgroundImage = imgFile
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

		case 'SET_ACTIVE_SHAPE_NAME': {
			draftState.active = {
				storyIndex: action.storyIndex,
				shapeName: action.name,
				textIndex: action.textIndex
			}
			return
		}

		case 'ADD_TEXT': {
			const { storyIndex } = draftState.active
			const { canvasName } = draftState.stories[storyIndex]
			const { length } = draftState.stories[storyIndex].texts

			const text = {
				fontSize: 48,
				fontStyle: 'normal',
				text: 'Hello!',
				align: 'left',
				padding: 10,
				fill: '#232323',
				opacity: 1
			}

			draftState.stories[storyIndex].texts.push(text)
			draftState.active.textIndex = length
			draftState.active.shapeName = `${canvasName}-text-${length}-group`

			return
		}

		case 'MODIFY_TEXT': {
			const { properties } = action
			const { storyIndex, textIndex } = draftState.active

			const lastText = draftState.stories[storyIndex].texts[textIndex]

			draftState.stories[storyIndex].texts[textIndex] = {
				...lastText,
				...properties
			}
			return
		}

		case 'TOGGLE_TEXT_PROPERTY': {
			const { propertyName } = action
			const { storyIndex, textIndex } = draftState.active

			const lastText = draftState.stories[storyIndex].texts[textIndex]

			draftState.stories[storyIndex].texts[textIndex] = {
				...lastText,
				[propertyName]: !lastText[propertyName]
			}
			return
		}

		case 'CHANGE_TEXT_ALIGN': {
			const { storyIndex, textIndex } = draftState.active

			const lastText = draftState.stories[storyIndex].texts[textIndex]

			const { align } = lastText
			const aligns = ['left', 'center', 'right']
			const lastAlignIndex = aligns.indexOf(align)
			const newAlignIndex = (lastAlignIndex + 1) % aligns.length

			draftState.stories[storyIndex].texts[textIndex] = {
				...lastText,
				align: aligns[newAlignIndex]
			}
			return
		}

		case 'CHANGE_FONT_SIZE': {
			const { storyIndex, textIndex } = draftState.active

			const lastText = draftState.stories[storyIndex].texts[textIndex]

			const { fontSize } = lastText
			const fontSizes = [24, 34, 44, 54]
			const lastFontSizeIndex = fontSizes.indexOf(fontSize)
			const newFontSizeIndex = (lastFontSizeIndex + 1) % fontSizes.length

			draftState.stories[storyIndex].texts[textIndex] = {
				...lastText,
				fontSize: fontSizes[newFontSizeIndex]
			}
			return
		}

		default: {
			return draftState
		}
	}
})
