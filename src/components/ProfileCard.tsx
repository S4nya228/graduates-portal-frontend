import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../components/Card'
import Button from './ui/Button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar'
import {
	Briefcase,
	GraduationCap,
	Mail,
	MapPin,
	ExternalLink,
} from 'lucide-react'
import Badge from './ui/Badge'

export interface ProfileCardProps {
	id: string
	name: string
	avatar?: string
	graduationYear: number
	specialization: string
	currentPosition?: string
	company?: string
	location?: string
	email?: string
	skills?: string[]
	profileUrl?: string
	compact?: boolean
}

const ProfileCard: React.FC<ProfileCardProps> = ({
	id,
	name,
	avatar,
	graduationYear,
	specialization,
	currentPosition,
	company,
	location,
	email,
	skills = [],
	profileUrl,
	compact = false,
}) => {
	if (compact) {
		return (
			<Card className="alumni-card overflow-hidden hover:border-[#8b5cf6] transition-colors">
				<div className="flex max-md:flex-col items-start p-4 space-x-4 max-md:gap-5">
					<Avatar className="w-12 h-12">
						<AvatarImage src={avatar} alt={name} />
						<AvatarFallback>{name[0]}</AvatarFallback>
					</Avatar>
					<div className="flex-1 min-w-0">
						<h3 className="font-medium">{name}</h3>
						<div className="text-sm text-[hsl(215.4,16.3%,46.9%)]">
							<div className="flex items-center text-alumni-gray min-w-0">
								<GraduationCap className="min-w-5 min-h-5 mr-1 shrink-0" />
								<span className="">
									{graduationYear}, {specialization}
								</span>
							</div>
							{currentPosition && company && (
								<div className="flex items-center text-alumni-gray mt-1">
									<Briefcase className="min-w-5 min-h-5 mr-1" />
									<span>
										{currentPosition} at {company}
									</span>
								</div>
							)}
						</div>
					</div>
					<Button variant="outline" size="sm" className="shrink-0" asChild>
						<a href={`/profile/${id}`}>Переглянути</a>
					</Button>
				</div>
			</Card>
		)
	}

	return (
		<Card className="alumni-card overflow-hidden">
			<CardHeader className="pb-0">
				<div className="flex flex-wrap flex-col items-center sm:items-start gap-4">
					<Avatar className="w-20 h-20">
						<AvatarImage src={avatar} alt={name} />
						<AvatarFallback className="text-2xl">{name[0]}</AvatarFallback>
					</Avatar>
					<div className="flex-1 min-w-0 text-center sm:text-left max-w-full">
						<h2 className="text-xl font-bold break-words">{name}</h2>

						<div className="flex flex-col space-y-1 mt-2">
							<div className="flex items-center text-alumni-gray">
								<GraduationCap className="mr-2 min-w-5 min-h-5" />
								<span className="break-words text-left">
									Випускник {graduationYear} року, {specialization}
								</span>
							</div>

							{currentPosition && company && (
								<div className="flex items-center text-alumni-gray">
									<Briefcase className="mr-2 min-w-5 min-h-5" />
									<span className="break-words text-left">
										{currentPosition} у {company}
									</span>
								</div>
							)}

							{location && (
								<div className="flex items-center text-alumni-gray">
									<MapPin className="mr-2 min-w-5 min-h-5" />
									<span className="break-words text-left">{location}</span>
								</div>
							)}

							{email && (
								<div className="flex items-center text-alumni-gray">
									<Mail className="mr-2 min-w-5 min-h-5" />
									<a
										href={`mailto:${email}`}
										className="text-alumni-blue hover:underline break-words text-left"
									>
										{email}
									</a>
								</div>
							)}
						</div>
					</div>
				</div>
			</CardHeader>

			<CardContent className="pt-6">
				{skills.length > 0 && (
					<div className="mt-4">
						<h3 className="text-sm font-medium mb-2">Навички</h3>
						<div className="flex flex-wrap gap-2">
							{skills.map((skill, index) => (
								<Badge
									key={index}
									variant="secondary"
									className="bg-alumni-light-gray text-alumni-dark"
								>
									{skill}
								</Badge>
							))}
						</div>
					</div>
				)}
			</CardContent>

			<CardFooter className="flex justify-between pt-2">
				<Button variant="outline" asChild>
					<a href={`/profile/${id}`}>Повний профіль</a>
				</Button>

				{profileUrl && (
					<Button variant="ghost" className="text-alumni-blue" asChild>
						<a href={profileUrl} target="_blank" rel="noopener noreferrer">
							<ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
							Зовнішній профіль
						</a>
					</Button>
				)}
			</CardFooter>
		</Card>
	)
}

export default ProfileCard
