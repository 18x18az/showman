import Logo from '../../../components/primitives/logo'

export function LogoFallback (): JSX.Element {
  return (
    <div className='flex flex-col justify-evenly h-full w-full'>
      <div className='flex justify-evenly'>
        <Logo className='bg-zinc-900 rounded-2xl' viewBox='0 0 350.417 279.405' style={{ width: '65%', height: '100%' }} />
      </div>
    </div>
  )
}
