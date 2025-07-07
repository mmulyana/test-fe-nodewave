'use client'

import { useUserContext } from '../stores/use-context'
import { useRouter } from 'next/navigation'
import { deleteCookie } from '../utils'

export default function Navbar() {
	const { user, setUser } = useUserContext()
	const router = useRouter()

	const handleLogout = () => {
		deleteCookie('auth_token')
		localStorage.removeItem('user')
		setUser(null)
		router.replace('/login')
	}

	return (
		<nav className='w-full px-6 py-4 bg-white flex justify-between items-center'>
			<div className='text-xl font-bold text-gray-800'>📋 Test Nodewave</div>

			{user && (
				<div className='flex items-center gap-4'>
					<div className='text-right'>
						<p className='font-semibold'>{user?.fullName}</p>
						<p className='text-sm text-gray-500'>{user.email}</p>
					</div>
					<button
						onClick={handleLogout}
						className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded'
					>
						Logout
					</button>
				</div>
			)}
		</nav>
	)
}
