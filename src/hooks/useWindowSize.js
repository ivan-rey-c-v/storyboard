import { useEffect, useState, useCallback } from 'react'

function useWindowSize() {
	const [height, setHeight] = useState(window.innerHeight)
	const [width, setWidth] = useState(window.innerWidth)

	const handleResize = useCallback(function() {
		setHeight(window.innerHeight)
		setWidth(window.innerWidth)
	}, [])

	useEffect(function() {
		window.addEventListener('resize', handleResize)

		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return {
		height,
		width
	}
}

export default useWindowSize
