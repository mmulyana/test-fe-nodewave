'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCookie } from '@/shared/utils'
import { useUserContext } from '../stores/use-context'

type props = {
	children: React.ReactNode
	redirectIfAuthenticatedTo?: string
	redirectIfUnauthenticatedTo?: string
}

export const AuthGuard = ({
	children,
	redirectIfAuthenticatedTo,
	redirectIfUnauthenticatedTo,
}: props) => {
	const { user, setUser } = useUserContext()
	const router = useRouter()

	useEffect(() => {
		const token = getCookie('auth_token')
		const storedUser = localStorage.getItem('user')

		if (!token || !storedUser) {
			if (redirectIfUnauthenticatedTo) {
				router.replace(redirectIfUnauthenticatedTo)
			}
			return
		}

		try {
			const parsed = JSON.parse(storedUser)

			if (!user) {
				setUser(parsed)
			}

			if (redirectIfAuthenticatedTo) {
				router.replace(redirectIfAuthenticatedTo)
			}
		} catch {
			if (redirectIfUnauthenticatedTo) {
				router.replace(redirectIfUnauthenticatedTo)
			}
		}
	}, [])

	if (!user && !redirectIfAuthenticatedTo) return null

	return <>{children}</>
}
