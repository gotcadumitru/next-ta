import { getHolidaysByDayAndMonthParams } from '@/enteties/holiday'
import { HolidaysList } from '@/features/HolidaysList'
import { PropsWithLocale } from '@/shared/config/i18n/types'
import NotFound from '@/widgets/NotFound'
import { Metadata } from 'next'
import { FC } from 'react'
import classes from './page.module.css'

export const metadata: Metadata = {}

const Home: FC<PropsWithLocale> = ({ params }) => {
  const day = '01'
  const month = '01'
  const holidays = getHolidaysByDayAndMonthParams({ day, month, locale: params.locale })
  if (!holidays) return <NotFound />
  return (
    <main className={classes.main}>
      <HolidaysList params={params} holidaysWithDate={holidays} />
    </main>
  )
}
export default Home
