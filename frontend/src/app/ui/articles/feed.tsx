'use client'
import { useState, useEffect } from 'react'
import { fetchArticles } from '../../lib/data'
import Articles from './list'

export default function ArticleFeed() {
	const [articles, setArticles] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const articles = await fetchArticles()
				setArticles(articles)
			} catch (error) {
				console.error('Error fetching articles:', error)
			}
		}

		fetchData()
	}, [])

	return (
		<>
			<div className='feed-toggle'>
				<ul className='nav nav-pills outline-active'>
					<li className='nav-item'>
						<a className='nav-link' href=''>
							Your Feed
						</a>
					</li>
					<li className='nav-item'>
						<a className='nav-link active' href=''>
							Global Feed
						</a>
					</li>
				</ul>
			</div>
			<Articles articles={articles} />
		</>
	)
}
