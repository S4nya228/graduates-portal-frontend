import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from './Card'
import Button from './Button'
import { Avatar, AvatarFallback, AvatarImage } from './Avatar'
import { Heart, MessageSquare } from 'lucide-react'

export interface NewsCardProps {
	post: {
		id: number
		user_id: number
		user_name: string
		title: string
		content: string
		like_count: number
		comment_count: number
		image: string | null
		created_at: string
	}
}

const NewsCard: React.FC<NewsCardProps> = ({ post }) => {
	return (
		<Card className="alumni-card overflow-hidden mb-6 animate-fade-in">
			<CardHeader className="pb-3">
				<div className="flex items-center space-x-3">
					<Avatar>
						<AvatarFallback>{post.user_name[0]}</AvatarFallback>
					</Avatar>
					<div>
						<div className="font-medium">{post.user_name}</div>
						<div className="text-sm text-[hsl(215.4,16.3%,46.9%)] flex items-center">
							<span>{new Date(post.created_at).toLocaleDateString()}</span>
						</div>
					</div>
				</div>
			</CardHeader>

			<CardContent className="pb-4">
				<h3 className="text-xl font-semibold mb-2">{post.title}</h3>
				<p className="text-gray-600">{post.content}</p>
				{post.image && (
					<div className="mt-4 rounded-md overflow-hidden">
						<img
							src={post.image}
							alt="Post image"
							className="w-full h-auto max-h-96 object-cover"
						/>
					</div>
				)}
			</CardContent>

			<CardFooter className="pt-3 flex justify-between">
				<div className="flex items-center space-x-6">
					<Button variant="ghost" size="sm" className="flex items-center gap-1">
						<Heart className="w-5 h-5" />
						<span>{post.like_count}</span>
					</Button>
					<Button variant="ghost" size="sm" className="flex items-center gap-1">
						<MessageSquare className="w-5 h-5" />
						<span>{post.comment_count}</span>
					</Button>
				</div>
			</CardFooter>
		</Card>
	)
}

export default NewsCard
