import axios, { AxiosError } from 'axios'
import { getCookie } from '../utils'

const http = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000/api',
	timeout: 30000,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
})

http.interceptors.request.use(
	(config: any) => {
		const token = getCookie('auth_token')

		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}

		return config
	},
	(error) => Promise.reject(error)
)

http.interceptors.response.use(
	(response) => response,
	(error: AxiosError) => {
		const statusCode = error.response?.status
		const responseData = error.response?.data as { message?: string }
		const message = responseData?.message?.toLowerCase() || ''

		if (
			statusCode === 401 ||
			statusCode === 403 ||
			message.includes('token expired') ||
			message.includes('token invalid') ||
			message.includes('invalid token')
		) {
			sessionStorage.removeItem('auth_token')
			document.cookie =
				'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

			window.location.href = '/login'
		}

		return Promise.reject(error)
	}
)

export default http
