'use client'
import { useEffect, useState } from 'react'
import { fetchComments } from '../../lib/data'
import { CommentType } from '../../lib/definitions'
import Comment from './comment'
import Form from './create-form'

export default function Comments({ slug }: { slug: string }) {
	const [comments, setComments] = useState<CommentType[] | null>(null)

	useEffect(() => {
		fetchData()
	}, [slug])

	const fetchData = async () => {
		const comments: CommentType[] = await fetchComments(slug)
		setComments(comments)
	}

	const handleDeleteComment = (commentId: number) => {
		setComments((prevComments) => prevComments?.filter((comment) => comment.id !== commentId) || null)
	}

	const handlePostComment = () => {
		fetchData()
	}

	return (
		<>
			<Form slug={slug} onPost={handlePostComment} />
			{comments &&
				comments.map((comment: CommentType) => (
					<Comment key={comment.id} slug={slug} comment={comment} onDelete={handleDeleteComment} />
				))}
		</>
	)
}
