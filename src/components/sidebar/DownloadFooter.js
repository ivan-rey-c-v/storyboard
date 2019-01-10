import React, { useCallback } from 'react'

import { SidebarFooter, Button } from './Sidebar.styles'

function DownloadFooter({ storeDispatch }) {
	const handleDownload = useCallback(function(event) {
		event.stopPropagation()
		// remove Transformer selection
		storeDispatch({ type: 'SET_ACTIVE_SHAPE_NAME', name: null })

		const delay = 200
		new Promise(resolve => {
			setTimeout(() => {
				resolve()
			}, delay)
		}).then(res => {
			storeDispatch({ type: 'DOWNLOAD_ALL_BOARDS' })
		})
	}, [])

	return (
		<SidebarFooter>
			<Button primary onClick={handleDownload}>
				Download
			</Button>
		</SidebarFooter>
	)
}

export default React.memo(DownloadFooter)
