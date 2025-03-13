import { getHolidaysByDayAndMonthParams } from '@/enteties/holiday'
import { HolidaysList } from '@/features/HolidaysList'
import { PropsWithLocale } from '@/shared/config/i18n/types'
import NotFound from '@/widgets/NotFound'
import { Metadata } from 'next'
import { FC } from 'react'
import { setRequestLocale } from 'next-intl/server'
import classes from './page.module.css'

export const metadata: Metadata = {}
// export const generateStaticParams = () => locales.map((locale) => ({ locale }));
export const revalidate = 30

const Home: FC<PropsWithLocale> = async ({ params }) => {
  const {locale} = await params;
  setRequestLocale(locale)
  const day = '01'
  const month = '01'
  const holidays = getHolidaysByDayAndMonthParams({ day, month, locale })
  if (!holidays) return <NotFound />
  return (
    <main className={classes.main}>
      {new Date().toISOString()}
      <HolidaysList locale={locale} holidaysWithDate={holidays} />
    </main>
  )
}
export default Home
