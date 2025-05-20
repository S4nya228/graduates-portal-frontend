export interface LoginErrors {
	email?: string
	password?: string
}

export const validateLogin = (email: string, password: string): LoginErrors => {
	const errors: LoginErrors = {}

	if (!email) {
		errors.email = 'Будь ласка, введіть email'
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
		errors.email = 'Невірний формат email'
	}

	if (!password) {
		errors.password = 'Будь ласка, введіть пароль'
	} else if (password.length < 8) {
		errors.password = 'Пароль має бути не менше 8 символів'
	}

	return errors
}
