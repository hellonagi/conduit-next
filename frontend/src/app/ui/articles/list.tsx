import Link from 'next/link'
import { formatDate } from '../../lib/date'
import { ArticleType } from '../../lib/definitions'

export default function Articles({ articles }: { articles: ArticleType[] }) {
	return (
		<>
			{articles &&
				articles.map((article: ArticleType) => (
					<div key={article.slug} className='article-preview'>
						<div className='article-meta'>
							<Link href={`/profile/${article.author.username}`}>
								<img src='http://i.imgur.com/Qr71crq.jpg' />
							</Link>
							<div className='info'>
								<Link className='author' href={`/profile/${article.author.username}`}>
									{article.author.username}
								</Link>
								<span className='date'>{formatDate(article.createdAt)}</span>
							</div>
							<button className='btn btn-outline-primary btn-sm pull-xs-right'>
								<i className='ion-heart'></i>
								&nbsp;{article.favoritesCount}
							</button>
						</div>
						<Link className='preview-link' href={`/article/${article.slug}`}>
							<h1>{article.title}</h1>
							<p>{article.description}</p>
							<span>Read more...</span>
							{article.tagList && (
								<ul className='tag-list'>
									{article.tagList.map((tag: string) => (
										<li key={tag} className='tag-default tag-pill tag-outline'>
											{tag}
										</li>
									))}
								</ul>
							)}
						</Link>
					</div>
				))}

			{/* <ul className='pagination'>
								<li className='page-item active'>
									<a className='page-link' href=''>
										1
									</a>
								</li>
								<li className='page-item'>
									<a className='page-link' href=''>
										2
									</a>
								</li>
							</ul> */}
		</>
	)
}
