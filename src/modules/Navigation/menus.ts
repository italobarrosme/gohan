import { Menu } from './components/Navbar'

const menusTemplate: Menu[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    active: true,
  },
  {
    name: 'Profile',
    href: '/dashboard/profile',
    active: false,
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    active: false,
  },
]

export const menus = (pathname: string) => {
  const renderMenus = menusTemplate.map((menu) => {
    if (menu.href === pathname) {
      return { ...menu, active: true }
    }

    return menu
  })

  return renderMenus
}
