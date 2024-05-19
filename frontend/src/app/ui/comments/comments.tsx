import Link from 'next/link'
import { fetchComments } from '../../lib/data'
import { CommentType } from '../../lib/definitions'
import { formatDate } from '../../lib/date'

export default async function Comments({ slug }: { slug: string }) {
	const comments = await fetchComments(slug)

	return (
		<>
			{comments &&
				comments.map((comment: CommentType) => (
					<div className='card'>
						<div className='card-block'>
							<p className='card-text'>{comment.body}</p>
						</div>
						<div className='card-footer'>
							<Link className='comment-author' href={`/profile/${comment.author.username}`}>
								<img className='comment-author-img' src='http://i.imgur.com/Qr71crq.jpg' />
							</Link>
							&nbsp;
							<Link className='comment-author' href={`/profile/${comment.author.username}`}>
								{comment.author.username}
							</Link>
							<span className='date-posted'>{formatDate(comment.createdAt)}</span>
						</div>
					</div>
				))}
		</>
	)
}
