import React from 'react'
import styled from 'styled-components'

import GlobalStyle from './GlobalStyle'
import Aside from './components/aside/Aside'

function App(props) {
	return (
		<AppLayout>
			<GlobalStyle />

			<Aside />
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
