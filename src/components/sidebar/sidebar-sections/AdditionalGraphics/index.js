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
				<Button> Upload image </Button>
				<AddEmoji storeDispatch={storeDispatch} />
			</ActionsDiv>
		</SidebarSection>
	)
}

const ActionsDiv = styled.div`
	display: flex;
	justify-content: space-between;
`

export default React.memo(AdditionalGraphics)
