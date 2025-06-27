import type { Size } from '@/shared/model/types'

import s from './Loader.module.scss'

import { LoadingSvg } from './assets/LoadingSvg'

export const Loader = ({
  className,
  loaderSize,
}: LoaderProps) => {
  return (
    <div className={`${s.loaderContainer} ${className}`}>
      <div
        className={s.loader}
        style={{
          width: loaderSize?.width ?? '100%',
          height: loaderSize?.height ?? '100%',
        }}
      >
        <LoadingSvg />
      </div>
    </div>
  )
}

interface LoaderProps {
  className?: string
  loaderSize?: Size
}
