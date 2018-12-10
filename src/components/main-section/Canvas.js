import React from 'react'
import styled from 'styled-components'

function Canvas(props) {
	return (
		<Layout>
			<p>CANVAS</p>
		</Layout>
	)
}

const Layout = styled.div`
	height: 100%;
	width: 100%;
`

export default React.memo(Canvas)
