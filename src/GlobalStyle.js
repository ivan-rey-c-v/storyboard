import { createGlobalStyle } from 'styled-components/macro'

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

body {
	background-color: #FDFDFD;
}

:root {
	--color-primary: orange;
	--color-secondary: #2684ff;
}

`

export default GlobalStyle
