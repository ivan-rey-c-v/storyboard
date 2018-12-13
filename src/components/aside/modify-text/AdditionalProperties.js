import React, { lazy, Suspense } from 'react'
import styled from 'styled-components'

const ColorPicker = lazy(_ => import('./ColorPicker'))
const FontStyle = lazy(_ => import('./FontStyle'))

function AdditionalProperties(props) {
	return (
		<Container>
			<Card />
			<Card />
			<Card>
				<Suspense fallback={<Card />}>
					<FontStyle
						fontStyle={props.currentText.fontStyle}
						handleOnFontStyleChange={props.handleOnFontStyleChange}
					/>
				</Suspense>
			</Card>
			<Card>
				<Suspense fallback={<Card />}>
					<ColorPicker
						currentText={props.currentText}
						handleOnColorChange={props.handleOnColorChange}
					/>
				</Suspense>
			</Card>
		</Container>
	)
}

const Container = styled.div`
	padding-top: 0.5rem;
	display: flex;
	justify-content: space-around;
`
const Card = styled.div`
	flex: 0 0 auto;
	height: 2.5rem;
	width: 2.5rem;
	background-color: lightgray;
`

export default React.memo(AdditionalProperties)
