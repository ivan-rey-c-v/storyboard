import generateUniqueID from '../utils/generateUniqueID'

export default function setStory() {
	const storyID = generateUniqueID('story')
	const date = new Date()
	const year = date.getFullYear()
	const month = date.getMonth()
	const day = date.getDate()

	return {
		// id is used to store in state.stories.allID
		storyID,
		// data is used as data value in state.stories
		data: {
			storyID,
			storyName: 'Untitled story 1',
			// date's month starts at 0 for january
			createdDate: `${day}/${month + 1}/${year}`,
			boardsList: []
		}
	}
}
