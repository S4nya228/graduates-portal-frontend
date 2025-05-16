import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../types'

interface State {
	token: string | null
	user: User | null
	isLoading: boolean
	error: string | null
}

const authSlice = createSlice({
	name: 'auth',
	initialState: <State>{
		token: localStorage.getItem('token'),
		user: null,
		isLoading: false,
		error: null,
	},
	reducers: {
		setToken(state, action: PayloadAction<{ token: string }>) {
			state.token = action.payload.token
			localStorage.setItem('token', action.payload.token)
		},
		setUser(state, action: PayloadAction<User>) {
			state.user = action.payload
			state.isLoading = false
		},
		logout(state) {
			state.token = null
			state.user = null
			state.isLoading = false
			localStorage.removeItem('token')
		},
		setLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload
		},
		setError(state, action: PayloadAction<string | null>) {
			state.error = action.payload
		},
	},
})

export const authActions = authSlice.actions

export default authSlice.reducer
