import React from 'react'

interface Props {
	children: React.ReactNode
}

function FormTitle({ children }: Props) {
	return <h1>{children}</h1>
}

export default FormTitle
