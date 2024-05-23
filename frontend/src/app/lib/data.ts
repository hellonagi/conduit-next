type FetchArticlesParams = {
	tag?: string
	author?: string
	favorited?: string
	limit?: number
	offset?: number
}

export async function fetchArticles(token: string | null, params: FetchArticlesParams = {}) {
	try {
		const query = new URLSearchParams(params as any).toString()
		const headers: HeadersInit = {}
		if (token) {
			headers.Authorization = `Bearer ${token}`
		}
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles?${query}`, {
			method: 'GET',
			headers,
		})
		const data = await res.json()

		return data.articles
	} catch (error) {
		console.error('Failed to fetch articles:', error)
	}
}

export async function fetchFollowingArticles(token: string) {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/feed`, {
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
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/${slug}`, {
			method: 'GET',
			headers,
		})
		const data = await res.json()

		return data.article
	} catch (error) {
		console.error('Failed to fetch article:', error)
	}
}

export async function fetchProfile(username: string, token: string | null = null) {
	try {
		const headers: HeadersInit = {}
		if (token) {
			headers.Authorization = `Bearer ${token}`
		}
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profiles/${username}`, {
			method: 'GET',
			headers,
		})
		const data = await res.json()

		return data.profile
	} catch (error) {
		console.error('Failed to fetch profile:', error)
	}
}

export async function fetchComments(slug: string) {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/${slug}/comments`)
		const data = await res.json()

		return data.comments
	} catch (error) {
		console.error('Failed to fetch comments:', error)
	}
}

export async function fetchPopularTags() {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tags`)
		const data = await res.json()

		return data.tags
	} catch (error) {
		console.error('Failed to fetch popular tags:', error)
	}
}
