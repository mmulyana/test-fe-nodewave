import { AuthGuard } from '@/shared/components/auth-guard'
import Navbar from '@/shared/components/navbar'

export default function Layout({ children }: React.PropsWithChildren) {
	return (
		<AuthGuard redirectIfUnauthenticatedTo='/login'>
			<Navbar />
			<div className='min-h-screen p-6'>{children}</div>
		</AuthGuard>
	)
}
