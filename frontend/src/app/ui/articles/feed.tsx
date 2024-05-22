'use client'
import { useState, useEffect } from 'react'
import { fetchArticles, fetchFollowingArticles } from '../../lib/data'
import { useAuth } from '../../contexts/authContext'
import Articles from './list'

export default function ArticleFeed() {
	const [articles, setArticles] = useState([])
	const [activeFeed, setActiveFeed] = useState<'your' | 'global'>('global')
	const { token } = useAuth()

	useEffect(() => {
		const fetchData = async () => {
			try {
				let articles
				if (activeFeed === 'your') {
					if (token) articles = await fetchFollowingArticles(token)
				} else {
					articles = await fetchArticles()
				}
				setArticles(articles)
			} catch (error) {
				console.error('Error fetching articles:', error)
			}
		}

		fetchData()
	}, [activeFeed])

	const handleFeedClick = (feed: 'your' | 'global') => (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()
		setActiveFeed(feed)
	}

	return (
		<>
			<div className='feed-toggle'>
				<ul className='nav nav-pills outline-active'>
					<li className='nav-item'>
						<a
							className={`nav-link ${activeFeed === 'your' ? 'active' : ''}`}
							href=''
							onClick={handleFeedClick('your')}
						>
							Your Feed
						</a>
					</li>
					<li className='nav-item'>
						<a
							className={`nav-link ${activeFeed === 'global' ? 'active' : ''}`}
							href=''
							onClick={handleFeedClick('global')}
						>
							Global Feed
						</a>
					</li>
				</ul>
			</div>
			<Articles articles={articles} />
		</>
	)
}
