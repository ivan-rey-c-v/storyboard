import React, { useReducer } from 'react'

import initialState from './initialState'
import storeReducer from './storeReducer'

export const AppContext = React.createContext()

export function AppStoreProvider(props) {
	const [state, dispatch] = useReducer(storeReducer, initialState)

	const value = {
		state,
		dispatch
	}

	return (
		<AppContext.Provider value={value}>
			{props.children}
		</AppContext.Provider>
	)
}
