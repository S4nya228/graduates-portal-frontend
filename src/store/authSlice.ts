import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../types'

interface State {
	token: string | null
	user: User | null
	isLoading: boolean
}

const authSlice = createSlice({
	name: 'auth',
	initialState: <State>{
		token: localStorage.getItem('token'),
		user: null,
		isLoading: true,
	},
	reducers: {
		setToken(state, action: PayloadAction<{ token: string }>) {
			state.token = action.payload.token
			localStorage.setItem('token', action.payload.token)
		},
		setUser(state, action: PayloadAction<User>) {
			state.user = action.payload
		},
		logout(state) {
			state.token = null
			state.user = null
			localStorage.removeItem('token')
		},
		setLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload
		},
	},
})

export const authActions = authSlice.actions

export default authSlice.reducer
