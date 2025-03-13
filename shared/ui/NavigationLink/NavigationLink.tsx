'use client'

import { Link } from '@/navigation'
import { useSelectedLayoutSegment } from 'next/navigation'
import { ComponentProps } from 'react'

const NavigationLink = ({
  href,
  ...rest
}: ComponentProps<typeof Link>) =>{
  const selectedLayoutSegment = useSelectedLayoutSegment()
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/'
  const isActive = pathname === href

  return <Link aria-current={isActive ? 'page' : undefined} href={href} {...rest} />
}
export default NavigationLink
