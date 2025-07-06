'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCookie } from '@/shared/utils'
import { useUserContext } from '../stores/use-context'

type AuthGuardProps = {
	children: React.ReactNode
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
	const { user, setUser } = useUserContext()
	const router = useRouter()

	useEffect(() => {
		const token = getCookie('auth_token')
		const storedUser = localStorage.getItem('user')

		if (!token || !storedUser) {
			router.replace('/login')
			return
		}

		try {
			const parsed = JSON.parse(storedUser)
			if (!user) {
				setUser(parsed)
			}
		} catch {
			router.replace('/login')
		}
	}, [])

	if (!user) return null

	return <>{children}</>
}
