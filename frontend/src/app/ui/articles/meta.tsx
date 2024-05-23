'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { formatDate } from '../../lib/date'
import { ArticleType } from '../../lib/definitions'
import { useAuth } from '../../contexts/authContext'

export default function ArticleMenu({ article }: { article: ArticleType }) {
	const router = useRouter()
	const { user, token } = useAuth()
	const isMyArticle = user?.username === article.author.username
	const [isFollowing, setIsFollowing] = useState(article.author.following)
	const [isFavorite, setIsFavorite] = useState(article.favorited)
	const [favoritesCount, setFavoritesCount] = useState(article.favoritesCount)

	useEffect(() => {
		setIsFollowing(article.author.following)
		setIsFavorite(article.favorited)
		setFavoritesCount(article.favoritesCount)
	}, [article])

	const handleEdit = () => {
		router.push(`/editor/${article.slug}`)
	}

	const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		const confirmed = window.confirm('Are you sure you want to delete this article?')
		if (confirmed) {
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/${article.slug}`, {
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
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profiles/${article.author.username}/follow`, {
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

	const handleFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()

		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/${article.slug}/favorite`, {
				method: isFavorite ? 'DELETE' : 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			if (response.ok) {
				setIsFavorite(!isFavorite)
				if (isFavorite) {
					setFavoritesCount((prev) => prev - 1)
					console.log('Remove favorite the article')
				} else {
					setFavoritesCount((prev) => prev + 1)
					console.log('Add favorite the article')
				}
			} else {
				console.error('Failed to favorite/unfavorite the article')
			}
		} catch (error) {
			console.error('An error occurred while favorite/unfavorite the article', error)
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
					<button className='btn btn-sm btn-outline-primary' onClick={handleFavorite}>
						<i className='ion-heart'></i>
						&nbsp; {isFavorite ? 'Unfavorite' : 'Favorite'} Post <span className='counter'>({favoritesCount})</span>
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
