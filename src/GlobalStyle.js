import { createGlobalStyle } from 'styled-components/macro'

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Abril+Fatface|Anton|Bitter|Charm|Happy+Monkey|Libre+Baskerville|Merriweather|Montserrat|Poppins|Quicksand');

html {
	font-family: 'Montserrat', Helvetica, Arial, sans-serif;
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

body {
	background-color: #FDFDFD;
}

:root {
	--color-primary: orange;
	--color-secondary: #2684ff;
	--color-light-hover: #c9e0ff;
}

`

export default GlobalStyle
