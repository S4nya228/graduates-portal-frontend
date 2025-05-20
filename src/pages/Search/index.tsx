import React, { useState, useEffect } from 'react'
import SearchFilters, {
	SearchFiltersResult,
	SearchFilters as SearchFiltersType,
} from '../../components/SearchFilter'
import ProfileCard from '../../components/ProfileCard'
import Button from '../../components/ui/Button'
import { searchUsers } from '../../services/searchService'
import type { SearchParams } from '../../services/searchService'

interface Skills {
	id: number
	name: string
}
interface Alumni {
	id: number
	name: string
	email: string
	city?: string | null
	country?: string | null
	avatar?: string
	graduated_at: string
	specialty: string
	skills: Skills[]
}

const SearchAlumni = () => {
	const [searchResults, setSearchResults] = useState<Alumni[]>([])
	const [meta, setMeta] = useState<any>(null)
	const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('grid')
	const [filters, setFilters] = useState<SearchParams>({})
	const [page, setPage] = useState<number>(1)

	const fetchData = async (filters: SearchParams, page: number) => {
		try {
			const response = await searchUsers({ ...filters, page })
			setSearchResults(response.data)
			setMeta(response.meta)
		} catch (error) {
			console.error('Помилка при пошуку:', error)
		}
	}

	useEffect(() => {
		fetchData(filters, page)
	}, [filters, page])

	const handleSearch = (filtersResult: SearchFiltersResult) => {
		const apiFilters: SearchParams = {
			search: filtersResult.query || undefined,
			graduation_start: filtersResult.graduationYearStart
				? `${filtersResult.graduationYearStart}-01-01`
				: undefined,
			graduation_end: filtersResult.graduationYearEnd
				? `${filtersResult.graduationYearEnd}-12-31`
				: undefined,
			speciality:
				filtersResult.specialization && filtersResult.specialization !== 'all'
					? filtersResult.specialization
					: undefined,
			city: filtersResult.city || undefined,
			country: filtersResult.country || undefined,
		}
		setFilters(apiFilters)
		setPage(1)
	}

	const handlePageChange = (newPage: number) => {
		if (newPage !== page) {
			setPage(newPage)
		}
	}

	return (
		<div className="min-h-screen bg-alumni-light-gray">
			<div className="bg-alumni-purple text-white py-16 px-4">
				<div className="container mx-auto text-center">
					<h1 className="text-3xl font-bold mb-4">Пошук випускників</h1>
					<p className="max-w-2xl mx-auto">
						Знайдіть та зв'яжіться з випускниками факультету ІТ. Фільтруйте за
						роком випуску, спеціалізацією, компанією та іншими параметрами.
					</p>
				</div>
			</div>

			<div className="container mx-auto px-4 py-8">
				<SearchFilters onSearch={handleSearch} />

				<div className="flex justify-between items-center mb-6">
					<p className="text-alumni-gray">
						Знайдено {meta?.total ?? 0} випускників
					</p>

					<div className="flex items-center space-x-2">
						<Button
							variant={displayMode === 'grid' ? 'default' : 'outline'}
							size="sm"
							onClick={() => setDisplayMode('grid')}
							className={
								displayMode === 'grid'
									? 'bg-alumni-purple hover:bg-[#8b5cf6]/90'
									: ''
							}
						>
							Плитка
						</Button>
						<Button
							variant={displayMode === 'list' ? 'default' : 'outline'}
							size="sm"
							onClick={() => setDisplayMode('list')}
							className={
								displayMode === 'list'
									? 'bg-alumni-purple hover:bg-[#8b5cf6]/90'
									: ''
							}
						>
							Список
						</Button>
					</div>
				</div>

				{searchResults.length === 0 ? (
					<div className="flex items-center justify-center h-[60vh] w-full">
						<div className="text-center text-gray-500">
							<p className="text-2xl font-semibold mb-2">Нічого не знайдено</p>
							<p className="text-base">
								Спробуйте змінити фільтри або перевірте інші параметри пошуку.
							</p>
						</div>
					</div>
				) : displayMode === 'grid' ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{searchResults.map((alumni) => (
							<ProfileCard key={alumni.id} {...alumni} />
						))}
					</div>
				) : (
					<div className="space-y-4">
						{searchResults.map((alumni) => (
							<ProfileCard key={alumni.id} {...alumni} compact />
						))}
					</div>
				)}
				{searchResults.length > 0 && meta && (
					<div className="mt-8 flex justify-center space-x-2">
						{Array.from({ length: meta.last_page }, (_, i) => i + 1).map(
							(p) => (
								<Button
									key={p}
									size="sm"
									variant={p === meta.current_page ? 'default' : 'outline'}
									onClick={() => handlePageChange(p)}
								>
									{p}
								</Button>
							)
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default SearchAlumni
