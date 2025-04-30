import React, { useState } from 'react'
import SearchFilters, {
	SearchFilters as SearchFiltersType,
} from '../../components/SearchFilter'
import ProfileCard from '../../components/ProfileCard'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '../../components/Pagination'
import Button from '../../components/ui/Button'

const mockAlumniData = [
	{
		id: '1',
		name: 'Олексій Ковальчук',
		avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
		graduationYear: 2019,
		specialization: 'Програмна інженерія',
		currentPosition: 'Senior Frontend Developer',
		company: 'GlobalTech Solutions',
		location: 'Київ, Україна',
		email: 'oleksii.kovalchuk@example.com',
		skills: ['JavaScript', 'React', 'TypeScript'],
	},
	{
		id: '2',
		name: 'Марія Петренко',
		avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
		graduationYear: 2018,
		specialization: "Комп'ютерні науки",
		currentPosition: 'Data Scientist',
		company: 'DataInsight',
		location: 'Львів, Україна',
		email: 'maria.petrenko@example.com',
		skills: ['Python', 'Data Science', 'Machine Learning'],
	},
	{
		id: '3',
		name: 'Іван Мельник',
		avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
		graduationYear: 2020,
		specialization: 'Кібербезпека',
		currentPosition: 'Security Engineer',
		company: 'CyberShield',
		location: 'Київ, Україна',
		email: 'ivan.melnyk@example.com',
		skills: ['Network Security', 'Penetration Testing', 'Cryptography'],
	},
	{
		id: '4',
		name: 'Софія Коваленко',
		avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
		graduationYear: 2017,
		specialization: 'Програмна інженерія',
		currentPosition: 'Backend Developer',
		company: 'TechSolutions',
		location: 'Одеса, Україна',
		email: 'sofia.kovalenko@example.com',
		skills: ['Java', 'Spring', 'Microservices'],
	},
	{
		id: '5',
		name: 'Максим Шевченко',
		avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
		graduationYear: 2021,
		specialization: 'Штучний інтелект',
		currentPosition: 'ML Engineer',
		company: 'AI Innovations',
		location: 'Харків, Україна',
		email: 'maxim.shevchenko@example.com',
		skills: ['Python', 'TensorFlow', 'Neural Networks'],
	},
	{
		id: '6',
		name: 'Наталія Іванова',
		avatar: 'https://randomuser.me/api/portraits/women/24.jpg',
		graduationYear: 2016,
		specialization: "Комп'ютерні науки",
		currentPosition: 'Project Manager',
		company: 'Digital Solutions',
		location: 'Дніпро, Україна',
		email: 'natalia.ivanova@example.com',
		skills: ['Agile', 'Scrum', 'Project Management'],
	},
	{
		id: '7',
		name: 'Андрій Попов',
		avatar: 'https://randomuser.me/api/portraits/men/62.jpg',
		graduationYear: 2019,
		specialization: 'Програмна інженерія',
		currentPosition: 'DevOps Engineer',
		company: 'Cloud Systems',
		location: 'Київ, Україна',
		email: 'andriy.popov@example.com',
		skills: ['Docker', 'Kubernetes', 'AWS'],
	},
	{
		id: '8',
		name: 'Олена Лисенко',
		avatar: 'https://randomuser.me/api/portraits/women/14.jpg',
		graduationYear: 2020,
		specialization: 'Наука про дані',
		currentPosition: 'BI Analyst',
		company: 'DataViz',
		location: 'Львів, Україна',
		email: 'olena.lysenko@example.com',
		skills: ['SQL', 'Tableau', 'PowerBI'],
	},
]

const SearchAlumni = () => {
	const [searchResults, setSearchResults] = useState(mockAlumniData)
	const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('grid')

	const handleSearch = (filters: SearchFiltersType) => {
		console.log('Search with filters:', filters)
		setSearchResults(mockAlumniData)
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
					<div>
						<p className="text-alumni-gray">
							Знайдено {searchResults.length} випускників
						</p>
					</div>

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

				{displayMode === 'grid' ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
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

				<div className="mt-8 flex justify-center">
					<Pagination>
						<PaginationContent>
							<PaginationPrevious />
							<PaginationItem>
								<PaginationLink href="#">1</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink href="#" isActive>
									2
								</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink href="#">3</PaginationLink>
							</PaginationItem>
							<PaginationEllipsis />
							<PaginationItem>
								<PaginationLink href="#">10</PaginationLink>
							</PaginationItem>
							<PaginationNext />
						</PaginationContent>
					</Pagination>
				</div>
			</div>
		</div>
	)
}

export default SearchAlumni
