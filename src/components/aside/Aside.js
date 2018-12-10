import React, { useContext, useCallback } from 'react'
import { AppContext } from '../../store/AppContext'
import styled from 'styled-components'

import Button from '../Button'
import ImgSection from './ImgSection'

function Aside(props) {
	const store = useContext(AppContext)
	console.log(store)
	const imgFile = store.state.stories[0].backgroundImg
	const handleFileChange = useCallback(function(event) {
		const newImgFile = event.target.files[0]
	}, [])

	const handleDeleteImg = useCallback(function(event) {
		// delete imgfile
	}, [])

	return (
		<AsideLayout>
			<TopSection>
				<Title>storyboard</Title>

				<AsideSection>
					<ScreenSelect>
						<option>Story 1</option>
						<option>Story 2</option>
					</ScreenSelect>
				</AsideSection>

				<AsideSection>
					<Par>Background Image</Par>
					{imgFile ? (
						<ImgSection
							imgFile={imgFile}
							handleDeleteImg={handleDeleteImg}
						/>
					) : (
						<Button as="label" htmlFor="file-input">
							Set background
							<HiddenFileInput
								type="file"
								id="file-input"
								name="file-input"
								onChange={handleFileChange}
							/>
						</Button>
					)}
				</AsideSection>

				<AsideSection>
					<Par>Text</Par>
					<Button> Add Text </Button>
				</AsideSection>

				<AsideSection>
					<Par>Additional Graphics</Par>
					<Button> Upload Image </Button>
				</AsideSection>
			</TopSection>

			<BottomSection>
				<Button primary>Download Story</Button>
			</BottomSection>
		</AsideLayout>
	)
}

const AsideLayout = styled.aside`
	height: 100%;
	width: 270px;
	border-right: 1px solid lightgray;
	display: flex;
	flex-direction: column;
`
const TopSection = styled.div`
	display: flex;
	flex-direction: column;
`
const BottomSection = styled.div`
	flex: 1;
	max-height: 500px;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
`
const AsideSection = styled.div`
	padding: 1rem;
	border-bottom: 1px solid lightgray;
`
const ScreenSelect = styled.select`
	width: 100%;
	appearance: none;
	padding: 0.5rem 1rem;
	font-weight: 600;
	color: rgb(62, 56, 71);
	border-radius: 4px;
	border: 1px solid rgb(62, 56, 71);
`
const Title = styled.h1`
	align-self: center;
	color: rebeccapurple;
	font-size: 1.25rem;
	margin-top: 0.5rem;
`
const Par = styled.p`
	padding-bottom: 1rem;
	font-size: 0.9rem;
	color: rgb(62, 56, 71);
	font-weight: 600;
`
const HiddenFileInput = styled.input`
	display: none;
`

export default React.memo(Aside)
