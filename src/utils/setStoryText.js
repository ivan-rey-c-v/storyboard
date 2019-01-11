import generateUniqueID from './generateUniqueID'

export default function() {
	return {
		type: 'text',
		textID: generateUniqueID('text'),
		fontFamily: 'Montserrat, sans-serif',
		fontSize: 34,
		fontStyle: 'normal',
		text: 'Hello!',
		align: 'center',
		padding: 10,
		fill: '#38343d',
		opacity: 1,
		boxFill: '#ffaf87',
		boxOpacity: 1,
		isBold: false,
		isItalic: false,
		isUnderline: false,
		isStrikethrough: false
	}
}
