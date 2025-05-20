import * as RadixDialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import clsx from 'clsx'

export const Dialog = RadixDialog.Root
export const DialogTrigger = RadixDialog.Trigger
export const DialogPortal = RadixDialog.Portal
export const DialogOverlay = ({
	className,
	...props
}: RadixDialog.DialogOverlayProps) => (
	<RadixDialog.Overlay
		className={clsx(
			'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity',
			className
		)}
		{...props}
	/>
)

export const DialogContent = ({
	className,
	children,
	...props
}: RadixDialog.DialogContentProps) => (
	<DialogPortal>
		<DialogOverlay />
		<RadixDialog.Content
			className={clsx(
				'fixed z-50 left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-lg focus:outline-none',
				className
			)}
			{...props}
		>
			{children}
			<RadixDialog.Close className="absolute top-4 right-4 text-muted-foreground hover:text-black">
				<X className="h-5 w-5 cursor-pointer" />
			</RadixDialog.Close>
		</RadixDialog.Content>
	</DialogPortal>
)

export const DialogHeader = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={clsx('mb-4', className)} {...props} />
)

export const DialogTitle = ({
	className,
	...props
}: RadixDialog.DialogTitleProps) => (
	<RadixDialog.Title
		className={clsx('text-lg font-semibold', className)}
		{...props}
	/>
)

export const DialogFooter = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={clsx('mt-4 flex justify-end gap-2', className)} {...props} />
)
