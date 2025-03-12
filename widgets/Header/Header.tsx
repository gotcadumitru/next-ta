'use client'

import { roboto } from '@/app/fonts'
import { Link, usePathname } from '@/navigation'
import VscMenu from '@/shared/assets/icons/VscMenu'
import WebsiteLogo from '@/shared/assets/icons/WebsiteLogo'
import { locales } from '@/shared/config/i18n/consts'
import { CircleShapeDouble, CircleShapePosition } from '@/shared/ui/CircleShape'
import NavigationLink from '@/shared/ui/NavigationLink'
import classNames from 'classnames'
import { useParams } from 'next/navigation'
import { FC, useState } from 'react'
import SearchIcon from '@/features/SearchIcon'
import { checkIsRouteWithSearchInput } from './HeaderUtils'
import classes from './Header.module.css'

interface HeaderProps {
  className?: string
}

export const Header: FC<HeaderProps> = ({ className }) => {
  const pathname = usePathname().toString()
  const params = useParams()
  const [isHeaderDisplayed, setIsHeaderDisplayed] = useState(false)
  const isSearchInputDisplayed = checkIsRouteWithSearchInput(pathname)
  const isInsideReactNative = typeof window !== 'undefined' && !!(window as any).getReactNativeApi

  if(isInsideReactNative) return null;

  return (
    <>
      <div className={classNames(classes.headerMenuIconContainer, 'container')}>
        <VscMenu className={classes.headerMenuIcon} onClick={() => setIsHeaderDisplayed(true)} />
        {isSearchInputDisplayed && <SearchIcon />}
      </div>
      <CircleShapeDouble
        isDisplayed={!isHeaderDisplayed}
        position={CircleShapePosition.TOP_RIGHT}
      />
      <CircleShapeDouble
        isDisplayed={!isHeaderDisplayed}
        position={CircleShapePosition.BOTTOM_LEFT}
      />
      <div
        onClick={() => setIsHeaderDisplayed(false)}
        className={classNames(
          classes.header,
          'container',
          {
            [classes.headerActive]: isHeaderDisplayed,
          },
          className,
        )}
      >
        <div onClick={(e) => e.stopPropagation()} className={classes.headerContainer}>
          <CircleShapeDouble
            isDisplayed={isHeaderDisplayed}
            position={CircleShapePosition.TOP_LEFT}
          />
          <CircleShapeDouble
            isDisplayed={isHeaderDisplayed}
            position={CircleShapePosition.BOTTOM_LEFT}
          />
          <Link
            onClick={() => setIsHeaderDisplayed(false)}
            href='/'
            aria-label='HoliDays'
            className={classes.logoLink}
          >
            <WebsiteLogo />
          </Link>
          <div className={classes.urlsContainer}>
            <div className={classes.languageContainer}>
              {locales.map((locale) => (
                <NavigationLink
                  locale={locale}
                  className={roboto.className}
                  key={locale}
                  href={{ pathname, params: { ...params, locale } } as any}
                >
                  {locale.toLocaleUpperCase()}
                </NavigationLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
