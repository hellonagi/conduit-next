import { format } from 'date-fns'

export async function formatDate(date: string) {
	const d = new Date(date)
	const formattedDate = format(d, 'MMMM dd, yyyy')
	return formattedDate
}
