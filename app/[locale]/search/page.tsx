import { FC } from 'react'
import { PropsWithLocale } from '@/shared/config/i18n/types'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import SearchPage from './SearchPage'

const SearchPageWrapper: FC<PropsWithLocale> = async ({ params }) => {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('header');
  return (
    <SearchPage title={t('searchTitle')} placeholder={t('searchPlaceholder')} locale={locale} />
  )
}
export default SearchPageWrapper
