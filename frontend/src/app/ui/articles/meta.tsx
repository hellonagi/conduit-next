'use client'
import Link from 'next/link'
import { fetchArticles } from '../../lib/data'
import { useRouter } from 'next/navigation'
import { formatDate } from '../../lib/date'
import { ArticleType } from '../../lib/definitions'
import { useAuth } from '../../contexts/authContext'

export default function ArticleMenu({ article }: { article: ArticleType }) {
	const router = useRouter()
	const { user } = useAuth()
	const isMyArticle = user?.username === article.author.username

	const handleEdit = () => {
		router.push(`/editor/${article.slug}`)
	}

	const handleDelete = async () => {
		const confirmed = window.confirm('Are you sure you want to delete this article?')
		if (confirmed) {
			const token = localStorage.getItem('jwtToken')
			if (!token) {
				router.push('/login')
				return
			}

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
							<button className='btn btn-sm btn-outline-secondary'>
								<i className='ion-plus-round'></i>
								&nbsp; Follow {article.author.username}
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
