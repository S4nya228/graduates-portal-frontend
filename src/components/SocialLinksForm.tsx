import { GithubIcon, LinkedinIcon, Trash2, TwitterIcon } from 'lucide-react'
import { Dispatch, FC } from 'react'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/Select'
import Input from './ui/Input'
import Button from './ui/Button'

export type SocialLink = {
	id?: number
	platform: 'linkedin' | 'twitter' | 'github' // Визначені значення платформи
	link: string
}

interface SocialLinksFormProps {
	socialLinks: SocialLink[]
	setFormData: Dispatch<React.SetStateAction<any>>
}

const socialOptions = [
	{
		label: 'LinkedIn',
		value: 'linkedin',
		icon: <LinkedinIcon className="w-4 h-4" />,
	},
	{
		label: 'Twitter',
		value: 'twitter',
		icon: <TwitterIcon className="w-4 h-4" />,
	},
	{
		label: 'GitHub',
		value: 'github',
		icon: <GithubIcon className="w-4 h-4" />,
	},
]

export const SocialLinksForm: FC<SocialLinksFormProps> = ({
	socialLinks,
	setFormData,
}) => {
	const usedNames = socialLinks.map((s) => s.platform)

	const handleAdd = () => {
		const nextAvailable = socialOptions.find(
			(opt) => !usedNames.includes(opt.value)
		)
		if (!nextAvailable) return

		setFormData((prev: any) => ({
			...prev,
			social_links: [
				...prev.social_links,
				{ platform: nextAvailable.value, link: '' },
			],
		}))
	}

	const handleChange = (
		index: number,
		key: keyof SocialLink,
		value: string
	) => {
		setFormData((prev: any) => {
			const updated = [...prev.social_links]
			updated[index][key] = value
			return { ...prev, social_links: updated }
		})
	}

	const handleDelete = (index: number) => {
		setFormData((prev: any) => {
			const updated = [...prev.social_links]
			updated.splice(index, 1)
			return { ...prev, social_links: updated }
		})
	}

	return (
		<div className="space-y-3">
			{socialLinks.map((link, i) => {
				const availableOptions = socialOptions.filter(
					(opt) => !usedNames.includes(opt.value) || opt.value === link.platform
				)

				return (
					<div key={i} className="flex items-center gap-2">
						<Select
							value={link.platform}
							onValueChange={(value) => handleChange(i, 'platform', value)}
						>
							<SelectTrigger className="w-36">
								<SelectValue placeholder="Мережа" />
							</SelectTrigger>
							<SelectContent>
								{availableOptions.map((opt) => (
									<SelectItem key={opt.value} value={opt.value}>
										<div className="flex items-center gap-2">
											{opt.icon}
											{opt.label}
										</div>
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						<Input
							placeholder="https://..."
							value={link.link}
							onChange={(e) => handleChange(i, 'link', e.target.value)}
							className="flex-1"
						/>

						<Button
							variant="ghost"
							size="icon"
							onClick={() => handleDelete(i)}
							type="button"
						>
							<Trash2 className="w-4 h-4 text-red-500" />
						</Button>
					</div>
				)
			})}

			{socialLinks.length < socialOptions.length && (
				<Button type="button" variant="outline" onClick={handleAdd}>
					Додати соціальну мережу
				</Button>
			)}
		</div>
	)
}
