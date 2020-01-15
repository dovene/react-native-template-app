// Store/configureStore.js

import { createStore } from 'redux';
import toggleFavoriteReducer from './reducers/FavoriteReducer'

export default createStore(toggleFavoriteReducer)