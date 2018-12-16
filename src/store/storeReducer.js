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
			const fontSizes = [16, 24, 32, 40]
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

		case 'RESET_ACTIVES': {
			draftState.actives.selectedShapeName = ''
			draftState.actives.textIndex = null
			return
		}

		default: {
			return draftState
		}
	}
})
