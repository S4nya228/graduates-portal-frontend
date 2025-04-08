export interface User {
	id: number
	name: string
	email: string
	email_verified_at: string | null
	password: string
	remember_token: string | null
	about: string | null
	skills: string[] | null
	projects: any[] | null // можна уточнити тип, якщо знаєш структуру
	experience: any[] | null // те саме
	graduation: {
		graduation_at?: string | null
		degree?: string
		university?: string
	} | null
	social_links: {
		[key: string]: string
	} | null
	city: string | null
	country: string | null
	created_at: string
	updated_at: string
}
