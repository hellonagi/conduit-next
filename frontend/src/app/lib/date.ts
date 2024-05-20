import { format } from 'date-fns'

export function formatDate(date: string) {
	const d = new Date(date)
	const formattedDate = format(d, 'MMMM dd, yyyy')
	return formattedDate
}
