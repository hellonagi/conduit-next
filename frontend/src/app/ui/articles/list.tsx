'use client'
import Link from 'next/link'
import { formatDate } from '../../lib/date'
import { ArticleType } from '../../lib/definitions'
import Article from './li'

export default function Articles({
	articles,
	onTagClick,
}: {
	articles: ArticleType[]
	onTagClick: (tag: string) => (e: React.MouseEvent<HTMLLIElement>) => void
}) {
	return (
		<>
			{articles &&
				articles.map((article: ArticleType) => (
					<Article article={article} key={article.slug} onTagClick={onTagClick} />
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
