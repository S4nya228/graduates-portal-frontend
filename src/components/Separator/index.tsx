import React from 'react'

interface Props {
	children?: React.ReactNode
}

function Separator({ children }: Props) {
	return (
		<div>
			<div>{children}</div>
		</div>
	)
}

export default Separator
