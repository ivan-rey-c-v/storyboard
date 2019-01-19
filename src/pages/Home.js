import React, { useContext, useCallback, useEffect } from 'react'
import { AppContext } from '../store/AppContext'
import styled from 'styled-components/macro'

import Sidebar from '../components/sidebar/Sidebar'
import Boards from '../components/boards/Boards'

import { setToLocalStorage } from '../utils/localStorage'

function Home(props) {
	const { state, dispatch } = useContext(AppContext)

	const handleOnClick = useCallback(function(event) {
		event.stopPropagation()
		dispatch({ type: 'RESET_ACTIVE' })
	}, [])

	const handlePreventImageDrop = useCallback(function(event) {
		// prevents browser to open the image on drop
		event.stopPropagation()
		event.preventDefault()
	}, [])

	useEffect(function() {
		setToLocalStorage(state)
	})

	return (
		<HomePage
			onClick={handleOnClick}
			onDrag={handlePreventImageDrop}
			onDragOver={handlePreventImageDrop}
			onDrop={handlePreventImageDrop}
		>
			<Sidebar state={state} dispatch={dispatch} />
			<Boards state={state} dispatch={dispatch} />
		</HomePage>
	)
}

const HomePage = styled.section`
	height: 100%;
	width: 100%;
	display: flex;
`

export default React.memo(Home)
