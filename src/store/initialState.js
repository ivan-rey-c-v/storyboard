import setInitialState from './setInitialState'
import { getLocalStorage } from '../utils/localStorage'

const stateFromStorage = getLocalStorage()

export default (stateFromStorage ? stateFromStorage : setInitialState())
