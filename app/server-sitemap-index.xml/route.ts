import {
  getAllHolidays,
  Holiday,
} from '@/enteties/holiday'
import { Locales } from '@/shared/config/i18n/consts'
import { pathnamePaths } from '@/shared/config/i18n/pathnames'
import { AppRoutes } from '@/shared/config/i18n/routes'
import { getServerSideSitemap } from 'next-sitemap'
import { ISitemapField } from 'next-sitemap/dist/@types/interface'
import prevSitemapJson from './prevsitemap.json'

const getHolidayUrl = (locale: Locales, url: Holiday['url']) =>
  `${process.env.SITE_URL}${locale}${pathnamePaths[AppRoutes.holiday][locale]}/${url}`


export async function GET() {
  const date = new Date().toISOString()
  const sitemapItems: ISitemapField[] = []
  const holidaysPage = getAllHolidays().map((holiday): ISitemapField => {
    const loc = getHolidayUrl(Locales.en, holiday.urlen)
    const prevSitemapUrl = prevSitemapJson.find((prevLoc) => prevLoc.loc === loc)

    return {
      loc,
      lastmod: prevSitemapUrl?.lastmod || date,
      alternateRefs: [
        {
          href: getHolidayUrl(Locales.ro, holiday.urlro),
          hreflang: Locales.ro,
        },
        {
          href: getHolidayUrl(Locales.ru, holiday.urlru),
          hreflang: Locales.ru,
        },
      ],
    }
  })
  sitemapItems.push(...holidaysPage)

  return getServerSideSitemap(sitemapItems)
}
