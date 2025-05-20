import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

interface Props {
	children: React.ReactNode
	requireAuth?: boolean
	redirectTo?: string
}

const AuthGate: React.FC<Props> = ({
	children,
	requireAuth = false,
	redirectTo,
}) => {
	const { isAuthenticated } = useAuth()

	if (requireAuth) {
		if (!isAuthenticated) {
			return <Navigate to={redirectTo || '/login'} replace />
		}
	} else {
		if (isAuthenticated) {
			return <Navigate to={redirectTo || '/'} replace />
		}
	}

	return <>{children}</>
}

export default AuthGate
