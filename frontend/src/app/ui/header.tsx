'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '../hooks/useAuth'
import clsx from 'clsx'

export default function Header() {
	const user = useAuth()
	const pathname = usePathname()

	const links = user
		? [
				{ name: 'Home', href: '/' },
				{
					name: 'New Article',
					href: '/editor',
					icon: 'ion-compose',
				},
				{
					name: 'Settings',
					href: '/settings',
					icon: 'ion-gear-a',
				},
				{
					name: user.username,
					href: `/profile/${user.username}`,
					img: user.image ? user.image : 'https://i.imgur.com/hepj9ZS.png',
				},
		  ]
		: [
				{ name: 'Home', href: '/' },
				{
					name: 'Sign in',
					href: '/login',
				},
				{ name: 'Sign up', href: '/register' },
		  ]

	return (
		<nav className='navbar navbar-light'>
			<div className='container'>
				<Link className='navbar-brand' href='/'>
					conduit
				</Link>
				<ul className='nav navbar-nav pull-xs-right'>
					{links.map((link) => {
						return (
							<li className='nav-item' key={link.name}>
								<Link className={clsx('nav-link', { active: pathname === link.href })} href={link.href}>
									{link.icon && (
										<>
											<i className={link.icon}></i>&nbsp;
										</>
									)}
									{link.img && <img src={link.img} className='user-pic' />}
									{link.name}
								</Link>
							</li>
						)
					})}
				</ul>
			</div>
		</nav>
	)
}
