import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../components/Card'
import Button from './ui/Button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar'
import { GraduationCap, Mail, MapPin } from 'lucide-react'
import Badge from './ui/Badge'

const ProfileCard: React.FC<ProfileCardProps> = ({
	id,
	avatar,
	name,
	graduated_at,
	specialty,
	city,
	country,
	email,
	skills = [],
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
									{new Date(graduated_at).getFullYear()}, {specialty}
								</span>
							</div>
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
									Випускник {new Date(graduated_at).getFullYear()} року,{' '}
									{specialty}
								</span>
							</div>

							{country && (
								<div className="flex items-center text-alumni-gray">
									<MapPin className="mr-2 min-w-5 min-h-5" />
									<span className="break-words text-left">
										{city}, {country}
									</span>
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
							{skills.map((skill) => (
								<Badge
									key={skill.id}
									variant="secondary"
									className="bg-alumni-light-gray text-alumni-dark"
								>
									{skill.name}
								</Badge>
							))}
						</div>
					</div>
				)}
			</CardContent>

			<CardFooter className="flex justify-between pt-2">
				<Button variant="outline" asChild>
					<a href={`/cabinet/${id}`}>Повний профіль</a>
				</Button>
			</CardFooter>
		</Card>
	)
}

export default ProfileCard
