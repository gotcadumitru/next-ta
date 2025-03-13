import { roboto } from '@/app/fonts'
import { Holiday } from '@/enteties/holiday'
import Share from '@/features/Share'
import { AppParams, AppRoutes } from '@/shared/config/i18n/routes'
import { LocaleParams } from '@/shared/config/i18n/types'
import NavigationLink from '@/shared/ui/NavigationLink'
import classNames from 'classnames'
import { FC } from 'react'
import classes from '../styles/holidayCard.module.css'

type HolidayCardProps = {
  holiday: Holiday
}

export const HolidayCard: FC<LocaleParams & HolidayCardProps> = ({ holiday, locale }) => {
  const description = holiday.shortDescription || holiday.description
  return (
    <div className={classes.holidayCard}>
      {holiday.imageURL && (
        <img className={classes.holidayCardImage} src={`https://sarbatori.net/images/${holiday.imageURL}`} alt="" />
      )}
      <div className={classes.holidayCardBody}>
        <div className={classes.holidayCardTitle}>
          <NavigationLink
            href={
              {
                pathname: `${AppRoutes.holiday}/${AppParams.holidayUrl}`,
                params: { holidayUrl: holiday.url },
              } as any
            }
          >
            {holiday.name}
          </NavigationLink>
          <Share holiday={holiday} locale={locale} />
        </div>
        {description && (
          <div className={classNames(roboto.className, classes.holidayCardDescription)}>
            {description}
          </div>
        )}
      </div>
    </div>
  )
}
