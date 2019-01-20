function guid() {
	return Math.random()
		.toString(16)
		.substring(2)
}

export default function(name = 'storykit') {
	return `${name}-${guid()}-${guid()}-${guid()}`
}
