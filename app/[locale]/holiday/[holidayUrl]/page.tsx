import { getAllHolidays, getHolidayByHolidayUrl } from '@/enteties/holiday'
import NotFound from '@/widgets/NotFound'
import { Metadata } from 'next'
import { FC } from 'react'
import { Locales, locales } from '@/shared/config/i18n/consts'
// eslint-disable-next-line camelcase
import classes from './page.module.css'


export const revalidate = 30

export const generateStaticParams = () =>
  getAllHolidays().reduce(
    (params, holiday) => [
      ...params,
      ...locales.map((locale) => ({
        locale,
        holidayUrl: holiday[`url${locale}`],
      })),
    ],
    [] as { locale: Locales; holidayUrl: string }[],
  )

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    locale: Locales
    holidayUrl: string
  }>
}): Promise<Metadata> {
  const { locale, holidayUrl } = await params
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
const Page: FC<{
  params: Promise<{
    locale: Locales
    holidayUrl: string
  }>
}> = async ({ params }) => {
  const { locale, holidayUrl } = await params
  const holiday = getHolidayByHolidayUrl(holidayUrl, locale)

  if (!holiday) return <NotFound />
  const [holidayDescriptionFirstPhrase, ...holidayRestOfTheDescription] =
    holiday.description.split('.')
  return (
    <div className='container'>
      <h1 className={classes.holidayTitle}>
        {holiday.name} {new Date().toISOString()}
      </h1>
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
