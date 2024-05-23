'use client'
import { useState, useEffect } from 'react'
import { fetchArticles, fetchFollowingArticles } from '../../lib/data'
import { useAuth } from '../../contexts/authContext'
import Articles from './list'

type FeedType = 'global' | 'following' | 'tag' | 'my' | 'favorite'

export default function ArticlesFeed({ page = 'index' }: { page: string }) {
	const active = page === 'index' ? 'global' : 'my'

	let feeds: { name: FeedType; display: string }[] = [
		{ name: 'global', display: 'Global Feed' },
		{ name: 'following', display: 'Your Feed' },
		{ name: 'tag', display: 'Tag Feed' },
	]
	if (page === 'profile') {
		feeds = [
			{ name: 'my', display: 'My Articles' },
			{ name: 'favorite', display: 'Favorite Articles' },
		]
	}

	const [articles, setArticles] = useState([])
	const [activeFeed, setActiveFeed] = useState<FeedType>(active)
	const [activeTag, setActiveTag] = useState<string>('')
	const { user, token } = useAuth()

	useEffect(() => {
		const fetchData = async () => {
			try {
				let articles
				if (activeFeed === 'following') {
					if (token) articles = await fetchFollowingArticles(token)
				} else if (activeFeed === 'global') {
					articles = await fetchArticles(token)
				} else if (activeFeed === 'tag') {
					articles = await fetchArticles(token, { tag: activeTag })
				} else if (activeFeed === 'my') {
					articles = await fetchArticles(token, { author: user?.username })
				} else if (activeFeed === 'favorite') {
					articles = await fetchArticles(token, { favorited: user?.username })
				}
				setArticles(articles)
			} catch (error) {
				console.error('Error fetching articles:', error)
			}
		}

		fetchData()
	}, [activeFeed, activeTag, token, user])

	const handleFeedClick = (feed: FeedType) => (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()
		setActiveFeed(feed)
	}

	const handleTagClick = (tag: string) => (e: React.MouseEvent<HTMLLIElement>) => {
		e.preventDefault()
		setActiveFeed('tag')
		setActiveTag(tag)
	}

	return (
		<>
			<div className='feed-toggle'>
				<ul className='nav nav-pills outline-active'>
					{feeds.map((feed) => (
						<li key={feed.name} className='nav-item'>
							<a
								className={`nav-link ${activeFeed === feed.name ? 'active' : ''}`}
								href=''
								onClick={handleFeedClick(feed.name)}
							>
								{feed.display}
							</a>
						</li>
					))}
				</ul>
			</div>
			<Articles articles={articles} onTagClick={handleTagClick} />
		</>
	)
}
