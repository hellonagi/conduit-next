'use client'
import React, { useEffect } from 'react'
import LogoutButton from '../ui/buttons/logout'
import { useRouter } from 'next/navigation'
import { useAuth } from '../contexts/authContext'

export default function Settings() {
	const router = useRouter()
	const { user } = useAuth()

	useEffect(() => {
		if (!user) {
			router.push('/login')
		}
	}, [user, router])
	if (!user) return null

	return (
		<div className='settings-page'>
			<div className='container page'>
				<div className='row'>
					<div className='col-md-6 offset-md-3 col-xs-12'>
						<h1 className='text-xs-center'>Your Settings</h1>

						<ul className='error-messages'>
							<li>That name is required</li>
						</ul>

						<form>
							<fieldset>
								<fieldset className='form-group'>
									<input className='form-control' type='text' placeholder='URL of profile picture' />
								</fieldset>
								<fieldset className='form-group'>
									<input className='form-control form-control-lg' type='text' placeholder='Your Name' />
								</fieldset>
								<fieldset className='form-group'>
									<textarea
										className='form-control form-control-lg'
										rows={8}
										placeholder='Short bio about you'
									></textarea>
								</fieldset>
								<fieldset className='form-group'>
									<input className='form-control form-control-lg' type='text' placeholder='Email' />
								</fieldset>
								<fieldset className='form-group'>
									<input className='form-control form-control-lg' type='password' placeholder='New Password' />
								</fieldset>
								<button className='btn btn-lg btn-primary pull-xs-right'>Update Settings</button>
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
