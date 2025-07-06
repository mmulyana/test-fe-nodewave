import { useState } from 'react'

import { ApiResponse, RegisterContent } from '@/shared/types'
import http from '@/shared/lib/axios'

type LoginPayload = {
	email: string
	password: string
}

type RegisterPayload = LoginPayload & {
	fullName: string
}

type UseLoginRegisterResult = {
	login: (payload: LoginPayload) => Promise<RegisterContent | boolean>
	register: (payload: RegisterPayload) => Promise<RegisterContent | boolean>
	loading: boolean
	error: string | null
}

export const useLoginRegister = (): UseLoginRegisterResult => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const handleAuthSuccess = (token: string) => {
		document.cookie = `auth_token=${token}; path=/;`
		sessionStorage.setItem('auth_token', token)
	}

	const login = async (
		payload: LoginPayload
	): Promise<RegisterContent | boolean> => {
		setLoading(true)
		setError(null)

		try {
			const response = await http.post<ApiResponse<RegisterContent>>(
				'/login',
				payload
			)
			const token = response.data.content.token

			if (!token) throw new Error('Token not found in response')

			handleAuthSuccess(token)
			return response.data.content
		} catch (err: any) {
			console.error('__LOGIN_ERROR__', err)
			setError(err.response?.data?.message || err.message || 'Login failed')
			return false
		} finally {
			setLoading(false)
		}
	}

	const register = async (
		payload: RegisterPayload
	): Promise<RegisterContent | boolean> => {
		setLoading(true)
		setError(null)

		try {
			const response = await http.post<ApiResponse<RegisterContent>>(
				'/register',
				payload
			)
			const token = response.data.content.token

			if (token) handleAuthSuccess(token)
			return response.data.content
		} catch (err: any) {
			console.error('__REGISTER_ERROR__', err)
			setError(err.response?.data?.message || err.message || 'Register failed')
			return false
		} finally {
			setLoading(false)
		}
	}

	return {
		login,
		register,
		loading,
		error,
	}
}
