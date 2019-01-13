import generateUniqueID from './generateUniqueID'
import setStoryText from './setStoryText'

export default function() {
	return {
		storyID: generateUniqueID('Story'),
		canvasName: 'storyboard-1',
		backgroundImage: {
			file: null,
			type: 'scale',
			colorType: 'blur',
			colorFill: 'lightblue',
			colorOpacity: 1
		},
		shapes: [setStoryText()]
	}
}
