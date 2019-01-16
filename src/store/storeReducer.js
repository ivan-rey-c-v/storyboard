import produce from 'immer'
import Filesaver from 'file-saver'
import JSZip from 'jszip'

import setStory from '../utils/setStory'
import setStoryText from '../utils/setStoryText'
import generateUniqueID from '../utils/generateUniqueID'

export default produce((draftState, action) => {
	switch (action.type) {
		case 'RESET_ACTIVE': {
			draftState.active.shapeName = null
			draftState.active.colorPickerName = null
			return
		}

		case 'SELECT_STORY_BOARD': {
			const { storyIndex } = action
			draftState.active.storyIndex = storyIndex
			return
		}

		case 'ADD_STORY_BOARD': {
			const length = draftState.stories.length

			draftState.stories.push(setStory())
			draftState.active = {
				storyIndex: length,
				shapeName: null
			}

			return
		}

		case 'DELETE_STORY_BOARD': {
			const { storyIndex } = action
			const { stories } = draftState

			if (stories.length === 1) {
				return // do nothing
			}

			draftState.stories = stories.filter(
				(story, index) => index !== storyIndex
			)
			const { length } = draftState.stories
			draftState.active.storyIndex = (length + 1) % length

			return
		}

		case 'SET_BACKGROUND_IMAGE': {
			const { storyIndex, propertyName, propertyValue } = action
			draftState.stories[storyIndex].backgroundImage[
				propertyName
			] = propertyValue

			return
		}

		case 'ADD_EMOJI': {
			const { storyIndex } = draftState.active
			const emoji = {
				id: generateUniqueID('emoji'),
				type: 'emoji',
				emoji: action.emoji,
				fontSize: 46
			}
			draftState.stories[storyIndex].shapes.push(emoji)
			return
		}

		case 'SET_ACTIVE_SHAPE_NAME': {
			draftState.active = {
				storyIndex:
					action.storyIndex != undefined
						? action.storyIndex
						: draftState.active.storyIndex,
				shapeName: action.name
			}
			return
		}

		case 'ADD_TEXT': {
			const { storyIndex } = draftState.active
			const newText = setStoryText()

			draftState.stories[storyIndex].shapes.push(newText)
			draftState.active.shapeName = `${newText.id}-group`

			return
		}

		case 'MODIFY_TEXT': {
			const { properties } = action
			const { storyIndex, shapeName } = draftState.active
			const shapes = draftState.stories[storyIndex].shapes

			const newShapes = shapes.map(shape => {
				if (`${shape.id}-group` === shapeName) {
					return {
						...shape,
						...properties
					}
				} else {
					return shape
				}
			})
			draftState.stories[storyIndex].shapes = newShapes

			return
		}

		case 'TOGGLE_TEXT_PROPERTY': {
			const { propertyName } = action
			const { storyIndex, shapeName } = draftState.active

			const shapes = draftState.stories[storyIndex].shapes

			const newShapes = shapes.map(shape => {
				if (`${shape.id}-group` === shapeName) {
					return {
						...shape,
						[propertyName]: !shape[propertyName]
					}
				} else {
					return shape
				}
			})
			draftState.stories[storyIndex].shapes = newShapes

			return
		}

		case 'CHANGE_TEXT_ALIGN': {
			const { storyIndex, shapeName } = draftState.active

			const aligns = ['left', 'center', 'right']

			const shapes = draftState.stories[storyIndex].shapes

			const newShapes = shapes.map(shape => {
				if (`${shape.id}-group` === shapeName) {
					const { align } = shape
					const lastAlignIndex = aligns.indexOf(align)
					const newAlignIndex = (lastAlignIndex + 1) % aligns.length

					return {
						...shape,
						align: aligns[newAlignIndex]
					}
				} else {
					return shape
				}
			})
			draftState.stories[storyIndex].shapes = newShapes

			return
		}

		case 'CHANGE_FONT_SIZE': {
			const { storyIndex, shapeName } = draftState.active

			const fontSizes = [24, 34, 44, 54]

			const shapes = draftState.stories[storyIndex].shapes

			const newShapes = shapes.map(shape => {
				if (`${shape.id}-group` === shapeName) {
					const { fontSize } = shape
					const lastFontSizeIndex = fontSizes.indexOf(fontSize)
					const newFontSizeIndex =
						(lastFontSizeIndex + 1) % fontSizes.length

					return {
						...shape,
						fontSize: fontSizes[newFontSizeIndex]
					}
				} else {
					return shape
				}
			})
			draftState.stories[storyIndex].shapes = newShapes
			return
		}

		case 'MOVE_STORY_BOARD': {
			const { boardIndex, increment } = action

			const { stories } = draftState
			const newIndex = boardIndex + increment
			// swap
			;[stories[boardIndex], stories[newIndex]] = [
				stories[newIndex],
				stories[boardIndex]
			]

			draftState.active.storyIndex = boardIndex + increment
			draftState.active.textIndex = null
			draftState.active.shapeName = null

			return
		}

		case 'MOVE_SHAPE_Z_INDEX': {
			const { increment } = action
			const { shapeName, storyIndex } = draftState.active
			const { shapes } = draftState.stories[storyIndex]
			const shapeIndex = shapes.reduce((accumIndex, shape, index) => {
				if (accumIndex) return accumIndex

				if (shape.type === 'text') {
					return `${shape.id}-group` === shapeName
						? index
						: accumIndex
				}

				if (shape.type === 'emoji') {
					return shape.id === shapeName ? index : accumIndex
				}

				return accumIndex
			}, null)

			const newIndex = shapeIndex + increment
			if (newIndex < 0 || newIndex >= shapes.length) {
				return
			}
			console.log({ shapeIndex, newIndex })
			// swap
			;[shapes[shapeIndex], shapes[newIndex]] = [
				shapes[newIndex],
				shapes[shapeIndex]
			]

			return
		}

		case 'COPY_STORY_BOARD': {
			const { storyIndex } = action
			const length = draftState.stories.length
			const currentStory = draftState.stories[storyIndex]

			const newStory = {
				...currentStory,
				storyID: generateUniqueID('Story'),
				shapes: currentStory.shapes.map(shape => {
					return {
						...shape,
						id: generateUniqueID(shape.type)
					}
				})
			}

			draftState.stories.push(newStory)

			draftState.active = {
				storyIndex: length,
				shapeName: null
			}

			return
		}

		case 'DOWNLOAD_STORY_BOARD': {
			const { boardIndex } = action

			const canvasses = [...document.getElementsByTagName('canvas')]

			canvasses.forEach((canvas, index) => {
				if (index === boardIndex) {
					const { height, width } = canvas
					const aspectRatio = width / height

					//create a new canvas
					const newCanvas = document.createElement('canvas')

					//set dimensions
					const newHeight = 1980
					const newWidth = newHeight * aspectRatio
					newCanvas.height = newHeight
					newCanvas.width = newWidth

					const context = newCanvas.getContext('2d')
					context.drawImage(canvas, 0, 0, newWidth, newHeight)
					newCanvas.toBlob(function(blob) {
						Filesaver.saveAs(blob, 'storyboard.png')
					})
				}
			})

			return
		}

		case 'DOWNLOAD_ALL_BOARDS': {
			const canvasses = [...document.getElementsByTagName('canvas')]

			const zip = new JSZip()

			canvasses.forEach((canvas, index) => {
				const { height, width } = canvas
				const aspectRatio = width / height

				//create a new canvas
				const newCanvas = document.createElement('canvas')
				const context = newCanvas.getContext('2d')

				//set dimensions
				const newHeight = 1980
				const newWidth = newHeight * aspectRatio
				newCanvas.height = newHeight
				newCanvas.width = newWidth

				//apply the old canvas to the new one
				context.drawImage(canvas, 0, 0, newWidth, newHeight)

				const src = newCanvas.toDataURL()
				zip.file(
					`storyboard${index + 1}.png`,
					src.substring(src.indexOf(',') + 1),
					{ base64: true }
				)
			})

			zip.generateAsync({ type: 'blob' }).then(content => {
				Filesaver.saveAs(content, 'storyboard.zip')
			})
			return
		}

		case 'SET_COLOR_PICKER': {
			const { colorPickerName } = action
			draftState.active.colorPickerName = colorPickerName
			return
		}

		default: {
			return draftState
		}
	}
})
