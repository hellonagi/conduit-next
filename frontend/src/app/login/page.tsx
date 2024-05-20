'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [errorMessages, setErrorMessages] = useState<string[]>([])
	const router = useRouter()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			const response = await fetch('http://localhost:3000/api/users/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ user: { email, password } }),
			})

			if (response.ok) {
				const data = await response.json()
				localStorage.setItem('token', data.user.token)
				router.push(`/profile/${data.user.username}`)
			} else {
				const data = await response.json()
				setErrorMessages(data.errors)
			}
		} catch (error) {
			console.error('Failed to sign in:', error)
			setErrorMessages(['Failed to sign in'])
		}
	}

	return (
		<div className='auth-page'>
			<div className='container page'>
				<div className='row'>
					<div className='col-md-6 offset-md-3 col-xs-12'>
						<h1 className='text-xs-center'>Sign in</h1>
						<p className='text-xs-center'>
							<Link href='/register'>Need an account?</Link>
						</p>

						{errorMessages.length > 0 && (
							<ul>
								{errorMessages.map((error, index) => (
									<li key={index} className='error-messages'>
										{error}
									</li>
								))}
							</ul>
						)}

						<form onSubmit={handleSubmit}>
							<fieldset className='form-group'>
								<input
									type='email'
									className='form-control form-control-lg'
									placeholder='Email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</fieldset>
							<fieldset className='form-group'>
								<input
									type='password'
									className='form-control form-control-lg'
									placeholder='Password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</fieldset>
							<button type='submit' className='btn btn-lg btn-primary pull-xs-right'>
								Sign in
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
