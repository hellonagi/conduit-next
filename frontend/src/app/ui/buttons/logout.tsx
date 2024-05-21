import { useRouter } from 'next/navigation'
import { useAuth } from '../../contexts/authContext'

const LogoutButton = () => {
	const { logout } = useAuth()
	// const router = useRouter()

	// const handleLogout = () => {
	// 	setToken(null)
	// 	setUser(null)
	// 	localStorage.removeItem('jwtToken')
	// 	router.push('/login')
	// }

	return (
		<button onClick={logout} className='btn btn-outline-danger'>
			Or click here to logout.
		</button>
	)
}

export default LogoutButton
