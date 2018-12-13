export default {
	currentStoryIndex: 0,
	actives: {
		textIndex: null,
		selectedShapeName: ''
	},
	stories: [
		{
			id: 'Screen 1',
			name: 'screen-1',
			backgroundImg: null,
			texts: [
				{
					fontSize: 48,
					text: 'Hello!',
					align: 'left',
					padding: 10,
					fill: 'purple'
				}
			],
			emojies: [],
			objects: []
		},
		{
			id: 'Screen 2',
			name: 'screen-2',
			backgroundImg: null,
			texts: [],
			emojies: [],
			objects: []
		},
		{
			id: 'Screen 3',
			name: 'screen-3',
			backgroundImg: null,
			texts: [],
			emojies: [],
			objects: []
		}
	]
}
