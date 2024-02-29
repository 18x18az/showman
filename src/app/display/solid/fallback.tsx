import { LogoReel } from '../../../components/logo-reel/logo-reel'

export function LogoFallback (): JSX.Element {
  return (
    <div className='size-5/6 bg-white rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <LogoReel />
    </div>
  )
}
