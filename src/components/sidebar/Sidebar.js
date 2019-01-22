import React, { useState, useCallback } from 'react'

import { SidebarContainer } from './Sidebar.styles'

import SidebarHeader from './SidebarHeader'
import SubMenu from './submenu/SubMenu'
import SidebarSections from './sidebar-sections/SidebarSections'

function Sidebar(props) {
	const { state, dispatch } = props
	const [subMenuOpen, setSubMenuOpen] = useState(false)
	const { active, storiesByID, storiesList, boardsByID } = state
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
				<SubMenu
					storiesList={storiesList}
					storiesByID={storiesByID}
					activeStoryID={activeStoryID}
					storeDispatch={dispatch}
				/>
			) : (
				<SidebarSections
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
