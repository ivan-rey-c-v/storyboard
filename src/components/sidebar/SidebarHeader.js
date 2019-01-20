import React from 'react'

import { SubMenuPanel, MenuActionDiv } from './Sidebar.styles'

import { ReactComponent as HeaderSVG } from '../../images/header.svg'
import MenuSVG from 'react-feather/dist/icons/menu'
import CloseSVG from 'react-feather/dist/icons/x'

function SidebarHeader(props) {
	const { subMenuOpen, handleToggleMenu } = props

	return (
		<SubMenuPanel>
			<MenuActionDiv onClick={handleToggleMenu}>
				{subMenuOpen ? <CloseSVG /> : <MenuSVG />}
			</MenuActionDiv>
			<HeaderSVG />
			<div />
		</SubMenuPanel>
	)
}

export default React.memo(SidebarHeader)
