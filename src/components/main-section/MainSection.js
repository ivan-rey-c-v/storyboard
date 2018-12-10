import React from 'react'
import styled from 'styled-components'

import StoryBoard from './StoryBoard'

function MainSection(props) {
	return (
		<MainLayout>
			<StoryBoard />
		</MainLayout>
	)
}

const MainLayout = styled.main`
	flex: 1;
	background-color: #f7f7f7;
	padding-top: 5rem;
	padding-left: 5rem;
`

export default React.memo(MainSection)
