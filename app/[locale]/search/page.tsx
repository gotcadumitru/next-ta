import { FC } from 'react'
import { PropsWithLocale } from '@/shared/config/i18n/types'
import { useTranslations } from 'next-intl'
// eslint-disable-next-line camelcase
import { unstable_setRequestLocale } from 'next-intl/server'
import SearchPage from './SearchPage'

const SearchPageWrapper: FC<PropsWithLocale> = ({ params }) => {
  unstable_setRequestLocale(params.locale)
  const t = useTranslations('header')
  return (
    <SearchPage title={t('searchTitle')} placeholder={t('searchPlaceholder')} params={params} />
  )
}
export default SearchPageWrapper
