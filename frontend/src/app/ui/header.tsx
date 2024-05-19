'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const links = [
	{ name: 'Home', href: '/' },
	{
		name: 'Sign in',
		href: '/login',
	},
	{ name: 'Sign up', href: '/register' },
]

export default function Header() {
	const pathname = usePathname()

	return (
		<nav className='navbar navbar-light'>
			<div className='container'>
				<a className='navbar-brand' href='/'>
					conduit
				</a>
				<ul className='nav navbar-nav pull-xs-right'>
					{links.map((link) => {
						return (
							<li className='nav-item'>
								<Link className={clsx('nav-link', { active: pathname === link.href })} href={link.href}>
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
