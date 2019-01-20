import React, { useState, useCallback } from 'react'

import { SidebarContainer } from './Sidebar.styles'

import SidebarHeader from './SidebarHeader'
import SubMenu from './SubMenu'
import SidebarSections from './sidebar-sections/SidebarSections'

function Sidebar(props) {
	const { state, dispatch } = props
	const [subMenuOpen, setSubMenuOpen] = useState(false)
	const { stories } = state
	const { storyIndex, shapeName, colorPickerName } = state.active

	const currentStory = stories[storyIndex]
	const [currentText] = currentStory.shapes.filter(shape => {
		if (shape.type === 'text') {
			return `${shape.id}-group` === shapeName
		}
		return false
	})

	const handleToggleMenu = useCallback(function() {
		console.log('toggling menu', !subMenuOpen)
		setSubMenuOpen(!subMenuOpen)
	})

	return (
		<SidebarContainer>
			<SidebarHeader
				subMenuOpen={subMenuOpen}
				handleToggleMenu={handleToggleMenu}
			/>

			{subMenuOpen ? (
				<SubMenu />
			) : (
				<SidebarSections
					currentStory={currentStory}
					currentText={currentText}
					storeDispatch={dispatch}
					storyIndex={storyIndex}
					colorPickerName={colorPickerName}
				/>
			)}
		</SidebarContainer>
	)
}

export default React.memo(Sidebar)
