import { useRouter } from 'next/navigation'
import { useAuth } from '../../contexts/authContext'

const LogoutButton = () => {
	const { logout } = useAuth()

	return (
		<button onClick={logout} className='btn btn-outline-danger'>
			Or click here to logout.
		</button>
	)
}

export default LogoutButton
