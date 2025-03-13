import { HolidaysWithDate } from '@/enteties/holiday/types/holidayTypes'
import { LocaleParams } from '@/shared/config/i18n/types'
import { HolidayCard } from '@/shared/ui/HolidayCard'
import classNames from 'classnames'
import { FC } from 'react'
import classes from '../styles/holidaysList.module.css'

type HolidaysListProps = {
  holidaysWithDate: HolidaysWithDate
}
export const HolidaysList: FC<LocaleParams & HolidaysListProps> = ({
  holidaysWithDate,
  locale,
}) => (
  <div className={classNames('container', classes.holidaysContainer)}>
      {holidaysWithDate.holidays.map((holiday) => (
        <HolidayCard key={holiday.id} holiday={holiday} locale={locale} />
      ))}
    </div>
)
