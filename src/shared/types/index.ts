export type ApiResponse<T = unknown> = {
	content: T
	errors: string[]
	message: string
}

export type User = {
	id: string
	email: string
	fullName: string
	role: 'USER' | 'ADMIN' | string
}

export type RegisterContent = {
	user: User
	token: string
}

export type Todo = {
	id: string
	item: string
	isDone: boolean
	userId: string
	createdAt: string
	updatedAt: string
}
