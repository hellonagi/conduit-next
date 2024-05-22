'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { fetchArticles } from '../../lib/data'
import { useRouter } from 'next/navigation'
import { formatDate } from '../../lib/date'
import { ArticleType } from '../../lib/definitions'
import { useAuth } from '../../contexts/authContext'

export default function ArticleMenu({ article }: { article: ArticleType }) {
	const router = useRouter()
	const { user, token } = useAuth()
	const isMyArticle = user?.username === article.author.username
	const [isFollowing, setIsFollowing] = useState(article.author.following)

	useEffect(() => {
		setIsFollowing(article.author.following)
	}, [article])

	const handleEdit = () => {
		router.push(`/editor/${article.slug}`)
	}

	const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		const confirmed = window.confirm('Are you sure you want to delete this article?')
		if (confirmed) {
			try {
				const response = await fetch(`http://localhost:3000/api/articles/${article.slug}`, {
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})

				if (response.ok) {
					router.push('/')
				} else {
					console.error('Failed to delete the article')
				}
			} catch (error) {
				console.error('An error occurred while deleting the article', error)
			}
		}
	}

	const handleFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()

		try {
			const response = await fetch(`http://localhost:3000/api/profiles/${article.author.username}/follow`, {
				method: isFollowing ? 'DELETE' : 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			if (response.ok) {
				setIsFollowing(!isFollowing)
				if (isFollowing) {
					console.log('Unfollowed the user')
				} else {
					console.log('Followed the user')
				}
			} else {
				console.error('Failed to follow/unfollow the user')
			}
		} catch (error) {
			console.error('An error occurred while following/unfollowing the user', error)
		}
	}

	return (
		<div className='article-meta'>
			<Link href={`/profile/${article.author.username}`}>
				<img src={article.author.image ? article.author.image : 'https://i.imgur.com/hepj9ZS.png'} />
			</Link>
			<div className='info'>
				<Link className='author' href={`/profile/${article.author.username}`}>
					{article.author.username}
				</Link>
				<span className='date'>{formatDate(article.createdAt)}</span>
			</div>
			{user && (
				<>
					{!isMyArticle && (
						<>
							<button className='btn btn-sm btn-outline-secondary' onClick={handleFollow}>
								<i className='ion-plus-round'></i>
								&nbsp; {isFollowing ? 'Unfollow' : 'Follow'} {article.author.username}
							</button>
							&nbsp;&nbsp;
						</>
					)}
					<button className='btn btn-sm btn-outline-primary'>
						<i className='ion-heart'></i>
						&nbsp; Favorite Post <span className='counter'>(29)</span>
					</button>
				</>
			)}
			{isMyArticle && (
				<>
					<button className='btn btn-sm btn-outline-secondary' onClick={handleEdit}>
						<i className='ion-edit'></i> Edit Article
					</button>
					<button className='btn btn-sm btn-outline-danger' onClick={handleDelete}>
						<i className='ion-trash-a'></i> Delete Article
					</button>
				</>
			)}
		</div>
	)
}
