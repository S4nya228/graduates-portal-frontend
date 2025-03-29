import React from 'react'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '../../components/Card'
import Button from '../../components/Button'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/Avatar'
import { Heart, MessageSquare, Share2 } from 'lucide-react'

export interface NewsCardProps {
	id: string
	author: {
		name: string
		avatar?: string
		role?: string
	}
	date: string
	title?: string
	content: string
	image?: string
	likes: number
	comments: number
	liked?: boolean
}

const NewsCard: React.FC<NewsCardProps> = ({
	id,
	author,
	date,
	title,
	content,
	image,
	likes,
	comments,
	liked = false,
}) => {
	return (
		<Card className="alumni-card overflow-hidden mb-6 animate-fade-in">
			<CardHeader className="pb-3">
				<div className="flex items-center space-x-3">
					<Avatar>
						<AvatarImage src={author.avatar} alt={author.name} />
						<AvatarFallback>{author.name[0]}</AvatarFallback>
					</Avatar>
					<div>
						<div className="font-medium">{author.name}</div>
						<div className="text-sm text-[hsl(215.4,16.3%,46.9%)] flex items-center">
							<span>{date}</span>
							{author.role && (
								<>
									<span className="mx-1">•</span>
									<span className="text-alumni-blue">{author.role}</span>
								</>
							)}
						</div>
					</div>
				</div>
			</CardHeader>

			<CardContent className="pb-4">
				{title && <h3 className="text-xl font-semibold mb-2">{title}</h3>}
				<p className="text-gray-600">{content}</p>
				{image && (
					<div className="mt-4 rounded-md overflow-hidden">
						<img
							src={image}
							alt="Post image"
							className="w-full h-auto max-h-96 object-cover"
						/>
					</div>
				)}
			</CardContent>

			<CardFooter className="pt-3 flex justify-between">
				<div className="flex items-center space-x-6">
					<Button
						variant="ghost"
						size="sm"
						className={`flex items-center gap-1 ${liked ? 'text-red-500' : ''}`}
					>
						<Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
						<span>{likes}</span>
					</Button>
					<Button variant="ghost" size="sm" className="flex items-center gap-1">
						<MessageSquare className="w-5 h-5" />
						<span>{comments}</span>
					</Button>
				</div>
				<Button variant="ghost" size="sm">
					<Share2 className="w-5 h-5" />
				</Button>
			</CardFooter>
		</Card>
	)
}

export default NewsCard
