import { FC, SVGProps } from 'react'

interface SvgComponentProps extends SVGProps<SVGSVGElement> {
  title?: string
  titleId?: string
}

const SvgComponent: FC<SvgComponentProps> = ({ title, titleId, ...rest }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='currentColor'
    stroke='currentColor'
    strokeWidth={0}
    viewBox='0 0 1024 1024'
    {...rest}
  >
    <path
      stroke='none'
      d='M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z'
    />
  </svg>
)
export default SvgComponent
