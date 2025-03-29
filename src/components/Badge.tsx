import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../lib/utils'

const badgeVariants = cva(
	'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[hsl(252,56%,57%)] focus:ring-offset-2',
	{
		variants: {
			variant: {
				default:
					'border-transparent bg-[hsl(252,56%,57%)] text-[hsl(210,40%,98%)] hover:bg-[hsl(252,56%,57%)]/80',
				secondary:
					'border-transparent bg-[hsl(230,100%,67%)] text-[hsl(210,40%,98%)] hover:bg-[hsl(230,100%,67%)]/80',
				destructive:
					'border-transparent bg-[hsl(0,84.2%,60.2%)] text-[hsl(210,40%,98%)] hover:bg-[hsl(0,84.2%,60.2%)]/80',
				outline: 'text-foreground',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	}
)

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<div className={cn(badgeVariants({ variant }), className)} {...props} />
	)
}

export default Badge
