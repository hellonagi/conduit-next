'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { fetchPopularTags } from '../../lib/data'

export default function PopularTags() {
	const [popularTags, setPopularTags] = useState<string[]>([])

	useEffect(() => {
		const fetchData = async () => {
			const tags = await fetchPopularTags()
			setPopularTags(tags)
		}
		fetchData()
	}, [])

	return (
		<>
			{popularTags && (
				<div className='col-md-3'>
					<div className='sidebar'>
						<p>Popular Tags</p>

						<div className='tag-list'>
							{popularTags.map((tag: string) => (
								<Link key={tag} className='tag-pill tag-default' href='#'>
									{tag}
								</Link>
							))}
						</div>
					</div>
				</div>
			)}
		</>
	)
}
