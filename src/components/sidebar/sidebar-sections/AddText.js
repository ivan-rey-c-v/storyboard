import React, { useCallback } from 'react'

import { SidebarSection, SectionName, Button } from '../Sidebar.styles'

function AddText(props) {
	const { storeDispatch } = props

	const handleAddText = useCallback(function(event) {
		event.stopPropagation()
		event.preventDefault()
		storeDispatch({ type: 'ADD_TEXT' })
	}, [])

	return (
		<SidebarSection>
			<SectionName>Text</SectionName>
			<Button onClick={handleAddText}>Add text</Button>

			{
				/*
				 * preview list
				 * text properties menus
				 */

				props.children
			}
		</SidebarSection>
	)
}

export default React.memo(AddText)
