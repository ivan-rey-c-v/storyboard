import React, { useContext, useCallback } from 'react'
import { AppContext } from '../../store/AppContext'
import styled from 'styled-components'

import ImgSection from './ImgSection'
import { buttonMixin } from '../../mixins/styledComponent'

const acceptedImages = 'image/x-png,image/gif,image/jpeg'

function Aside(props) {
	const store = useContext(AppContext)
	const { currentStory } = store.state
	const { backgroundImg } = store.state.stories[currentStory]

	const handleFileChange = useCallback(function(event) {
		const file = event.target.files[0]
		// set backgroundImg with image file
		store.dispatch({ type: 'SET_BG_IMG', file })
	}, [])

	const handleDeleteImg = useCallback(function(event) {
		// set backgroundImg as null
		store.dispatch({ type: 'SET_BG_IMG', file: null })
	}, [])

	return (
		<AsideLayout>
			<div className="top-section">
				<h1 className="title">storyboard</h1>

				<div className="inner-container">
					<ScreenSelect>
						<option>Story 1</option>
						<option>Story 2</option>
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
					<p className="name">Text</p>
					<Button> Add Text </Button>
				</div>

				<div className="inner-container">
					<p className="name">Additional Graphics</p>

					<div className="upload-div">
						<Button className="image"> Upload Image </Button>
						<Emoji> ☺️ </Emoji>
					</div>
				</div>
			</div>

			<div className="bottom-section">
				<Button primary>Download Story</Button>
			</div>
		</AsideLayout>
	)
}

const AsideLayout = styled.aside`
	height: 100%;
	width: 270px;
	border-right: 1px solid lightgray;
	display: flex;
	flex-direction: column;

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
				padding-bottom: 1rem;
				font-size: 0.9rem;
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
const Emoji = styled.div`
	${buttonMixin};
	padding: 0;
	padding-bottom: 0.25rem;
	width: 3rem;
	max-height: 2.25rem;
	margin-left: 1rem;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 2rem;

	:hover {
		opacity: 0.75;
	}
	:active {
		transform: scale(0.95);
	}
`

export default React.memo(Aside)
