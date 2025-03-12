// A list of all locales that are supported

import { Locales } from '@/shared/config/i18n/consts'
import { AppParams, AppRoutes } from '@/shared/config/i18n/routes'
import type { PathNamesWithLocales } from '@/shared/config/i18n/types'

export const pathnamePaths: Record<
  string,
  {
    [Key in Locales[number]]: string
  }
> = {
  [AppRoutes.main]: {
    [Locales.en]: AppRoutes.main,
    [Locales.ro]: AppRoutes.main,
    [Locales.ru]: AppRoutes.main,
  },
  [AppRoutes.holiday]: {
    [Locales.en]: AppRoutes.holiday,
    [Locales.ro]: '/sarbatoare',
    [Locales.ru]: '/prazdniki',
  },
  [AppRoutes.search]: {
    [Locales.en]: AppRoutes.search,
    [Locales.ro]: '/cautare',
    [Locales.ru]: '/poisk',
  },
}

// The `pathnames` object holds pairs of internal
// and external paths, separated by locale.
export const pathnames = {
  [AppRoutes.main]: {
    [Locales.en]: pathnamePaths[AppRoutes.main][Locales.en],
    [Locales.ro]: pathnamePaths[AppRoutes.main][Locales.ro],
    [Locales.ru]: pathnamePaths[AppRoutes.main][Locales.ru],
  },

  [AppRoutes.search]: {
    [Locales.en]: pathnamePaths[AppRoutes.search][Locales.en],
    [Locales.ro]: pathnamePaths[AppRoutes.search][Locales.ro],
    [Locales.ru]: pathnamePaths[AppRoutes.search][Locales.ru],
  },
  [`${AppRoutes.holiday}/${AppParams.holidayUrl}`]: {
    [Locales.en]: `${pathnamePaths[AppRoutes.holiday][Locales.en]}/${AppParams.holidayUrl}`,
    [Locales.ro]: `${pathnamePaths[AppRoutes.holiday][Locales.ro]}/${AppParams.holidayUrl}`,
    [Locales.ru]: `${pathnamePaths[AppRoutes.holiday][Locales.ru]}/${AppParams.holidayUrl}`,
  },
} satisfies PathNamesWithLocales
