import { css } from 'styled-components'

const mainColor = 'rgb(101, 88, 119)'

export const buttonMixin = css`
	padding: 0.5rem 1.25rem;
	display: block;
	min-width: 100%;
	font-weight: 600;
	text-align: center;
	border-radius: 4px;
	border: 1px solid gray;
	cursor: pointer;

	color: ${props => (props.primary ? 'white' : 'rgb(62, 56, 71)')};
	background-color: ${props => (props.primary ? mainColor : 'transparent')};
`
