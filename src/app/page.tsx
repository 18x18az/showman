'use client'
import { InputNumber } from '@/components/primitives/InputNumber'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react';

export default function Home (): JSX.Element | null {
  const [mounted, setMounted] = useState(false);
  
  const {setTheme, resolvedTheme} = useTheme()

  useEffect(() => setMounted(true), []);

  console.log(mounted)

  if (!mounted) return null;

  if(resolvedTheme === undefined) {
    setTheme('dark')
  }
  
  console.log(resolvedTheme)
  return (
    <div>
      <InputNumber id='test' value={0} />
    </div>
  )
}
