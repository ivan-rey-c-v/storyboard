import { css } from 'styled-components/macro'

export const buttonMixin = css`
	padding: 0.5rem 1.25rem;
	display: block;
	font-weight: 600;
	text-align: center;
	border-radius: 4px;
	cursor: pointer;
	height: 2.25rem;
	width: 100%;

	${props =>
		props.primary
			? css`
					border: none;
					color: white;
					background-color: var(--color-secondary);
			  `
			: css`
					border: 1px solid gray;
					color: rgb(62, 56, 71);
					background-color: transparent;
			  `};
`

export const hoverActive = css`
	:hover {
		opacity: 0.75;
	}
	:active {
		transform: scale(0.97);
	}
`
