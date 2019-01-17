import setStory from '../utils/setStory'
import { getLocalStorage } from '../utils/localStorage'

const stateFromStorage = getLocalStorage()

export default (stateFromStorage
	? stateFromStorage
	: {
			active: {
				storyIndex: 0,
				colorPickerName: null,
				shapeName: null
			},
			stories: [setStory()]
	  })
