import React from 'react'
import styled from 'styled-components'

import { SidebarSections, SubMenuPanel, MenuActionDiv } from './Sidebar.styles'
import PlusSVG from 'react-feather/dist/icons/plus'
import FileSVG from 'react-feather/dist/icons/file'
import EditSVG from 'react-feather/dist/icons/edit-3'
import TrashSVG from 'react-feather/dist/icons/trash-2'

function SubMenu(props) {
	return (
		<StyledSidebarSections>
			<CreateStoryPanel>
				<PlusSVG />
				<FlexedDiv>Create New Story</FlexedDiv>
				<div />
			</CreateStoryPanel>

			<AnimatedSubMenuPanel>
				<FileSVG />

				<FlexedDiv>
					<p>name</p>
					<Description>date</Description>
				</FlexedDiv>

				<MarginedMenuActionDiv>
					<TrashSVG />
				</MarginedMenuActionDiv>

				<MenuActionDiv>
					<EditSVG />
				</MenuActionDiv>
			</AnimatedSubMenuPanel>
		</StyledSidebarSections>
	)
}

const StyledSidebarSections = styled(SidebarSections)`
	/*  */
	flex-grow: 1;
`
const AnimatedSubMenuPanel = styled(SubMenuPanel)`
	border-right: none;
	border-bottom: 1px solid lightgray;
`
const CreateStoryPanel = styled(AnimatedSubMenuPanel)`
	cursor: pointer;
	border-top: 1px solid lightgray;

	:hover {
		background-color: lightblue;
	}
	:active {
		transform: scale(0.95);
	}
`

const FlexedDiv = styled.div`
	flex-grow: 1;
	padding-left: 1.5rem;
	font-size: 1rem;
	font-weight: 600;
	color: rgb(62, 56, 71);
`
const MarginedMenuActionDiv = styled(MenuActionDiv)`
	margin-right: 1rem;
`
const Description = styled.p`
	line-height: 1.75;
	font-size: 0.8rem;
	color: gray;
`

export default React.memo(SubMenu)
