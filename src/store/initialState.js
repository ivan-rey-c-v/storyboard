import setStory from '../utils/setStory'

const storageName = 'boardstate'

const localStorageState = window.localStorage.getItem(storageName)

export default (localStorageState
	? JSON.parse(localStorageState)
	: {
			active: {
				storyIndex: 0,
				colorPickerName: null,
				shapeName: null
			},
			stories: [setStory()]
	  })
