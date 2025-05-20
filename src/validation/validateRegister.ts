// validationRegister.ts
export interface RegisterErrors {
	name?: string
	email?: string
	graduation_at?: string
	specialty?: string
	password?: string
	password_confirmation?: string
}

export const validateRegister = (formData: {
	name: string
	email: string
	graduation_at: string
	specialty: string
	password: string
	password_confirmation: string
}): RegisterErrors => {
	const errors: RegisterErrors = {}

	if (!formData.name.trim()) {
		errors.name = "Будь ласка, введіть ім'я та прізвище"
	}

	if (!formData.email) {
		errors.email = 'Будь ласка, введіть email'
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
		errors.email = 'Невірний формат email'
	}

	if (!formData.graduation_at) {
		errors.graduation_at = 'Будь ласка, виберіть рік випуску'
	}

	if (!formData.specialty) {
		errors.specialty = 'Будь ласка, виберіть спеціалізацію'
	}

	if (!formData.password) {
		errors.password = 'Будь ласка, введіть пароль'
	} else if (formData.password.length < 8) {
		errors.password = 'Пароль має бути не менше 8 символів'
	}

	if (!formData.password_confirmation) {
		errors.password_confirmation = 'Будь ласка, підтвердіть пароль'
	} else if (formData.password !== formData.password_confirmation) {
		errors.password_confirmation = 'Паролі не співпадають'
	}

	return errors
}
