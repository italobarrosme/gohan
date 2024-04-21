'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

type Menu = {
  name: string
  icon?: string
  href?: string
  onClick?: () => void
}

type NavbarProps = {
  logo: string
  menus: Menu[]
  isMenuOpen: boolean
  children?: ReactNode
}

export const Navbar = ({ logo, menus, isMenuOpen, children }: NavbarProps) => {
  return (
    <nav className="absolute top-0 flex h-20 w-full items-center justify-between bg-brand-dark px-4 shadow-sm">
      <Link href="/">
        <Image src={logo} alt="logo" width={64} height={64} priority={true} />
      </Link>
      {children}
      {!!isMenuOpen && (
        <ul className="absolute right-20  top-16 z-40 rounded-md border bg-brand-light p-2 shadow-xl">
          {menus.map((menu, index) => (
            <li
              key={index}
              className="relative my-4 cursor-pointer p-0 px-2 text-xs font-semibold text-brand-secondary hover:bg-brand-primary hover:text-white"
              onClick={menu.onClick}
            >
              {menu.name}
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}
