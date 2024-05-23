'use client'
import React, { useEffect, useState } from 'react'
import LogoutButton from '../ui/buttons/logout'
import { useRouter } from 'next/navigation'
import { useAuth } from '../contexts/authContext'

interface FormData {
	image: string
	username: string
	bio: string
	email: string
	password: string
}

export default function Settings() {
	const router = useRouter()
	const { user, token } = useAuth()

	const [errors, setErrors] = useState<string[]>([])
	const [formData, setFormData] = useState<FormData>({
		image: '',
		username: '',
		bio: '',
		email: '',
		password: '',
	})

	useEffect(() => {
		if (user) {
			setFormData({
				image: user.image || '',
				username: user.username || '',
				bio: user.bio || '',
				email: user.email || '',
				password: '',
			})
		}
	}, [user])

	useEffect(() => {
		if (!user) {
			router.push('/login')
		}
	}, [user, router])
	if (!user) return null

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setFormData({
			...formData,
			[name]: value,
		})
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					user: formData,
				}),
			})

			if (response.ok) {
				router.push(`/profile/${user.username}`)
			} else {
				const data = await response.json()
				setErrors(data.errors)
			}
		} catch (error) {
			setErrors(['Failed to submit article'])
		}
	}

	return (
		<div className='settings-page'>
			<div className='container page'>
				<div className='row'>
					<div className='col-md-6 offset-md-3 col-xs-12'>
						<h1 className='text-xs-center'>Your Settings</h1>

						{errors.length > 0 && (
							<ul className='error-messages'>
								{errors.map((error, index) => (
									<li key={index}>{error}</li>
								))}
							</ul>
						)}

						<form onSubmit={handleSubmit}>
							<fieldset>
								<fieldset className='form-group'>
									<input
										className='form-control'
										type='text'
										placeholder='URL of profile picture'
										name='image'
										value={formData.image}
										onChange={handleChange}
									/>
								</fieldset>
								<fieldset className='form-group'>
									<input
										className='form-control form-control-lg'
										type='text'
										placeholder='Your Name'
										name='username'
										value={formData.username}
										onChange={handleChange}
									/>
								</fieldset>
								<fieldset className='form-group'>
									<textarea
										className='form-control form-control-lg'
										rows={8}
										placeholder='Short bio about you'
										name='bio'
										value={formData.bio}
										onChange={handleChange}
									></textarea>
								</fieldset>
								<fieldset className='form-group'>
									<input
										className='form-control form-control-lg'
										type='text'
										placeholder='Email'
										name='email'
										value={formData.email}
										onChange={handleChange}
									/>
								</fieldset>
								<fieldset className='form-group'>
									<input
										className='form-control form-control-lg'
										type='password'
										placeholder='New Password'
										name='password'
										value={formData.password}
										onChange={handleChange}
									/>
								</fieldset>
								<button type='submit' className='btn btn-lg btn-primary pull-xs-right'>
									Update Settings
								</button>
							</fieldset>
						</form>
						<hr />
						<LogoutButton />
					</div>
				</div>
			</div>
		</div>
	)
}
