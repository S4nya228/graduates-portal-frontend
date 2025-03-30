import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../lib/utils'

export const buttonVariants = cva(
	'inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(252,56%,57%)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
	{
		variants: {
			variant: {
				default:
					'bg-[hsl(252,56%,57%)] text-[hsl(210,40%,98%)] hover:bg-[hsl(252,56%,57%)]/90',
				destructive:
					'bg-[hsl(0,84.2%,60.2%)] text-[hsl(0,84.2%,60.2%)] hover:bg-[hsl(0,84.2%,60.2%)]/90',
				outline:
					'border border-[hsl(214.3,31.8%,91.4%)] bg-[hsl(210,40%,98%)] hover:bg-[#8b5cf6] hover:text-[hsl(210,40%,98%)]',
				secondary:
					'bg-[hsl(230,100%,67%)] text-[hsl(210,40%,98%)] hover:bg-[hsl(230,100%,67%)]/80',
				ghost: 'hover:bg-[hsl(262,80%,50%)] hover:text-[hsl(210,40%,98%)]',
				link: 'text-[hsl(252,56%,57%)] underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		)
	}
)
Button.displayName = 'Button'

export default Button
