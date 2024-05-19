export type ArticleType = {
	title: string
	slug: string
	description: string
	body: string
	tagList: string[]
	createdAt: string
	updatedAt: string
	favorited: boolean
	favoritesCount: number
	author: {
		username: string
		bio: string | null
		image: string | null
	}
}

export type CommentType = {
	id: number
	createdAt: string
	updatedAt: string
	body: string
	author: {
		username: string
		bio: string | null
		image: string | null
		following: boolean
	}
}

export type CommentsType = {
	comments: CommentType[]
}

export type ProfileType = {
	username: string
	bio: string
	image: string
	following: boolean
}
