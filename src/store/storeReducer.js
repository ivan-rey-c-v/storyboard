import produce from 'immer'
import Filesaver from 'file-saver'
import JSZip from 'jszip'

import setStory from './setStory'
import setBoard from './setBoard'
import setStoryText from './setStoryText'
import generateUniqueID from '../utils/generateUniqueID'

export default produce((draftState, action) => {
	switch (action.type) {
		case 'RESET_ACTIVE': {
			draftState.active.activeTextShapeID = null
			draftState.active.activeColorPickerID = null
			return
		}

		case 'SELECT_STORY_BOARD': {
			const { boardID } = action
			draftState.active.activeBoardID = boardID
			return
		}

		case 'ADD_STORY_BOARD': {
			const { activeStoryID } = draftState.active

			const { boardID, data } = setBoard(activeStoryID)

			draftState.active = {
				activeStoryID: activeStoryID,
				activeBoardID: boardID,
				activeColorPickerID: null,
				activeTextShapeID: null
			}
			draftState.boardsByID[boardID] = data
			draftState.storiesByID[activeStoryID].boardsList.push(boardID)

			return
		}

		case 'DELETE_STORY_BOARD': {
			const { boardID } = action
			const { boardsByID, storiesByID } = draftState
			const { activeStoryID, activeBoardID } = draftState.active

			const { boardsList } = storiesByID[activeStoryID]

			if (boardsList.length === 1) {
				return // do nothing
			}

			const { newBoardsList, boardIndex } = boardsList.reduce(
				(accum, id, index) => {
					id == boardID
						? (accum.boardIndex = index)
						: accum.newBoardsList.push(id)
					return accum
				},
				{
					newBoardsList: [],
					boardIndex: null
				}
			)

			draftState.storiesByID[activeStoryID].boardsList = newBoardsList
			const { [boardID]: toBeDeleted, ...remainingBoards } = boardsByID

			draftState.boardsByID = remainingBoards
			draftState.storiesByID[activeStoryID].boardsList = newBoardsList

			draftState.active.activeColorPickerID = null
			draftState.active.activeTextShapeID = null
			draftState.active.activeBoardID =
				activeBoardID === boardID
					? newBoardsList[
							(boardIndex - 1 + newBoardsList.length) %
								newBoardsList.length
					  ]
					: boardID

			return
		}

		case 'SET_BACKGROUND_IMAGE': {
			const { properties } = action
			const { boardsByID } = draftState
			const { activeBoardID } = draftState.active

			const lastBackgroundImage =
				boardsByID[activeBoardID].backgroundImage

			draftState.boardsByID[activeBoardID].backgroundImage = {
				...lastBackgroundImage,
				...properties
			}

			return
		}

		case 'ADD_EMOJI': {
			const { activeBoardID } = draftState.active
			const emojiID = generateUniqueID('emoji')
			const emoji = {
				shapeID: emojiID,
				type: 'emoji',
				emoji: action.emoji,
				fontSize: 46,
				coord: {
					x: 50,
					y: 50,
					scaleX: 1,
					scaleY: 1,
					rotation: 0
				}
			}
			draftState.boardsByID[activeBoardID].shapesList.push(emojiID)
			draftState.boardsByID[activeBoardID].shapesByID[emojiID] = emoji
			return
		}

		case 'SET_ACTIVE_SHAPE_ID': {
			const { shapeID } = action
			draftState.active.activeTextShapeID = shapeID
			return
		}

		case 'ADD_TEXT': {
			const { activeBoardID } = draftState.active
			const { shapeID, data } = setStoryText()

			draftState.boardsByID[activeBoardID].shapesList.push(shapeID)
			draftState.boardsByID[activeBoardID].shapesByID[shapeID] = data
			draftState.active.activeTextShapeID = shapeID

			return
		}

		case 'MODIFY_TEXT': {
			const { properties } = action
			const {
				activeStoryID,
				activeBoardID,
				activeTextShapeID
			} = draftState.active
			const { boardsByID } = draftState

			const lastTextShape =
				boardsByID[activeBoardID].shapesByID[activeTextShapeID]

			draftState.boardsByID[activeBoardID].shapesByID[
				activeTextShapeID
			] = {
				...lastTextShape,
				...properties
			}

			return
		}

		case 'TOGGLE_TEXT_PROPERTY': {
			const { propertyName } = action
			const { activeBoardID, activeTextShapeID } = draftState.active
			const { boardsByID } = draftState

			const currentTextShape =
				boardsByID[activeBoardID].shapesByID[activeTextShapeID]

			const lastState = currentTextShape[propertyName]

			currentTextShape[propertyName] = !lastState

			return
		}

		// case 'CHANGE_TEXT_ALIGN': {
		// 	const { storyIndex, shapeName } = draftState.active

		// 	const aligns = ['left', 'center', 'right']

		// 	const shapes = draftState.stories[storyIndex].shapes

		// 	const newShapes = shapes.map(shape => {
		// 		if (`${shape.id}-group` === shapeName) {
		// 			const { align } = shape
		// 			const lastAlignIndex = aligns.indexOf(align)
		// 			const newAlignIndex = (lastAlignIndex + 1) % aligns.length

		// 			return {
		// 				...shape,
		// 				align: aligns[newAlignIndex]
		// 			}
		// 		} else {
		// 			return shape
		// 		}
		// 	})
		// 	draftState.stories[storyIndex].shapes = newShapes

		// 	return
		// }

		// case 'CHANGE_FONT_SIZE': {
		// 	const { storyIndex, shapeName } = draftState.active

		// 	const fontSizes = [24, 34, 44, 54]

		// 	const shapes = draftState.stories[storyIndex].shapes

		// 	const newShapes = shapes.map(shape => {
		// 		if (`${shape.id}-group` === shapeName) {
		// 			const { fontSize } = shape
		// 			const lastFontSizeIndex = fontSizes.indexOf(fontSize)
		// 			const newFontSizeIndex =
		// 				(lastFontSizeIndex + 1) % fontSizes.length

		// 			return {
		// 				...shape,
		// 				fontSize: fontSizes[newFontSizeIndex]
		// 			}
		// 		} else {
		// 			return shape
		// 		}
		// 	})
		// 	draftState.stories[storyIndex].shapes = newShapes
		// 	return
		// }

		case 'MOVE_STORY_BOARD': {
			const { boardIndex, increment } = action

			const { activeStoryID } = draftState.active
			const newIndex = boardIndex + increment
			const { boardsList } = draftState.storiesByID[activeStoryID]
			// swap
			;[boardsList[boardIndex], boardsList[newIndex]] = [
				boardsList[newIndex],
				boardsList[boardIndex]
			]

			return
		}

		case 'MOVE_SHAPE_Z_INDEX': {
			const { increment } = action
			const { boardsByID } = draftState
			const { activeBoardID, activeTextShapeID } = draftState.active

			const { shapesList } = boardsByID[activeBoardID]
			const shapeIndex = shapesList.indexOf(activeTextShapeID)

			const newIndex = shapeIndex + increment
			if (newIndex < 0 || newIndex >= shapesList.length) {
				return
			}

			// swap
			;[shapesList[shapeIndex], shapesList[newIndex]] = [
				shapesList[newIndex],
				shapesList[shapeIndex]
			]

			return
		}

		case 'COPY_STORY_BOARD': {
			const { boardID } = action
			const { storiesByID, boardsByID } = draftState
			const { activeStoryID, activeBoardID } = draftState.active

			const boardData = { ...boardsByID[activeBoardID] }

			const newBoardID = generateUniqueID('board')
			boardData.boardID = newBoardID
			const lastShapesByID = { ...boardData.shapesByID }
			boardData.shapesByID = {}

			boardData.shapesList = boardData.shapesList.map(shapeID => {
				let newShapeID
				if (shapeID.includes('text')) {
					newShapeID = generateUniqueID('text')
				}
				if (shapeID.includes('emoji')) {
					newShapeID = generateUniqueID('text')
				}
				boardData.shapesByID[newShapeID] = {
					...lastShapesByID[shapeID],
					shapeID: newShapeID
				}
				return newShapeID
			})

			storiesByID[activeStoryID].boardsList.push(newBoardID)
			boardsByID[newBoardID] = boardData

			return
		}

		case 'DOWNLOAD_STORY_BOARD': {
			const { boardID } = action

			const canvas = document.getElementById(boardID)

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

			return
		}

		case 'DOWNLOAD_ALL_BOARDS': {
			const { activeStoryID } = draftState.active
			const { storyName } = draftState.storiesByID[activeStoryID]

			const canvasses = [
				...document.getElementsByClassName('konva-canvas')
			]

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
				Filesaver.saveAs(content, `${storyName}.zip`)
			})
			return
		}

		case 'SET_COLOR_PICKER': {
			const { colorPickerID } = action
			draftState.active.activeColorPickerID = colorPickerID
			return
		}

		case 'SET_SHAPE_COORD': {
			let { shapeID, coord } = action

			const { activeBoardID } = draftState.active
			const { boardsByID } = draftState

			const lastCoord =
				boardsByID[activeBoardID].shapesByID[shapeID].coord

			boardsByID[activeBoardID].shapesByID[shapeID].coord = {
				...lastCoord,
				...coord
			}

			return
		}

		default: {
			return draftState
		}
	}
})
