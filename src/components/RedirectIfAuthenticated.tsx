import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

interface Props {
	children: React.ReactNode
}

const RedirectIfAuthenticated: React.FC<Props> = ({ children }) => {
	const { isAuthenticated } = useAuth()

	if (isAuthenticated) {
		return <Navigate to="/" replace />
	}

	return children
}

export default RedirectIfAuthenticated
