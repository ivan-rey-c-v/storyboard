import React, { useContext, useCallback } from 'react'
import { AppContext } from './store/AppContext'
import styled from 'styled-components'

import GlobalStyle from './GlobalStyle'
import Aside from './components/aside/Aside'
import MainSection from './components/main-section/MainSection'

function App(props) {
	const store = useContext(AppContext)

	const handleOnClick = useCallback(function(event) {
		event.stopPropagation()
		store.dispatch({ type: 'TOGGLE_EMOJI', toggle: false })
	}, [])

	return (
		<AppLayout onClick={handleOnClick}>
			<GlobalStyle />

			<Aside />
			<MainSection />
		</AppLayout>
	)
}

const AppLayout = styled.div`
	margin: 0;
	height: 100vh;
	width: 100vw;
	display: flex;
`

export default React.memo(App)
