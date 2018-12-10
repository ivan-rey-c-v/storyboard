import React from 'react'
import styled from 'styled-components'

function ImgSection(props) {
	return (
		<Layout>
			<Img src={window.URL.createObjectURL(props.imgFile)} />
			<ImgDesc>
				<p>{props.imgFile.name}</p>
				<Delete onClick={props.handleDeleteImg}>Delete</Delete>
			</ImgDesc>
		</Layout>
	)
}

const Layout = styled.div`
	display: flex;
`
const Img = styled.img`
	margin: 0;
	height: 3rem;
	width: 3rem;
`
const ImgDesc = styled.div`
	padding: 0.25rem 1rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	font-size: 0.8rem;
	font-weight: 600;
	color: #666070;
`
const Delete = styled.span`
	color: crimson;
	font-size: 90%;
	letter-spacing: 1px;
	cursor: pointer;
`

export default React.memo(ImgSection)
