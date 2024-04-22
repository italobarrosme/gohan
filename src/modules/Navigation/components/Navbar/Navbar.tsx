'use client'

import Link from 'next/link'
import { cn } from '@/utils'
import { Button } from '@/shared/components/Button'
import { usePathname } from 'next/navigation'
import { menus } from '../../menus'
import { ReactNode } from 'react'

export type Menu = {
  name: string
  icon?: string
  href?: string
  active?: boolean
  submenus?: Menu[]
  image?: string
  onClick?: () => void
}

type NavbarProps = {
  children?: ReactNode
}

export const Navbar = ({ children }: NavbarProps) => {
  const currentPathName = usePathname()

  return (
    <nav className="flex rounded-md bg-brand-light text-brand-soft shadow-sm">
      <ul className="flex min-h-16 max-w-3xl flex-wrap items-center gap-4 p-4">
        <li></li>
        {menus(currentPathName) &&
          menus(currentPathName).map((menu, index) => (
            <li
              key={index}
              className={cn(
                'flex items-center hover:text-brand-accent',
                menu.active ? 'text-brand-accent' : 'text-brand-soft'
              )}
            >
              {menu.href ? (
                <Link href={menu.href || '/'} passHref>
                  {menu.name}
                </Link>
              ) : (
                <Button onClick={menu.onClick}>{menu.name}</Button>
              )}
            </li>
          ))}

        {children}
        <li></li>
      </ul>
    </nav>
  )
}
