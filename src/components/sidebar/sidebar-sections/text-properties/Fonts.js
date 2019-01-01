import React, { useCallback } from 'react'
import styled from 'styled-components/macro'
import Select from 'react-select'

const fontsOption = [
	{ value: 'Arial', label: 'Arial' },
	{ value: 'Calibri', label: 'Calibri' },
	{ value: 'Times New Roman', label: 'Times New Roman' }
]

const fontSizesOption = [
	{ value: 24, label: 'S' },
	{ value: 34, label: 'M' },
	{ value: 44, label: 'L' },
	{ value: 54, label: 'XL' }
]

function FontAndColor(props) {
	const { currentText, storeDispatch } = props

	const preventPropagation = useCallback(function(event) {
		event.stopPropagation()
		event.preventDefault()
	}, [])

	const handleSelectFont = useCallback(function(option, action) {
		const properties = {
			[action.name]: option.value
		}
		storeDispatch({ type: 'MODIFY_TEXT', properties })
	}, [])

	console.log({ currentText })

	return (
		<Container>
			<FontSelectDiv onClick={preventPropagation}>
				<StyledSelect
					name="fontFamily"
					onChange={handleSelectFont}
					value={{
						value: currentText.fontFamily,
						label: currentText.fontFamily
					}}
					options={fontsOption}
				/>
			</FontSelectDiv>

			<SizeSelectDiv onClick={preventPropagation}>
				<StyledSelect
					name="fontSize"
					onChange={handleSelectFont}
					value={fontSizesOption.filter(
						size => size.value === currentText.fontSize
					)}
					options={fontSizesOption}
				/>
			</SizeSelectDiv>
		</Container>
	)
}

const Container = styled.div`
	padding-top: 0.5rem;
	position: relative;
	display: flex;
	align-items: center;
`
const FontSelectDiv = styled.div`
	width: 100%;
`
const StyledSelect = styled(Select)`
	width: 100%;
	height: 2rem;
	font-size: 1rem;
	font-family: ${props => `${props.font}`};
`
const SizeSelectDiv = styled.div`
	margin-left: 0.5rem;
	width: 100px;
	display: flex;
`

export default React.memo(FontAndColor)
