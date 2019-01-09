import generateUniqueID from '../utils/generateUniqueID'
import setStory from '../utils/setStory'

export default {
	active: {
		storyIndex: 0,
		textIndex: null,
		shapeName: null
	},
	stories: [setStory()]
}
