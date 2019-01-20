import React, { lazy, Suspense } from 'react'
import styled from 'styled-components/macro'
import { SidebarSections } from '../Sidebar.styles'

const DownloadFooter = lazy(_ => import('../DownloadFooter'))
const SetBackground = lazy(_ => import('./SetBackground'))
const AdditionalGraphics = lazy(_ => import('./AdditionalGraphics'))
const AddText = lazy(_ => import('./AddText'))

function SidebarSectionsComponent(props) {
	const {
		currentStory,
		currentText,
		storeDispatch,
		storyIndex,
		colorPickerName
	} = props
	return (
		<>
			<SidebarSections>
				<Suspense fallback={<FallbackDiv />}>
					<SetBackground
						backgroundImage={currentStory.backgroundImage}
						storeDispatch={storeDispatch}
						storyIndex={storyIndex}
						colorPickerName={colorPickerName}
					/>
				</Suspense>

				<Suspense fallback={<FallbackDiv />}>
					<AdditionalGraphics storeDispatch={storeDispatch} />
				</Suspense>

				<Suspense fallback={<FallbackDiv />}>
					<AddText
						storeDispatch={storeDispatch}
						currentText={currentText}
						colorPickerName={colorPickerName}
					/>
				</Suspense>
			</SidebarSections>

			<Suspense fallback={<FallbackDiv />}>
				<DownloadFooter storeDispatch={storeDispatch} />
			</Suspense>
		</>
	)
}

const FallbackDiv = styled.div`
	flex: 1;
	border-right: 1px solid lightgray;
`

export default React.memo(SidebarSectionsComponent)
