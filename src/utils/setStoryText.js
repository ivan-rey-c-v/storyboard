import generateUniqueID from './generateUniqueID'

export default function() {
	return {
		type: 'text',
		id: generateUniqueID('text'),
		fontFamily: 'Montserrat, sans-serif',
		fontSize: 34,
		fontStyle: 'normal',
		text: 'Hello!',
		align: 'center',
		padding: 10,
		fill: '#38343d',
		opacity: 1,
		hasBoxHighlight: false,
		boxFill: '#ffaf87',
		boxOpacity: 1,
		isBold: false,
		isItalic: false,
		isUnderline: false,
		isStrikethrough: false
	}
}
