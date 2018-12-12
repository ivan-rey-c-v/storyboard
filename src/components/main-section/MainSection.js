import React, { useContext } from 'react'
import { AppContext } from '../../store/AppContext'
import styled from 'styled-components'

import StoryBoard from './StoryBoard'

function MainSection(props) {
	const store = useContext(AppContext)

	const { stories, currentStoryIndex } = store.state

	return (
		<MainLayout>
			{stories.map((story, index) => (
				<StoryBoard
					key={story.name}
					{...story}
					storeDispatch={store.dispatch}
					index={index}
					isCurrentStory={currentStoryIndex === index ? true : false}
				/>
			))}
		</MainLayout>
	)
}

const MainLayout = styled.main`
	flex: 1;
	background-color: #f7f7f7;
	padding-top: 1rem;
	padding-left: 4rem;
	overflow: hidden;

	display: flex;
	align-items: center;
`

export default React.memo(MainSection)
