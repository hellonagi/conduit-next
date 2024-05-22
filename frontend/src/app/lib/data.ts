type FetchArticlesParams = {
	tag?: string
	author?: string
	favorited?: string
	limit?: number
	offset?: number
}

export async function fetchArticles(params: FetchArticlesParams = {}) {
	try {
		const query = new URLSearchParams(params as any).toString()
		const res = await fetch(`http://localhost:3000/api/articles?${query}`)
		const data = await res.json()

		return data.articles
	} catch (error) {
		console.error('Failed to fetch articles:', error)
	}
}

export async function fetchFollowingArticles(token: string) {
	try {
		const res = await fetch(`http://localhost:3000/api/articles/feed`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		const data = await res.json()

		return data.articles
	} catch (error) {
		console.error('Failed to fetch following articles:', error)
	}
}

export async function fetchArticle(slug: string, token: string | null = null) {
	try {
		const headers: HeadersInit = {}
		if (token) {
			headers.Authorization = `Bearer ${token}`
		}
		const res = await fetch(`http://localhost:3000/api/articles/${slug}`, {
			method: 'GET',
			headers,
		})
		const data = await res.json()

		return data.article
	} catch (error) {
		console.error('Failed to fetch article:', error)
	}
}

export async function fetchProfile(username: string) {
	try {
		const res = await fetch(`http://localhost:3000/api/profiles/${username}`)
		const data = await res.json()

		return data.profile
	} catch (error) {
		console.error('Failed to fetch profile:', error)
	}
}

export async function fetchComments(slug: string) {
	try {
		const res = await fetch(`http://localhost:3000/api/articles/${slug}/comments`)
		const data = await res.json()

		return data.comments
	} catch (error) {
		console.error('Failed to fetch comments:', error)
	}
}

export async function fetchPopularTags() {
	try {
		const res = await fetch(`http://localhost:3000/api/tags`)
		const data = await res.json()

		return data.tags
	} catch (error) {
		console.error('Failed to fetch popular tags:', error)
	}
}
