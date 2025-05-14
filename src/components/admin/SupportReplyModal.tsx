import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/Dialog'
import { Textarea } from '../ui/Textarea'
import Button from '../ui/Button'
import {
	fetchSupportRequestById,
	fetchSupportRequests,
	updateSupportRequest,
} from '../../services/supportService'
import Label from '../ui/Label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/Select'
import { toast } from 'react-toastify'

interface Props {
	open: boolean
	onClose: () => void
	reportId: number | null
	onUpdate: () => void
}

const statusOptions = [
	{ label: 'Нова', value: 'A' },
	{ label: 'В обробці', value: 'B' },
	{ label: 'Схвалено', value: 'C' },
	{ label: 'Відхилено', value: 'D' },
	{ label: 'Повторно відкрито', value: 'F' },
]

const SupportReplyModal: React.FC<Props> = ({
	open,
	onClose,
	reportId,
	onUpdate,
}) => {
	const [loading, setLoading] = useState(true)
	const [data, setData] = useState<any>(null)
	const [reply, setReply] = useState('')
	const [status, setStatus] = useState('')
	const [submitting, setSubmitting] = useState(false)

	useEffect(() => {
		if (reportId && open) {
			setLoading(true)
			fetchSupportRequestById(reportId)
				.then((res) => {
					setData(res)
					setReply(res.reply || '')
					setStatus(res.status)
				})
				.finally(() => setLoading(false))
		}
	}, [reportId, open])

	const handleSubmit = async () => {
		if (!reportId) return
		setSubmitting(true)

		try {
			await updateSupportRequest(reportId, { reply, status: status as any })
			onUpdate()
			onClose()
			toast.success('Відповідь надіслано успішно')
		} catch (err) {
			toast.error('Помилка під час надсилання!')
			console.error('Помилка при оновленні звернення:', err)
		} finally {
			setSubmitting(false)
		}
	}

	if (!open || !reportId) return null

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Відповідь на звернення</DialogTitle>
				</DialogHeader>
				{loading ? (
					<div className="text-center p-4">Завантаження...</div>
				) : (
					<div className="space-y-4">
						<div>
							<strong>Причина:</strong> {data.title}
							<br />
							<strong>Звернення:</strong> {data.appeal}
						</div>
						<div>
							<Label className="text-sm font-medium">Ваша відповідь</Label>
							<Textarea
								value={reply}
								onChange={(e) => setReply(e.target.value)}
							/>
						</div>
						<div>
							<Label className="text-sm font-medium">Статус</Label>
							<Select value={status} onValueChange={setStatus}>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Оберіть статус" />
								</SelectTrigger>
								<SelectContent>
									{statusOptions.map((option) => (
										<SelectItem key={option.value} value={option.value}>
											{option.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<Button onClick={handleSubmit} disabled={submitting}>
							{submitting ? 'Надсилання...' : 'Надіслати'}
						</Button>
					</div>
				)}
			</DialogContent>
		</Dialog>
	)
}

export default SupportReplyModal
