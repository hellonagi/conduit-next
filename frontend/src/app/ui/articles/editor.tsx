'use client'
import React, { useState, useEffect, FormEvent, ChangeEvent, KeyboardEvent } from 'react'
import { useAuth } from '../../contexts/authContext'
import { useRouter, useParams } from 'next/navigation'

export default function ArticleForm() {
	const { user } = useAuth()

	const [title, setTitle] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const [body, setBody] = useState<string>('')
	const [tags, setTags] = useState<string>('')
	const [tagList, setTagList] = useState<string[]>([])
	const [tagError, setTagError] = useState<string | null>(null)
	const [errors, setErrors] = useState<string[]>([])
	const router = useRouter()
	const { slug } = useParams()
	const baseUrl = 'http://localhost:3000'

	useEffect(() => {
		if (slug) {
			const fetchArticle = async () => {
				try {
					const response = await fetch(`${baseUrl}/api/articles/${slug}`)
					const data = await response.json()
					const { title, description, body, tagList } = data.article
					setTitle(title)
					setDescription(description)
					setBody(body)
					setTagList(tagList)
				} catch (error) {
					setErrors(['Failed to load article'])
				}
			}
			fetchArticle()
		}
	}, [slug])

	useEffect(() => {
		if (!user) {
			router.push('/login')
		}
	}, [user, router])
	if (!user) return null

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (tagList.length === 0) {
			setTagError('Please add at least one tag')
			return
		}

		const url = slug ? `/api/articles/${slug}` : `/api/articles`
		const method = slug ? 'PATCH' : 'POST'

		const token = localStorage.getItem('jwtToken')

		if (!token) {
			router.push('/login')
			return
		}

		try {
			const response = await fetch(`${baseUrl}${url}`, {
				method,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					article: {
						title,
						description,
						body,
						tagList,
					},
				}),
			})

			if (response.ok) {
				router.push('/')
			} else {
				const data = await response.json()
				setErrors(data.errors)
			}
		} catch (error) {
			setErrors(['Failed to submit article'])
		}
	}

	const handleTagInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setTags(e.target.value)
		setTagError(null)
	}

	const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault()
			if (tags.length > 1 && !tagList.includes(tags)) {
				setTagList([...tagList, tags])
				setTags('')
				setTagError(null)
			}
		}
	}

	const handleRemoveTag = (tagToRemove: string) => {
		setTagList(tagList.filter((tag) => tag !== tagToRemove))
	}

	return (
		<div className='editor-page'>
			<div className='container page'>
				<div className='row'>
					<div className='col-md-10 offset-md-1 col-xs-12'>
						{errors.length > 0 && (
							<ul className='error-messages'>
								{errors.map((error, index) => (
									<li key={index}>{error}</li>
								))}
							</ul>
						)}
						{tagError && (
							<ul className='error-messages'>
								<li>{tagError}</li>
							</ul>
						)}

						<form onSubmit={handleSubmit}>
							<fieldset>
								<fieldset className='form-group'>
									<input
										type='text'
										className='form-control form-control-lg'
										placeholder='Article Title'
										value={title}
										onChange={(e) => setTitle(e.target.value)}
									/>
								</fieldset>
								<fieldset className='form-group'>
									<input
										type='text'
										className='form-control'
										placeholder="What's this article about?"
										value={description}
										onChange={(e) => setDescription(e.target.value)}
									/>
								</fieldset>
								<fieldset className='form-group'>
									<textarea
										className='form-control'
										rows={8}
										placeholder='Write your article (in markdown)'
										value={body}
										onChange={(e) => setBody(e.target.value)}
									></textarea>
								</fieldset>
								<fieldset className='form-group'>
									<input
										type='text'
										className='form-control'
										placeholder='Enter tags'
										value={tags}
										onChange={handleTagInputChange}
										onKeyDown={handleTagKeyDown}
									/>
									<div className='tag-list'>
										{tagList.map((tag) => (
											<span className='tag-default tag-pill' key={tag}>
												<i className='ion-close-round' onClick={() => handleRemoveTag(tag)}></i> {tag}
											</span>
										))}
									</div>
								</fieldset>
								<button className='btn btn-lg pull-xs-right btn-primary' type='submit'>
									{slug ? 'Update Article' : 'Publish Article'}
								</button>
							</fieldset>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
