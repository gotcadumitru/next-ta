'use client'

import { AppParams, AppRoutes } from '@/shared/config/i18n/routes'
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { SearchHolidayItem } from '@/features/SearchIcon'
import SearchIcon from '@/shared/assets/icons/SearchIcon'
import Input from '@/shared/ui/Input'
import NavigationLink from '@/shared/ui/NavigationLink'
import axios from 'axios'
import { PropsWithLocale } from '@/shared/config/i18n/types'
import useDebounce from '@/shared/lib/hooks/useDebounce/useDebounce'
import classes from './page.module.css'

export type SearchPageProps = PropsWithLocale<{
  title: string
  placeholder: string
}>

const SearchPage: FC<SearchPageProps> = ({ params: { locale }, placeholder, title }) => {
  const [searchValue, setSearchValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const [listOfHolidays, setListOfHolidays] = useState<SearchHolidayItem[]>([])
  const { debouncedValue } = useDebounce(searchValue, 500)

  useEffect(() => {
    if (debouncedValue.length > 2) {
      const controller = new AbortController()
      axios
        .get<SearchHolidayItem[]>(`/${locale}/api/search-holiday?search=${debouncedValue}`, {
          signal: controller.signal,
        })
        .then((response) => {
          setListOfHolidays(response.data)
        })
        .catch(console.log)
      return () => controller.abort()
    }
  }, [debouncedValue])
  const onSearchInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <div className='container'>
      <h2 className={classes.searchPageTitle}>{title}</h2>
      <div>
        <Input
          className={classes.input}
          inputContainerClassName={classes.inputContainerClassName}
          value={searchValue}
          onChange={onSearchInputValueChange}
          ref={inputRef}
          placeholder={placeholder}
          icons={<SearchIcon />}
        />
        <ul className={classes.holidayItems}>
          {listOfHolidays.map((holidayFromSearchList) => (
            <li key={holidayFromSearchList.url}>
              <NavigationLink
                className={classes.holidayItem}
                href={
                  {
                    pathname: `${AppRoutes.holiday}/${AppParams.holidayUrl}`,
                    params: { holidayUrl: holidayFromSearchList.url },
                  } as any
                }
              >
                {holidayFromSearchList.name}
              </NavigationLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default SearchPage
