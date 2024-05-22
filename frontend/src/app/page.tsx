import ArticlesFeed from './ui/articles/feed'
import PopularTags from './ui/tags/popular'

export default function Home() {
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
							<ArticlesFeed page='index' />
						</div>
						<PopularTags />
					</div>
				</div>
			</div>
		</main>
	)
}
