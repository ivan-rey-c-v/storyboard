export default {
	currentStoryIndex: 0,
	actives: {
		textIndex: null,
		selectedShapeName: ''
	},
	stories: [
		{
			id: 'Screen 1',
			canvasName: 'screen-1',
			backgroundImg: null,
			texts: [
				{
					fontSize: 48,
					fontStyle: 'normal',
					text: 'Hello!',
					align: 'center',
					padding: 10,
					fill: 'black',
					opacity: 1,
					boxFill: 'yellow',
					boxOpacity: 1
				}
			],
			emojies: [],
			objects: []
		},
		{
			id: 'Screen 2',
			canvasName: 'screen-2',
			backgroundImg: null,
			texts: [],
			emojies: [],
			objects: []
		},
		{
			id: 'Screen 3',
			canvasName: 'screen-3',
			backgroundImg: null,
			texts: [],
			emojies: [],
			objects: []
		}
	]
}
