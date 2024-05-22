'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { fetchProfile } from '../../lib/data'
import { ProfileType } from '../../lib/definitions'
import ArticlesFeed from '../../ui/articles/feed'
import { useAuth } from '../../contexts/authContext'

export default function Profile({ params }: { params: { username: string } }) {
	const router = useRouter()
	const [profile, setProfile] = useState<ProfileType>()
	const { user, token } = useAuth()
	const isMyProfile = user?.username === params.username
	// const [isMyProfile, setIsMyProfile] = useState(false)
	const [isFollowing, setIsFollowing] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const profile: ProfileType = await fetchProfile(params.username, token)
				setProfile(profile)
				setIsFollowing(profile.following)
			} catch (error) {
				console.error('Error fetching profile:', error)
			}
		}

		fetchData()
	}, [params.username, token])

	const handleSettings = () => {
		router.push(`/settings`)
	}

	const handleFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()

		try {
			const response = await fetch(`http://localhost:3000/api/profiles/${profile.username}/follow`, {
				method: isFollowing ? 'DELETE' : 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			if (response.ok) {
				setIsFollowing(!isFollowing)
				if (isFollowing) {
					console.log('Unfollowed the user')
				} else {
					console.log('Followed the user')
				}
			} else {
				console.error('Failed to follow/unfollow the user')
			}
		} catch (error) {
			console.error('An error occurred while following/unfollowing the user', error)
		}
	}

	return (
		<div className='profile-page'>
			<div className='user-info'>
				<div className='container'>
					<div className='row'>
						<div className='col-xs-12 col-md-10 offset-md-1'>
							{profile && (
								<>
									<img src={profile.image ? profile.image : 'https://i.imgur.com/hepj9ZS.png'} className='user-img' />
									<h4>{profile.username}</h4>
									<p>{profile.bio}</p>

									{isMyProfile ? (
										<button className='btn btn-sm btn-outline-secondary action-btn' onClick={handleSettings}>
											<i className='ion-gear-a'></i>
											&nbsp; Edit Profile Settings
										</button>
									) : (
										<button className='btn btn-sm btn-outline-secondary action-btn' onClick={handleFollow}>
											<i className='ion-plus-round'></i>
											&nbsp; {isFollowing ? 'Unfollow' : 'Follow'} {profile.username}
										</button>
									)}
								</>
							)}
						</div>
					</div>
				</div>
			</div>

			<div className='container'>
				<div className='row'>
					<div className='col-xs-12 col-md-10 offset-md-1'>
						<ArticlesFeed page='profile' />
					</div>
				</div>
			</div>
		</div>
	)
}
