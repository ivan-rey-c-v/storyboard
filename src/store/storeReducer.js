import produce from 'immer'

export default produce((draftState, action) => {
	switch (action.type) {
		case 'RESET_ACTIVE': {
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
				storyID: Math.random().toString(16),
				canvasName: `storyboard-${length + 1}`,
				backgroundImage: null,
				texts: [],
				emojies: [],
				objects: []
			}

			draftState.stories.push(newBoard)
			draftState.active = {
				storyIndex: length,
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
				shapeName: action.name
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
			draftState.active.shapeName = `${canvasName}-text-${length}-group`

			return
		}

		case 'MODIFY_TEXT': {
			const { properties } = action
			const { storyIndex, shapeName } = draftState.active
			const texts = draftState.stories[storyIndex].texts

			const newTexts = texts.map(text => {
				if (`${text.textID}-group` === shapeName) {
					return {
						...text,
						...properties
					}
				} else {
					return text
				}
			})
			draftState.stories[storyIndex].texts = newTexts

			return
		}

		case 'TOGGLE_TEXT_PROPERTY': {
			const { propertyName } = action
			const { storyIndex, shapeName } = draftState.active

			const texts = draftState.stories[storyIndex].texts

			const newTexts = texts.map(text => {
				if (`${text.textID}-group` === shapeName) {
					return {
						...text,
						[propertyName]: !text[propertyName]
					}
				} else {
					return text
				}
			})
			draftState.stories[storyIndex].texts = newTexts

			return
		}

		case 'CHANGE_TEXT_ALIGN': {
			const { storyIndex, shapeName } = draftState.active

			const aligns = ['left', 'center', 'right']

			const texts = draftState.stories[storyIndex].texts

			const newTexts = texts.map(text => {
				if (`${text.textID}-group` === shapeName) {
					const { align } = text
					const lastAlignIndex = aligns.indexOf(align)
					const newAlignIndex = (lastAlignIndex + 1) % aligns.length

					return {
						...text,
						align: aligns[newAlignIndex]
					}
				} else {
					return text
				}
			})
			draftState.stories[storyIndex].texts = newTexts

			return
		}

		case 'CHANGE_FONT_SIZE': {
			const { storyIndex, shapeName } = draftState.active

			const fontSizes = [24, 34, 44, 54]

			const texts = draftState.stories[storyIndex].texts

			const newTexts = texts.map(text => {
				if (`${text.textID}-group` === shapeName) {
					const { fontSize } = text
					const lastFontSizeIndex = fontSizes.indexOf(fontSize)
					const newFontSizeIndex =
						(lastFontSizeIndex + 1) % fontSizes.length

					return {
						...text,
						fontSize: fontSizes[newFontSizeIndex]
					}
				} else {
					return text
				}
			})
			draftState.stories[storyIndex].texts = newTexts
			return
		}

		case 'MOVE_STORY_BOARD': {
			const { boardIndex, increment } = action

			const { stories } = draftState
			const xIndex = boardIndex
			const yIndex = boardIndex + increment
			// swap
			;[stories[xIndex], stories[yIndex]] = [
				stories[yIndex],
				stories[xIndex]
			]

			draftState.active.storyIndex = boardIndex + increment
			draftState.active.textIndex = null
			draftState.active.shapeName = null

			return
		}

		default: {
			return draftState
		}
	}
})
