'use client'
import { useEffect, useState } from 'react'
import { fetchArticle } from '../../lib/data'
import { ArticleType } from '../../lib/definitions'
import Form from '../../ui/comments/create-form'
import Comments from '../../ui/comments/comments'
import ArticleMeta from '../../ui/articles/meta'
import { useAuth } from '../../contexts/authContext'

export default function Page({ params }: { params: { slug: string } }) {
	const [article, setArticle] = useState<ArticleType | null>(null)
	const { token } = useAuth()

	useEffect(() => {
		const fetchData = async () => {
			const article: ArticleType = await fetchArticle(params.slug, token)
			setArticle(article)
		}
		fetchData()
	}, [params.slug, token])

	return (
		<>
			{article && (
				<>
					<div className='article-page'>
						<div className='banner'>
							<div className='container'>
								<h1>{article.title}</h1>

								<ArticleMeta article={article} />
							</div>
						</div>

						<div className='container page'>
							<div className='row article-content'>
								<div className='col-md-12'>
									<p>{article.body}</p>
									{article.tagList && (
										<ul className='tag-list'>
											{article.tagList.map((tag) => (
												<li key={tag} className='tag-default tag-pill tag-outline'>
													{tag}
												</li>
											))}
										</ul>
									)}
								</div>
							</div>

							<hr />

							<div className='article-actions'>
								<ArticleMeta article={article} />
							</div>

							<div className='row'>
								<div className='col-xs-12 col-md-8 offset-md-2'>
									<Form />
									<Comments slug={params.slug} />
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	)
}
