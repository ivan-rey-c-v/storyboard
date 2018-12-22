import React, { useCallback } from 'react'
import FileSaver from 'file-saver'
import JSZip from 'jszip'

import { SidebarFooter, Button } from './Sidebar.styles'

function DownloadFooter({ storeDispatch }) {
	const handleDownload = useCallback(function(event) {
		event.stopPropagation()
		// remove Transformer selection
		storeDispatch({ type: 'SET_SELECTED_SHAPE_NAME', name: '' })

		const canvasses = [...document.getElementsByTagName('canvas')]

		const zip = new JSZip()

		canvasses.forEach((canvas, index) => {
			const { height, width } = canvas
			const aspectRatio = width / height

			//create a new canvas
			const newCanvas = document.createElement('canvas')
			const context = newCanvas.getContext('2d')

			//set dimensions
			const newHeight = 1980
			const newWidth = newHeight * aspectRatio
			newCanvas.height = newHeight
			newCanvas.width = newWidth

			//apply the old canvas to the new one
			context.drawImage(canvas, 0, 0, newWidth, newHeight)

			const src = newCanvas.toDataURL()
			zip.file(`storyboard${index + 1}.png`, src, { binary: true })
		})

		zip.generateAsync({ type: 'blob' }).then(function(content) {
			console.log({ content })
			FileSaver.saveAs(content, 'storyboard.zip')
		})
	}, [])

	return (
		<SidebarFooter>
			<Button primary>Download</Button>
		</SidebarFooter>
	)
}

export default React.memo(DownloadFooter)
