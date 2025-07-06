import { AuthGuard } from '@/shared/components/auth-guard'

export default function Layout({ children }: React.PropsWithChildren) {
	return <AuthGuard>{children}</AuthGuard>
}
