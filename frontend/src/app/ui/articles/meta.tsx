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
					<button className='btn btn-sm btn-outline-danger'>
						<i className='ion-trash-a'></i> Delete Article
					</button>
				</>
			)}
		</div>
	)
}
