import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { UserType } from '../lib/definitions'

export const useAuth = (): UserType | null => {
	const [user, setUser] = useState(null)
	const router = useRouter()

	useEffect(() => {
		const authenticate = async () => {
			const token = localStorage.getItem('token')

			if (!token) {
				router.push('/login')
				return
			}

			const response = await fetch('http://localhost:3000/api/user', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			if (!response.ok) {
				router.push('/login')
			} else {
				const userData = await response.json()
				setUser(userData.user)
			}
		}

		authenticate()
	}, [router])

	return user
}
