import React from 'react'
import styled from 'styled-components'

const fonts = [
	'Arial',
	'Calibri',
	'Times New Roman'
	//
	//
	//
]

function FontSelect(props) {
	return (
		<Container>
			<Select>
				{fonts.map((font, index) => (
					<Option key={font}> {font} </Option>
				))}
			</Select>

			<span className="caret-down">{/* caret down */}</span>
		</Container>
	)
}

const Container = styled.div`
	padding-top: 0.5rem;
	position: relative;
`

const Select = styled.select`
	width: 100%;
	height: 1.5rem;
	font-size: 0.9rem;
	padding: 0 0.25rem;
	color: #707070;
`
const Option = styled.option`
	/* styles */
`

export default React.memo(FontSelect)
