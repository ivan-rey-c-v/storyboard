import React from 'react'
import styled from 'styled-components'

import TextInput from './TextInput'
import FontSelect from './FontSelect'
import TextPreviewList from './TextPreviewList'
import AdditionalProperties from './AdditionalProperties'

function TextProperties(props) {
	return (
		<ContainerDiv>
			<Header>
				<p>Texts in {props.id}</p>
			</Header>

			<TextPreviewList textList={props.texts} />

			<div>
				<TextInput />
				<AdditionalProperties />
				<FontSelect />
			</div>
		</ContainerDiv>
	)
}

const ContainerDiv = styled.div`
	padding-top: 0.75rem;
`
const Header = styled.header`
	padding-bottom: 0.5rem;
	font-size: 0.75rem;
	font-weight: 600;
	color: darkgray;
`

export default React.memo(TextProperties)
