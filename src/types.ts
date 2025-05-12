interface Skill {
	id?: number
	name: string
}
interface SocialLink {
	id?: number
	platform: 'linkedin' | 'twitter' | 'github'
	link: string
}
export interface Graduation {
	id?: number
	university: string
	faculty: string
	specialty: string
	degree: string
	start_graduation: string
	end_graduation: string
}

export interface User {
	id: number
	name: string
	avatar?: string | null
	email: string
	specialty: string
	graduation_at: string
	email_verified_at: string | null
	password: string
	remember_token: string | null
	about: string | null
	skills: Skill[]
	projects: any[] | null
	experience: any[] | null
	graduation: Graduation[]
	social_links: SocialLink[]
	city: string | null
	country: string | null
	created_at: string
	updated_at: string
}
