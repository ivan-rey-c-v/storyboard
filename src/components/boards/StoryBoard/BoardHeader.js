import React from 'react'
import styled from 'styled-components/macro'

function BoardHeader(props) {
	return (
		<Header>
			<div>{props.id} Screen 1</div>
			<div>Editing</div>
			{/* <div className="actions-div">
				{props.currentStoryIndex > 0 && (
					<span className="delete" onClick={handleDeleteBoard}>
						<TrashSVG />
					</span>
				)}
			</div> */}
		</Header>
	)
}

const headerHeight = 24

const Header = styled.header`
	padding: 0 0.5rem;
	height: ${headerHeight}px;
	font-size: 0.9rem;
	font-weight: 600;
	letter-spacing: 1px;

	display: flex;
	justify-content: space-between;
`

export default React.memo(BoardHeader)
