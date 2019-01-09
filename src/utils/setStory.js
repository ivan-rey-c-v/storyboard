import generateUniqueID from './generateUniqueID'

export default function() {
	return {
		storyID: generateUniqueID('Story'),
		canvasName: 'storyboard-1',
		backgroundImage: null,
		texts: [
			{
				textID: generateUniqueID('text'),
				fontFamily: 'Montserrat',
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
}
