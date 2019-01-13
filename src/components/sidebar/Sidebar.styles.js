import styled from 'styled-components/macro'

import { buttonMixin, hoverActive } from '../../mixins/button'

const sidebarWidth = 350

export const SidebarContainer = styled.aside`
	min-height: 100%;
	width: ${sidebarWidth}px;
	min-width: ${sidebarWidth}px;
	overflow: visible;
	display: flex;
	flex-direction: column;
	background-color: white;
`
export const SidebarHeader = styled.header`
	width: 100%;
	font-size: 1rem;
	text-align: center;
	color: var(--color-primary);
	padding: 0.5rem;
	border-right: 1px solid lightgray;
`
export const SidebarFooter = styled.footer`
	flex: 1;
	padding: 1rem 1.5rem;
	min-height: calc(2.25rem + 2rem);
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	border-right: 1px solid lightgray;
`
export const SidebarSections = styled.div`
	display: flex;
	flex-direction: column;
	border-right: 1px solid lightgray;
`
export const SidebarSection = styled.section`
	padding: 1rem 1.5rem;
	border-bottom: 1px solid lightgray;
	display: flex;
	flex-direction: column;
`
export const SectionName = styled.p`
	padding-bottom: 0.5rem;
	font-size: 0.85rem;
	font-weight: 600;
	letter-spacing: 1px;
	color: rgb(62, 56, 71);
`

export const Button = styled.div.attrs({
	tabIndex: 0
})`
	${buttonMixin};
	${hoverActive};
`
export const HiddenEl = styled.div`
	display: none;
`

// used in components: Color and SetBackground
export const RowPanel = styled.div`
	margin-top: 0.75rem;
	display: flex;
	align-items: center;
	height: 38px;
	position: relative;
`
export const RowPanelName = styled.p`
	flex-grow: 1;
	font-size: 0.75rem;
	font-weight: 600;
	padding: 0 0.5rem;
	color: #666666;
	max-width: 141px;
`
export const RowPanelInput = styled.div`
	height: 100%;
	width: 6rem;
	font-size: 0.9rem;
	font-weight: 600;

	color: gray;
	border-radius: 4px;
	border: 1px solid hsl(0, 0%, 80%);

	display: flex;
	align-items: center;
	justify-content: center;
`
export const RowPanelBox = styled.div`
	margin-left: 1rem;
	height: 100%;
	width: 3rem;

	border-radius: 4px;
	border: 1px solid hsl(0, 0%, 80%);
	background-color: ${props => props.color};
`
