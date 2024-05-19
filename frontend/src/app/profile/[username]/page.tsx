import { fetchArticles, fetchProfile } from '../../lib/data'
import { ProfileType } from '../../lib/definitions'
import Articles from '../../ui/articles/list'

export default async function Profile({ params }: { params: { username: string } }) {
	const profile: ProfileType = await fetchProfile(params.username)
	const articles = await fetchArticles({ author: profile.username })

	return (
		<div className='profile-page'>
			<div className='user-info'>
				<div className='container'>
					<div className='row'>
						<div className='col-xs-12 col-md-10 offset-md-1'>
							<img src='http://i.imgur.com/Qr71crq.jpg' className='user-img' />
							<h4>{profile.username}</h4>
							<p>{profile.bio}</p>
							<button className='btn btn-sm btn-outline-secondary action-btn'>
								<i className='ion-plus-round'></i>
								&nbsp; Follow Eric Simons
							</button>
							<button className='btn btn-sm btn-outline-secondary action-btn'>
								<i className='ion-gear-a'></i>
								&nbsp; Edit Profile Settings
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className='container'>
				<div className='row'>
					<div className='col-xs-12 col-md-10 offset-md-1'>
						<Articles articles={articles} />
					</div>
				</div>
			</div>
		</div>
	)
}
