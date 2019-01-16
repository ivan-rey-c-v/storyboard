import React from 'react'
import styled from 'styled-components/macro'

import { SidebarSection, SectionName, Button } from '../../Sidebar.styles'
import AddEmoji from './AddEmoji'

function AdditionalGraphics(props) {
	const { storeDispatch } = props

	return (
		<SidebarSection>
			<SectionName>Additional graphics</SectionName>

			<ActionsDiv>
				<WithCommingSoonButton> Upload image </WithCommingSoonButton>
				<AddEmoji storeDispatch={storeDispatch} />
			</ActionsDiv>
		</SidebarSection>
	)
}

const ActionsDiv = styled.div`
	display: flex;
	justify-content: space-between;
`
const WithCommingSoonButton = styled(Button)`
	position: relative;
	opacity: 1;

	&:hover::after {
		content: 'Coming Soon!';
		position: absolute;
		top: -50%;
		left: 25%;
		padding: 0.4rem 0.5rem;
		width: auto;
		background-color: lightblue;
	}
`

export default React.memo(AdditionalGraphics)
