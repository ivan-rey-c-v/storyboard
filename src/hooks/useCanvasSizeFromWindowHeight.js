import { useState } from 'react'

function getAspectRatio(height) {
	// aspect ratio 16:9
	const canvasHeight = height * 0.704
	const canvasWidth = height * 0.396

	return { canvasHeight, canvasWidth }
}

function useCanvasSizeFromWindowHeight() {
	/*setCanvasSize*/
	const [canvasSize] = useState(getAspectRatio(window.innerHeight))

	// const handleResize = useCallback(function() {
	// 	const newSize = getAspectRatio(window.innerHeight)
	// 	setCanvasSize(newSize)
	// }, [])

	// useEffect(function() {
	// 	window.addEventListener('resize', handleResize)

	// 	return () => window.removeEventListener('resize', handleResize)
	// }, [])

	return canvasSize
}

export default useCanvasSizeFromWindowHeight
