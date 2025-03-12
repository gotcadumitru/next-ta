import { FC, SVGProps } from 'react'

interface SvgComponentProps extends SVGProps<SVGSVGElement> {
  title?: string
  titleId?: string
}

const SvgComponent: FC<SvgComponentProps> = ({ title, titleId, ...rest }) => (
  <svg
    stroke='currentColor'
    fill='currentColor'
    strokeWidth='0'
    viewBox='0 0 24 24'
    height='1em'
    width='1em'
    xmlns='http://www.w3.org/2000/svg'
    {...rest}
  >
    <g id='Circle_More'>
      <g>
        <circle cx='12.001' cy='12' r='1' />
        <circle cx='16.001' cy='12' r='1' />
        <circle cx='8.001' cy='12' r='1' />
        <path d='M12,21.932A9.934,9.934,0,1,1,21.934,12,9.944,9.944,0,0,1,12,21.932ZM12,3.065A8.934,8.934,0,1,0,20.934,12,8.944,8.944,0,0,0,12,3.065Z' />
      </g>
    </g>
  </svg>
)
export default SvgComponent
