'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '../types'

type UserContextValue = {
	user: Partial<User> | null
	setUser: (user: Partial<User> | null) => void
}

const UserContext = createContext<UserContextValue | undefined>(undefined)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<Partial<User> | null>(null)

	useEffect(() => {
		const storedUser = localStorage.getItem('user')
		if (storedUser) {
			try {
				setUser(JSON.parse(storedUser))
			} catch {
				setUser(null)
			}
		}
	}, [])

	useEffect(() => {
		if (user) {
			localStorage.setItem('user', JSON.stringify(user))
		} else {
			localStorage.removeItem('user')
		}
	}, [user])

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	)
}

export const useUserContext = (): UserContextValue => {
	const context = useContext(UserContext)
	if (!context) {
		throw new Error('useUserContext must be used within a UserProvider')
	}
	return context
}
