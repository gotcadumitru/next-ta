import { getDayOfMonth, getHolidaysByDayAndMonthParams } from '@/enteties/holiday'
import { locales } from '@/shared/config/i18n/consts'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ locale: string }> }) {
  console.log(params)
  const dateFromParams = req.nextUrl.searchParams.get('date')
  if (!dateFromParams) return new Response(JSON.stringify([]))

  const date = new Date(dateFromParams)
  const day = getDayOfMonth(date.getDate())
  const month = getDayOfMonth(date.getMonth() + 1)
  const holidaysCombinedByLanguage = locales.reduce(
    (holidaysByLanguage, locale) => ({
      ...holidaysByLanguage,
      [locale]:
        getHolidaysByDayAndMonthParams({
          day,
          month,
          locale,
        })?.holidays.at(0) || null,
    }),
    {},
  )
  return new Response(JSON.stringify(holidaysCombinedByLanguage))
}
