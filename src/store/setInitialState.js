import generateUniqueID from '../utils/generateUniqueID'
import setStory from './setStory'
import setBoard from './setBoard'

export default function setInitialState() {
	const story = setStory()
	const board = setBoard(story.storyID)

	const state = {
		userID: generateUniqueID('User'),
		active: {
			activeStoryID: story.storyID,
			activeBoardID: board.boardID,
			activeColorPickerID: null,
			activeTextShapeID: null
		},
		storiesList: [],
		storiesByID: {},
		boardsByID: {}
	}

	state.storiesByID[story.storyID] = story.data
	state.storiesList.push(story.storyID)

	state.boardsByID[board.boardID] = board.data
	state.storiesByID[story.storyID].boardsList.push(board.boardID)

	return state
}
