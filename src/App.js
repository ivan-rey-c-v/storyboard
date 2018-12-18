import React, { lazy, Suspense } from 'react'
import styled from 'styled-components/macro'
import GlobalStyle from './GlobalStyle'

const Home = lazy(_ => import('./pages/Home'))

function App(props) {
	return (
		<AppStoreProvider>
			<AppLayout>
				{/* GlobalStyle does not render any div/element */}
				<GlobalStyle />

				<Suspense fallback={<EmptyDiv />}>
					<Home />
				</Suspense>
			</AppLayout>
		</AppStoreProvider>
	)
}

const AppLayout = styled.div`
	height: 100vh;
	width: 100vw;
`
const EmptyDiv = styled.div`
	height: 100%;
	width: 100%;
	background-color: #f7f7f7;
`

export default React.memo(App)
