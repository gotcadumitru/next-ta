import { locales, Locales } from '@/shared/config/i18n/consts'
import { Pathnames } from 'next-intl/navigation'

export type LocaleParams = {
  locale: Locales
}

export type MonthSearchParams = {
    month: string
}

export type PropsWithLocale<T = void> = T & {
  params: LocaleParams
}
export type PropsWithSearchParams<Params, T = void> = T & {
    searchParams: Params
}
export type PropsWithParams<Params, T = void> = T & {
  params: Params
}

export type PathNamesWithLocales = Pathnames<typeof locales>
