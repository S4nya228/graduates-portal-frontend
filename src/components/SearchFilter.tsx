import React, { useState } from 'react'
import Input from './ui/Input'
import Button from './ui/Button'
import Label from './ui/Label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/Select'
import Slider from './ui/Slider'
import { Search, Filter, X } from 'lucide-react'

export interface SearchFiltersProps {
	onSearch: (filters: SearchFilters) => void
}

export interface SearchFilters {
	query: string
	graduationYearStart: number
	graduationYearEnd: number
	specialization: string
	location: string
	company: string
}

const currentYear = new Date().getFullYear()
const oldestYear = currentYear - 50

const SearchFilters: React.FC<SearchFiltersProps> = ({ onSearch }) => {
	const [filters, setFilters] = useState<SearchFilters>({
		query: '',
		graduationYearStart: oldestYear,
		graduationYearEnd: currentYear,
		specialization: '',
		location: '',
		company: '',
	})

	const [showAdvanced, setShowAdvanced] = useState(false)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFilters((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSelectChange = (name: string, value: string) => {
		setFilters((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleYearRangeChange = (value: number[]) => {
		setFilters((prev) => ({
			...prev,
			graduationYearStart: value[0],
			graduationYearEnd: value[1],
		}))
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		onSearch(filters)
	}

	const resetFilters = () => {
		setFilters({
			query: '',
			graduationYearStart: oldestYear,
			graduationYearEnd: currentYear,
			specialization: '',
			location: '',
			company: '',
		})
	}

	return (
		<div className="bg-white rounded-lg shadow-md p-6 mb-8">
			<form onSubmit={handleSubmit}>
				<div className="flex flex-col md:flex-row gap-4">
					<div className="flex-1 relative">
						<Input
							type="text"
							name="query"
							placeholder="Пошук за ім'ям, компанією чи посадою..."
							value={filters.query}
							onChange={handleChange}
							className="pl-10"
						/>
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[hsl(215.4,16.3%,46.9%)]" />
					</div>

					<Button
						type="submit"
						className="bg-alumni-purple hover:bg-[#8b5cf6]/90"
					>
						Пошук
					</Button>

					<Button
						type="button"
						variant="outline"
						onClick={() => setShowAdvanced(!showAdvanced)}
						className="flex items-center hover:bg-[#8b5cf6]"
					>
						<Filter className="h-4 w-4 mr-2" />
						{showAdvanced ? 'Приховати фільтри' : 'Розширений пошук'}
					</Button>
				</div>

				{showAdvanced && (
					<div className="mt-6 border-t pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						<div className="space-y-2">
							<Label>Рік випуску</Label>
							<div className="pt-6">
								<Slider
									defaultValue={[
										filters.graduationYearStart,
										filters.graduationYearEnd,
									]}
									min={oldestYear}
									max={currentYear}
									step={1}
									onValueChange={handleYearRangeChange}
									className="mb-2"
								/>
								<div className="flex justify-between text-sm text-[hsl(215.4,16.3%,46.9%)]">
									<span>{filters.graduationYearStart}</span>
									<span>{filters.graduationYearEnd}</span>
								</div>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="specialization">Спеціалізація</Label>
							<Select
								value={filters.specialization}
								onValueChange={(value) =>
									handleSelectChange('specialization', value)
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="Виберіть спеціалізацію" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">Всі спеціалізації</SelectItem>
									<SelectItem value="software-engineering">
										Програмна інженерія
									</SelectItem>
									<SelectItem value="computer-science">
										Комп'ютерні науки
									</SelectItem>
									<SelectItem value="ai">Штучний інтелект</SelectItem>
									<SelectItem value="cybersecurity">Кібербезпека</SelectItem>
									<SelectItem value="data-science">Наука про дані</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label htmlFor="location">Місцезнаходження</Label>
							<Input
								id="location"
								name="location"
								placeholder="Місто чи країна"
								value={filters.location}
								onChange={handleChange}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="company">Компанія</Label>
							<Input
								id="company"
								name="company"
								placeholder="Назва компанії"
								value={filters.company}
								onChange={handleChange}
							/>
						</div>

						<div className="col-span-full flex justify-end">
							<Button
								type="button"
								variant="ghost"
								onClick={resetFilters}
								className="flex items-center text-[hsl(215.4,16.3%,46.9%)]"
							>
								<X className="h-4 w-4 mr-2" />
								Скинути фільтри
							</Button>
						</div>
					</div>
				)}
			</form>
		</div>
	)
}

export default SearchFilters
