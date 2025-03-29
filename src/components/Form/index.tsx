import React from 'react'

interface Props {
	children: React.ReactNode
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

function Form({ children, onSubmit }: Props) {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		onSubmit(e)
	}

	return <form onSubmit={handleSubmit}>{children}</form>
}

export default Form
