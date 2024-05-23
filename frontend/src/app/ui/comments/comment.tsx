'use client'
import Link from 'next/link'
import { CommentType } from '../../lib/definitions'
import { formatDate } from '../../lib/date'
import { useAuth } from '../../contexts/authContext'

interface CommentProps {
	slug: string
	comment: CommentType
	onDelete: (commentId: number) => void
}

export default function Comment({ slug, comment, onDelete }: CommentProps) {
	const { user, token } = useAuth()
	const isMyComment = user?.username === comment.author.username

	const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		const confirmed = window.confirm('Are you sure you want to delete this comment?')
		if (confirmed) {
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/${slug}/comments/${comment.id}`, {
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})

				if (response.ok) {
					onDelete(comment.id)
				} else {
					console.error('Failed to delete the comment')
				}
			} catch (error) {
				console.error('An error occurred while deleting the comment', error)
			}
		}
	}

	return (
		<div key={comment.id} className='card'>
			<div className='card-block'>
				<p className='card-text'>{comment.body}</p>
			</div>
			<div className='card-footer'>
				<Link className='comment-author' href={`/profile/${comment.author.username}`}>
					<img
						className='comment-author-img'
						src={comment.author.image ? comment.author.image : 'https://i.imgur.com/hepj9ZS.png'}
					/>
				</Link>
				&nbsp;
				<Link className='comment-author' href={`/profile/${comment.author.username}`}>
					{comment.author.username}
				</Link>
				<span className='date-posted'>{formatDate(comment.createdAt)}</span>
				{isMyComment && (
					<span className='mod-options' onClick={handleDelete}>
						<i className='ion-trash-a'></i>
					</span>
				)}
			</div>
		</div>
	)
}
