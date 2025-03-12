import { getHolidayByHolidayUrl, Holiday } from '@/enteties/holiday'
import { LocaleParams, PropsWithParams } from '@/shared/config/i18n/types'
import NotFound from '@/widgets/NotFound'
import { Metadata } from 'next'
import { FC } from 'react'
import classes from './page.module.css'

type HolidayPageProps = {
  holidayUrl: string
}

export async function generateMetadata({
  params: { holidayUrl, locale },
}: PropsWithParams<LocaleParams & HolidayPageProps>): Promise<Metadata> {
  const holiday = getHolidayByHolidayUrl(holidayUrl, locale)
  if (!holiday) return {}

  return {
    title: holiday.name,
    description: holiday.description,
    openGraph: {
      type: 'article',
      title: holiday.name,
      url: `${process.env.SITE_URL}en/holiday/${holiday.url}`,
      description: holiday.description,
      images: [
        holiday.imageURL
          ? `${process.env.SITE_URL}images/${holiday.imageURL}`
          : `${process.env.SITE_URL}logo.png`,
      ],
    },
  }
}

// SSR page
const Page: FC<PropsWithParams<LocaleParams & HolidayPageProps>> = async ({
  params: { holidayUrl, locale },
}) => {

  const holiday = await new Promise<Holiday | null>((resolve) => {
    setTimeout(() => resolve(getHolidayByHolidayUrl(holidayUrl, locale)), 2000)
  })

  if (!holiday) return <NotFound />
  const [holidayDescriptionFirstPhrase, ...holidayRestOfTheDescription] =
    holiday.description.split('.')
  return (
    <div className='container'>
      <h1 className={classes.holidayTitle}>{holiday.name}</h1>
      <p>
        {holidayDescriptionFirstPhrase}
        <img
          className={classes.holidayImage}
          src={`https://sarbatori.net/images/${holiday.imageURL}`}
          alt={holiday.name}
          width={130}
          height={130}
        />
        {holidayRestOfTheDescription}
      </p>
    </div>
  )
}
export default Page
