'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { formatDate } from '../../lib/date'
import { ArticleType } from '../../lib/definitions'
import { useAuth } from '../../contexts/authContext'

export default function Article({
	article,
	onTagClick,
}: {
	article: ArticleType
	onTagClick: (tag: string) => (e: React.MouseEvent<HTMLLIElement>) => void
}) {
	const [isFavorite, setIsFavorite] = useState(article.favorited)
	const [favoritesCount, setFavoritesCount] = useState(article.favoritesCount)
	const { user, token } = useAuth()

	useEffect(() => {
		setIsFavorite(article.favorited)
		setFavoritesCount(article.favoritesCount)
	}, [article])

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
		<div key={article.slug} className='article-preview'>
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
					<button className='btn btn-outline-primary btn-sm pull-xs-right' onClick={handleFavorite}>
						<i className='ion-heart'></i>
						&nbsp;{favoritesCount}
					</button>
				)}
			</div>
			<Link className='preview-link' href={`/article/${article.slug}`}>
				<h1>{article.title}</h1>
				<p>{article.description}</p>
				<span>Read more...</span>
				{article.tagList && (
					<ul className='tag-list'>
						{article.tagList.map((tag: string) => (
							<li key={tag} className='tag-default tag-pill tag-outline' onClick={onTagClick(tag)}>
								{tag}
							</li>
						))}
					</ul>
				)}
			</Link>
		</div>
	)
}
