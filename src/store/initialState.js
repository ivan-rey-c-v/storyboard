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
					fontSize: 16,
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
		}
	]
}
