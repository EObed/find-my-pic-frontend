// Shared by client forms and route handlers so both sides enforce the same rules.

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
export const MIN_PASSWORD_LENGTH = 6

export type FieldErrors = Record<string, string>

export function isValidEmail(email: string): boolean {
    return EMAIL_REGEX.test(email)
}

export function validateLogin({ email, password }: { email: string; password: string }): FieldErrors {
    const errors: FieldErrors = {}
    if (!isValidEmail(email)) errors.email = 'Please enter a valid email address'
    if (password.length < MIN_PASSWORD_LENGTH) {
        errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`
    }
    return errors
}

export function validateSignup(input: {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
}): FieldErrors {
    const errors: FieldErrors = {}
    if (!input.firstName.trim()) errors.firstName = 'First name is required'
    if (!input.lastName.trim()) errors.lastName = 'Last name is required'
    Object.assign(errors, validateLogin(input))
    if (input.confirmPassword !== input.password) errors.confirmPassword = 'Passwords do not match'
    return errors
}
