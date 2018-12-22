import { css } from 'styled-components/macro'

const mainColor = 'rgb(101, 88, 119)'

export const buttonMixin = css`
	padding: 0.5rem 1.25rem;
	display: block;
	font-weight: 600;
	text-align: center;
	border-radius: 4px;
	border: 1px solid gray;
	cursor: pointer;
	height: 2.25rem;
	width: 100%;

	color: ${props => (props.primary ? 'white' : 'rgb(62, 56, 71)')};
	background-color: ${props => (props.primary ? mainColor : 'transparent')};
`
export const hoverActive = css`
	:hover {
		opacity: 0.75;
	}
	:active {
		transform: scale(0.97);
	}
`
