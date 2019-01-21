import generateUniqueID from '../utils/generateUniqueID'
import setStoryText from './setStoryText'

export default function setBoard(parentStoryID) {
	const boardID = generateUniqueID('board')
	const storyText = setStoryText()

	return {
		boardID,
		data: {
			boardID,
			parentStoryID,
			backgroundImage: {
				file: null,
				x: 0,
				type: 'scale',
				colorType: 'blur',
				colorFill: 'lightblue',
				colorOpacity: 1
			},
			shapesList: [storyText.shapeID],
			shapesByID: {
				[storyText.shapeID]: storyText.data
			}
		}
	}
}
