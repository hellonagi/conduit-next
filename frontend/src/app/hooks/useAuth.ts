import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { UserType } from '../lib/definitions'

export const useAuth = (redirectTo?: string): UserType | null => {
	const [user, setUser] = useState(null)
	const router = useRouter()

	useEffect(() => {
		const authenticate = async () => {
			const token = localStorage.getItem('jwtToken')

			if (!token) {
				if (redirectTo) {
					router.push(redirectTo)
				}
				return
			}

			const response = await fetch('http://localhost:3000/api/user', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			if (!response.ok) {
				if (redirectTo) {
					router.push(redirectTo)
				}
			} else {
				const userData = await response.json()
				setUser(userData.user)
			}
		}

		authenticate()
	}, [router, redirectTo])

	return user
}
