import Link from 'next/link'
import { fetchArticles, fetchPopularTags } from './lib/data'
import Articles from './ui/articles/list'

export default async function Home() {
	const popularTags = await fetchPopularTags()
	const articles = await fetchArticles()
	return (
		<main>
			<div className='home-page'>
				<div className='banner'>
					<div className='container'>
						<h1 className='logo-font'>conduit</h1>
						<p>A place to share your knowledge.</p>
					</div>
				</div>

				<div className='container page'>
					<div className='row'>
						<div className='col-md-9'>
							<Articles articles={articles} />
						</div>
						{popularTags && (
							<div className='col-md-3'>
								<div className='sidebar'>
									<p>Popular Tags</p>

									<div className='tag-list'>
										{popularTags.map((tag: string) => (
											<Link className='tag-pill tag-default' href='#'>
												{tag}
											</Link>
										))}
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</main>
	)
}
