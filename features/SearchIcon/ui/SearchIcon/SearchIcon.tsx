'use client'

import SearchIconSvg from '@/shared/assets/icons/SearchIcon'
import { FC } from 'react'
import { AppRoutes } from '@/shared/config/i18n/routes'
import NavigationLink from '@/shared/ui/NavigationLink'
import classes from '../../styles/searchIcon.module.css'

export const SearchIcon: FC = () => (
  <div className={classes.searchInput}>
    <NavigationLink href={AppRoutes.search}>
      <SearchIconSvg className={classes.searchIcon} />
    </NavigationLink>
  </div>
)
