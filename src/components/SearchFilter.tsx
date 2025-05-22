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
	onSearch: (filters: SearchFiltersResult) => void
}

export interface SearchFilters {
	query: string
	graduationYearStart: number
	graduationYearEnd: number
	specialization: string
	location: string
}

export interface SearchFiltersResult {
	query: string
	graduationYearStart: number
	graduationYearEnd: number
	specialization: string
	city: string
	country: string
}

const currentYear = new Date().getFullYear()
const oldestYear = currentYear - 70

const SearchFilters: React.FC<SearchFiltersProps> = ({ onSearch }) => {
	const [filters, setFilters] = useState<SearchFilters>({
		query: '',
		graduationYearStart: oldestYear,
		graduationYearEnd: currentYear,
		specialization: '',
		location: '',
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

		const [city, country] = filters.location.split(',').map((s) => s.trim())

		onSearch({
			...filters,
			city: city || '',
			country: country || '',
		})
	}

	const resetFilters = () => {
		setFilters({
			query: '',
			graduationYearStart: oldestYear,
			graduationYearEnd: currentYear,
			specialization: '',
			location: '',
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
							placeholder="Пошук за ім'ям"
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

						<div className="flex flex-col gap-2">
							<Label htmlFor="specialization">Спеціалізація</Label>
							<Select
								value={filters.specialization}
								onValueChange={(value) =>
									handleSelectChange('specialization', value)
								}
							>
								<SelectTrigger className="cursor-pointer  h-10 w-full rounded-md border border-[hsl(214.3,31.8%,91.4%)] bg-[hsl(210,40%,98%)] px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[hsl(222.2,84%,4.9%)] placeholder:text-[hsl(215.4,16.3%,46.9%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(252,56%,57%)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
									<SelectValue placeholder="Виберіть спеціалізацію" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">Всі спеціалізації</SelectItem>
									<SelectItem value="Програмна інженерія">
										Програмна інженерія
									</SelectItem>
									<SelectItem value="computer-science">
										Комп'ютерні науки
									</SelectItem>
									<SelectItem value="Штучний інтелект">
										Штучний інтелект
									</SelectItem>
									<SelectItem value="Кібербезпека">Кібербезпека</SelectItem>
									<SelectItem value="Наука про дані">Наука про дані</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label htmlFor="location">Місцезнаходження (місто, країна)</Label>
							<Input
								id="location"
								name="location"
								placeholder="Приклад: Київ, Україна"
								value={filters.location}
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
