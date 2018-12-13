import React, { useContext, useCallback } from 'react'
import { AppContext } from '../../store/AppContext'
import styled from 'styled-components'
import FileSaver from 'file-saver'
import JSZip from 'jszip'

import { buttonMixin } from '../../mixins/styledComponent'
import ImgSection from './ImgSection'
import Emojies from './Emojies'
import TextProperties from './text-properties/TextProperties'

const acceptedImages = 'image/x-png,image/gif,image/jpeg'

function Aside(props) {
	const store = useContext(AppContext)
	const { currentStoryIndex } = store.state
	const currentStory = store.state.stories[currentStoryIndex]
	const { backgroundImg, texts, id } = currentStory

	const handleFileChange = useCallback(function(event) {
		event.stopPropagation()
		const file = event.target.files[0]
		// set backgroundImg with image file
		store.dispatch({ type: 'SET_BG_IMG', file })
	}, [])

	const handleDeleteImg = useCallback(function(event) {
		// set backgroundImg as null
		store.dispatch({ type: 'SET_BG_IMG', file: null })
	}, [])

	const handleAddText = useCallback(function(event) {
		store.dispatch({ type: 'ADD_TEXT' })
	}, [])

	const handleDownload = useCallback(function(event) {
		event.stopPropagation()
		// remove Transformer selection
		store.dispatch({ type: 'SET_SELECTED_SHAPE_NAME', name: '' })

		const canvasses = [...document.getElementsByTagName('canvas')]

		const zip = new JSZip()

		canvasses.forEach((canvas, index) => {
			const { height, width } = canvas
			const aspectRatio = width / height

			//create a new canvas
			const newCanvas = document.createElement('canvas')
			const context = newCanvas.getContext('2d')

			//set dimensions
			const newHeight = 1980
			const newWidth = newHeight * aspectRatio
			newCanvas.height = newHeight
			newCanvas.width = newWidth

			//apply the old canvas to the new one
			context.drawImage(canvas, 0, 0, newWidth, newHeight)

			const src = newCanvas.toDataURL()
			zip.file(
				`storyboard${index + 1}.png`,
				src
				// { base64: true}
			)
		})

		zip.generateAsync({ type: 'blob' }).then(function(content) {
			console.log({ content })
			FileSaver.saveAs(content, 'storyboard.zip')
		})
	}, [])

	const handleStorySelect = useCallback(function(event) {
		const { value } = event.target
		store.dispatch({ type: 'SET_STORY_BOARD', index: Number(value) })
	}, [])

	return (
		<AsideLayout>
			<div className="top-section">
				<h1 className="title">storyboard</h1>

				<div className="inner-container">
					<ScreenSelect onChange={handleStorySelect}>
						{[0, 1, 2].map(val => (
							<option
								key={`story-${val + 1}`}
								value={val}
								selected={currentStoryIndex === val}
							>
								{`Story ${val + 1}`}
							</option>
						))}
					</ScreenSelect>
				</div>

				<div className="inner-container">
					<p className="name">Background Image</p>
					{backgroundImg ? (
						<ImgSection
							imgFile={backgroundImg}
							handleDeleteImg={handleDeleteImg}
						/>
					) : (
						<Button as="label" htmlFor="file-input">
							Set background
							<input
								className="hidden"
								type="file"
								id="file-input"
								name="file-input"
								onChange={handleFileChange}
								accept={acceptedImages}
							/>
						</Button>
					)}
				</div>

				<div className="inner-container">
					<p className="name">Additional Graphics</p>

					<div className="upload-div">
						<Button className="image"> Upload Image </Button>

						<Emojies dispatch={store.dispatch} />
					</div>
				</div>

				<div className="inner-container">
					<p className="name">Text</p>
					<Button onClick={handleAddText}> Add Text </Button>

					{texts.length > 0 && (
						<TextProperties texts={texts} id={id} />
					)}
				</div>
			</div>

			<div className="bottom-section">
				<Button primary onClick={handleDownload}>
					Download Story
				</Button>
			</div>
		</AsideLayout>
	)
}

const AsideLayout = styled.aside`
	height: 100%;
	width: 270px;
	min-width: 270px;
	border-right: 1px solid lightgray;
	display: flex;
	flex-direction: column;
	overflow-y: auto;

	.title {
		align-self: center;
		color: rebeccapurple;
		font-size: 1.25rem;
		margin-top: 0.5rem;
	}

	.top-section {
		display: flex;
		flex-direction: column;

		.inner-container {
			padding: 1rem;
			border-bottom: 1px solid lightgray;
			display: flex;
			flex-direction: column;

			.name {
				padding-bottom: 0.5rem;
				font-size: 0.75rem;
				color: rgb(62, 56, 71);
				font-weight: 600;
			}
		}
	}

	.bottom-section {
		flex: 1;
		max-height: 500px;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.hidden {
		display: none;
	}

	.upload-div {
		display: flex;
		max-width: 100%;

		.image {
			flex: 1;
		}
	}

	.emoji-container {
	}
`

const ScreenSelect = styled.select`
	${buttonMixin};
	appearance: none;
	text-align: left;
`
const Button = styled.div`
	${buttonMixin};

	:hover {
		opacity: 0.75;
	}
	:active {
		transform: scale(0.95);
	}
`

export default React.memo(Aside)
