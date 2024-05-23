'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { UserType } from '../lib/definitions'

interface AuthContextType {
	user: UserType | null
	token: string | null
	register: (
		username: string,
		email: string,
		password: string,
		setErrorMessages: React.Dispatch<React.SetStateAction<string[]>>
	) => Promise<void>
	login: (
		email: string,
		password: string,
		setErrorMessages: React.Dispatch<React.SetStateAction<string[]>>
	) => Promise<void>
	logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<UserType | null>(null)
	const [token, setToken] = useState<string | null>(null)
	// const [errorMessages, setErrorMessages] = useState<string[]>([])
	const router = useRouter()

	useEffect(() => {
		const storedToken = localStorage.getItem('jwtToken')
		if (storedToken) {
			setToken(storedToken)
			fetchUser(storedToken)
		}
	}, [])

	const fetchUser = async (jwtToken: string) => {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
				headers: {
					Authorization: `Bearer ${jwtToken}`,
				},
			})
			const data = await response.json()
			if (response.ok) {
				setUser(data.user)
			} else {
				console.error(data.message)
			}
		} catch (error) {
			console.error('Error fetching user:', error)
		}
	}

	const register = async (
		username: string,
		email: string,
		password: string,
		setErrorMessages: React.Dispatch<React.SetStateAction<string[]>>
	) => {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ user: { username, email, password } }),
			})
			const data = await response.json()
			if (response.ok) {
				setToken(data.user.token)
				setUser(data.user)
				localStorage.setItem('jwtToken', data.user.token)
				router.push(`/profile/${data.user.username}`)
			} else {
				setErrorMessages(data.errors)
			}
		} catch (error) {
			console.error('Failed to sign up:', error)
			setErrorMessages(['Failed to sign up'])
		}
	}

	const login = async (
		email: string,
		password: string,
		setErrorMessages: React.Dispatch<React.SetStateAction<string[]>>
	) => {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ user: { email, password } }),
			})
			const data = await response.json()
			if (response.ok) {
				setToken(data.user.token)
				setUser(data.user)
				localStorage.setItem('jwtToken', data.user.token)
				router.push(`/profile/${data.user.username}`)
			} else {
				setErrorMessages(data.errors)
			}
		} catch (error) {
			console.error('Failed to sign in:', error)
			setErrorMessages(['Failed to sign in'])
		}
	}

	const logout = () => {
		setToken(null)
		setUser(null)
		localStorage.removeItem('jwtToken')
		router.push('/')
	}

	return <AuthContext.Provider value={{ user, token, register, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}
