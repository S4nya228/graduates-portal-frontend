import Button from './ui/Button'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from './ui/Dialog'

interface ConfirmDialogProps {
	open: boolean
	title?: string
	description?: string
	onConfirm: () => void
	onCancel: () => void
	confirmText?: string
	cancelText?: string
	loading?: boolean
}

const ConfirmDialog = ({
	open,
	title = 'Підтвердити дію',
	description = 'Ви впевнені, що хочете продовжити?',
	onConfirm,
	onCancel,
	confirmText = 'Так',
	cancelText = 'Скасувати',
	loading = false,
}: ConfirmDialogProps) => {
	return (
		<Dialog open={open} onOpenChange={onCancel}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				<p className="text-sm text-muted-foreground mb-4">{description}</p>
				<DialogFooter>
					<Button variant="ghost" onClick={onCancel} disabled={loading}>
						{cancelText}
					</Button>
					<Button
						className="bg-red-500 hover:bg-red-400"
						onClick={onConfirm}
						disabled={loading}
					>
						{loading ? 'Видалення...' : confirmText}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default ConfirmDialog
