const storageName = 'storyboard'

export function setToLocalStorage(state) {
	window.localStorage.setItem(storageName, JSON.stringify(state))
}

export function getLocalStorage() {
	return JSON.parse(window.localStorage.getItem(storageName))
}
