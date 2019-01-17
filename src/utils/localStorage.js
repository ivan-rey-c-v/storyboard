const storageName = 'storyboard'

export function setToLocalStorage(state) {
	const newState = {
		...state,
		stories: state.stories.map(story => {
			const file = story.backgroundImage.file

			return {
				...story,
				backgroundImage: {
					...story.backgroundImage,
					file:
						file == null
							? null
							: // JSOn does not serialize File objects
							  {
									dataurl: window.URL.createObjectURL(file),
									name: file.name,
									size: file.size,
									type: file.type
							  }
				}
			}
		})
	}

	window.localStorage.setItem(storageName, JSON.stringify(newState))
}

export function getLocalStorage() {
	const state = JSON.parse(window.localStorage.getItem(storageName))
	return state
		? {
				...state,
				stories: state.stories.map(story => {
					const file = story.backgroundImage.file

					let newFile
					if (file == null) {
						newFile = null
					} else {
						newFile = new File([file.dataurl], file.name, {
							type: file.type
						})
					}

					return {
						...story,
						backgroundImage: {
							...story.backgroundImage,
							file: newFile
						}
					}
				})
		  }
		: null
}
