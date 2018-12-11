import React, { useContext } from 'react'
import { AppContext } from '../../store/AppContext'
import styled from 'styled-components'

import StoryBoard from './StoryBoard'

function MainSection(props) {
	const store = useContext(AppContext)

	return (
		<MainLayout>
			{store.state.stories.map(story => (
				<StoryBoard key={story.id} {...story} />
			))}
		</MainLayout>
	)
}

const MainLayout = styled.main`
	flex: 1;
	background-color: #f7f7f7;
	padding-top: 1rem;
	padding-left: 4rem;

	display: flex;
	align-items: center;
`

export default React.memo(MainSection)
