'use client'
import { useState, ChangeEvent, FormEvent } from 'react'
import { useAuth } from '../../contexts/authContext'
import { CommentType } from '@/app/lib/definitions'

export default function Form({ slug, onPost }: { slug: string; onPost: () => void }) {
	const { user, token } = useAuth()
	const [comment, setComment] = useState<string>('')
	const [errors, setErrors] = useState<string[]>([])

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setComment(e.target.value)
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/${slug}/comments`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					comment: { body: comment },
				}),
			})

			if (response.ok) {
				setComment('')
				onPost()
			} else {
				const data = await response.json()
				setErrors(data.errors)
			}
		} catch (error) {
			setErrors(['Failed to submit comments'])
		}
	}

	return (
		<>
			{user && (
				<>
					{errors.length > 0 && (
						<ul className='error-messages'>
							{errors.map((error, index) => (
								<li key={index}>{error}</li>
							))}
						</ul>
					)}
					<form className='card comment-form' onSubmit={handleSubmit}>
						<div className='card-block'>
							<textarea
								className='form-control'
								rows={3}
								placeholder='Write a comment...'
								value={comment}
								onChange={handleChange}
							/>
						</div>
						<div className='card-footer'>
							<img src={user?.image ? user.image : 'https://i.imgur.com/hepj9ZS.png'} className='comment-author-img' />
							<button type='submit' className='btn btn-sm btn-primary'>
								Post Comment
							</button>
						</div>
					</form>
				</>
			)}
		</>
	)
}
