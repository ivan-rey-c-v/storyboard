import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
html {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	box-sizing: border-box;
	font-size: 16px;
}

*, *:before, *:after {
	box-sizing: inherit;
}

body, h1, h2, h3, h4, h5, h6, p, ol, ul {
	margin: 0;
	padding: 0;
}

.emoji-mart {
	background-color: white;
	height: 100%;
	width: 100%;
	display: inline-block;
	color: #222427;
	border: 1px solid #d9d9d9;
	border-radius: 5px;
	line-height: 1.15;

	&-bar:first-child {
		border-bottom-width: 1px;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
	}
}



`

export default GlobalStyle
