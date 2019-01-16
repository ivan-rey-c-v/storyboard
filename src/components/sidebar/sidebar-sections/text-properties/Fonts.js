import React, { useCallback } from 'react'
import styled from 'styled-components/macro'
import Select from 'react-select'

import fontOptions from '../../../../utils/fontOptions'

const fontSizeOptions = [
	{ value: 24, label: 'Small' },
	{ value: 34, label: 'Medium' },
	{ value: 44, label: 'Large' },
	{ value: 54, label: 'X-Large' }
]

const fontOptionStyle = {
	option: (styles, { data }) => {
		return { ...styles, fontFamily: data.value }
	}
}

function FontAndColor(props) {
	const { currentText, storeDispatch } = props

	const handleSelectFont = useCallback(function(option, action) {
		const properties = {
			[action.name]: option.value
		}
		storeDispatch({ type: 'MODIFY_TEXT', properties })
	}, [])

	const [fontValue] = fontOptions.filter(
		font => font.value === currentText.fontFamily
	)

	return (
		<Container>
			<FontSelectDiv>
				<StyledSelect
					name="fontFamily"
					onChange={handleSelectFont}
					value={fontValue}
					options={fontOptions}
					styles={fontOptionStyle}
				/>
			</FontSelectDiv>

			<SizeSelectDiv>
				<StyledSelect
					name="fontSize"
					onChange={handleSelectFont}
					value={fontSizeOptions.filter(
						option => option.value === currentText.fontSize
					)}
					options={fontSizeOptions}
				/>
			</SizeSelectDiv>
		</Container>
	)
}

const Container = styled.div`
	margin-top: 0.75rem;
	margin-bottom: 0.5rem;
	position: relative;
	display: flex;
	align-items: center;
	min-height: 38px;
`
const FontSelectDiv = styled.div`
	width: 100%;
`
const StyledSelect = styled(Select)`
	width: 100%;
	height: 2rem;
	font-family: ${props => `${props.font}`};
`
const SizeSelectDiv = styled.div`
	margin-left: 1rem;
	text-align: center;
	min-width: 112px;
	display: flex;
	font-size: 1rem;
`

export default React.memo(FontAndColor)
