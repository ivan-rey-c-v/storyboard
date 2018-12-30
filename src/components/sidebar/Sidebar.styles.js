import styled from 'styled-components/macro'

import { buttonMixin, hoverActive } from '../../mixins/button'

export const SidebarContainer = styled.aside`
	height: 100%;
	width: 270px;
	min-width: 270px;
	overflow: visible;
	display: flex;
	flex-direction: column;
	border-right: 1px solid lightgray;
	background-color: white;
`
export const SidebarHeader = styled.header`
	font-size: 1rem;
	align-self: center;
	color: rebeccapurple;
	padding: 0.5rem;
`
export const SidebarFooter = styled.footer`
	flex: 1;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
`
export const SidebarSections = styled.div`
	display: flex;
	flex-direction: column;
`
export const SidebarSection = styled.section`
	padding: 1rem;
	border-bottom: 1px solid lightgray;
	display: flex;
	flex-direction: column;
`
export const SectionName = styled.p`
	padding-bottom: 0.5rem;
	font-size: 0.75rem;
	color: rgb(62, 56, 71);
	font-weight: 600;
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
export const Select = styled.select`
	${buttonMixin};
	appearance: none;
	text-align: left;
`
