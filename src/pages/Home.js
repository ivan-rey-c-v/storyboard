import React, {
	useContext,
	useCallback,
	useEffect,
	lazy,
	Suspense
} from 'react'
import { AppContext } from '../store/AppContext'
import styled from 'styled-components/macro'

import { setToLocalStorage } from '../utils/localStorage'

const Sidebar = lazy(_ => import('../components/sidebar/Sidebar'))
const Boards = lazy(_ => import('../components/boards/Boards'))

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
			<Suspense fallback={<SidebarFallback />}>
				<Sidebar state={state} dispatch={dispatch} />
			</Suspense>
			<Suspense fallback={<div />}>
				<Boards state={state} dispatch={dispatch} />
			</Suspense>
		</HomePage>
	)
}

const HomePage = styled.section`
	height: 100%;
	width: 100%;
	display: flex;
`
const SidebarFallback = styled.div`
	width: 350px;
	height: 100%;
	border-right: 1px solid lightgray;
`

export default React.memo(Home)
