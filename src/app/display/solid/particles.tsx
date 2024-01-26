import { loadSlim } from '@tsparticles/slim'
import { useEffect, useMemo, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import {
  type Container,
  type ISourceOptions
} from '@tsparticles/engine'

export function ParticlesBg (): JSX.Element {
  const [init, setInit] = useState(false)

  useEffect(() => {
    void initParticlesEngine(async (engine) => {
      await loadSlim(engine)
      setInit(true)
    }).then(() => {
      setInit(true)
    })
  }, [])

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log('particles loaded')
    console.log(container)
  }

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: {
        enable: true,
        zIndex: -1
      },
      background: {
        color: {
          value: '#27272a'
        }
      },
      particles: {
        move: {
          enable: true,
          speed: 0.6
        },
        number: {
          value: 80
        },
        links: {
          color: '#a1a1aa',
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1
        },
        shape: {
          type: 'circle'
        },
        size: {
          value: { min: 0.5, max: 2.5 }
        }
      }
    }),
    []
  )

  if (init) {
    return (
      <Particles
        id='tsparticles'
        particlesLoaded={particlesLoaded}
        options={options}
      />
    )
  }

  return <>Nope</>
}
