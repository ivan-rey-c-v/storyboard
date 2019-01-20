import React, { useState, useCallback } from 'react'

import { SidebarContainer } from './Sidebar.styles'

import SidebarHeader from './SidebarHeader'
import SubMenu from './SubMenu'
import SidebarSections from './sidebar-sections/SidebarSections'

function Sidebar(props) {
	const { state, dispatch } = props
	const [subMenuOpen, setSubMenuOpen] = useState(false)
	const { active, storiesByID, boardsByID } = state
	const {
		activeStoryID,
		activeBoardID,
		activeTextShapeID,
		activeColorPickerID
	} = active

	const currentStoryBoard = boardsByID[activeBoardID]

	const handleToggleMenu = useCallback(function() {
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
					activeStoryID={activeStoryID}
					activeBoardID={activeBoardID}
					activeColorPickerID={activeColorPickerID}
					currentStoryBoard={currentStoryBoard}
					activeTextShapeID={activeTextShapeID}
					storeDispatch={dispatch}
				/>
			)}
		</SidebarContainer>
	)
}

export default React.memo(Sidebar)
