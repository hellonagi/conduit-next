import { fetchArticle } from '../../lib/data'
import { ArticleType } from '../../lib/definitions'
import Form from '../../ui/comments/create-form'
import Comments from '../../ui/comments/comments'

export default async function Page({ params }: { params: { slug: string } }) {
	const article: ArticleType = await fetchArticle(params.slug)

	return (
		<div className='article-page'>
			<div className='banner'>
				<div className='container'>
					<h1>{article.title}</h1>

					<div className='article-meta'>
						<a href='/profile/eric-simons'>
							<img src='http://i.imgur.com/Qr71crq.jpg' />
						</a>
						<div className='info'>
							<a href='/profile/eric-simons' className='author'>
								Eric Simons
							</a>
							<span className='date'>January 20th</span>
						</div>
						<button className='btn btn-sm btn-outline-secondary'>
							<i className='ion-plus-round'></i>
							&nbsp; Follow Eric Simons <span className='counter'>(10)</span>
						</button>
						&nbsp;&nbsp;
						<button className='btn btn-sm btn-outline-primary'>
							<i className='ion-heart'></i>
							&nbsp; Favorite Post <span className='counter'>(29)</span>
						</button>
						<button className='btn btn-sm btn-outline-secondary'>
							<i className='ion-edit'></i> Edit Article
						</button>
						<button className='btn btn-sm btn-outline-danger'>
							<i className='ion-trash-a'></i> Delete Article
						</button>
					</div>
				</div>
			</div>

			<div className='container page'>
				<div className='row article-content'>
					<div className='col-md-12'>
						<p>{article.body}</p>
						{article.tagList && (
							<ul className='tag-list'>
								{article.tagList.map((tag) => (
									<li className='tag-default tag-pill tag-outline'>{tag}</li>
								))}
							</ul>
						)}
					</div>
				</div>

				<hr />

				<div className='article-actions'>
					<div className='article-meta'>
						<a href='profile.html'>
							<img src='http://i.imgur.com/Qr71crq.jpg' />
						</a>
						<div className='info'>
							<a href='' className='author'>
								Eric Simons
							</a>
							<span className='date'>January 20th</span>
						</div>
						<button className='btn btn-sm btn-outline-secondary'>
							<i className='ion-plus-round'></i>
							&nbsp; Follow Eric Simons
						</button>
						&nbsp;
						<button className='btn btn-sm btn-outline-primary'>
							<i className='ion-heart'></i>
							&nbsp; Favorite Article <span className='counter'>(29)</span>
						</button>
						<button className='btn btn-sm btn-outline-secondary'>
							<i className='ion-edit'></i> Edit Article
						</button>
						<button className='btn btn-sm btn-outline-danger'>
							<i className='ion-trash-a'></i> Delete Article
						</button>
					</div>
				</div>

				<div className='row'>
					<div className='col-xs-12 col-md-8 offset-md-2'>
						<Form />
						<Comments slug={params.slug} />
					</div>
				</div>
			</div>
		</div>
	)
}
