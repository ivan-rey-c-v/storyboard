import generateUniqueID from '../utils/generateUniqueID'

export default {
	active: {
		storyIndex: 0,
		textIndex: null,
		shapeName: null
	},
	stories: [
		{
			storyID: generateUniqueID('Story'),
			canvasName: 'storyboard-1',
			backgroundImage: null,
			texts: [
				{
					textID: generateUniqueID('text'),
					fontFamily: 'Arial',
					fontSize: 34,
					fontStyle: 'normal',
					text: 'Hello!',
					align: 'center',
					padding: 10,
					fill: 'black',
					opacity: 1,
					boxFill: 'yellow',
					boxOpacity: 1,
					isBold: false,
					isItalic: false,
					isUnderline: false
				}
			],
			emojies: [],
			objects: []
		}
	]
}
