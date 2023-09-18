import { Meta, StoryObj } from '@storybook/react'
import { Inspection, InspectionInfo, InspectionProps, InspectionSectionData } from './Inspection'
import { LoremIpsum } from 'lorem-ipsum'

const meta: Meta<typeof Inspection> = {
  component: Inspection,
  argTypes: {
    sections: {
      control: {
        type: 'array'
      }
    },
    hideComplete: {
      control: {
        type: 'boolean'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof Inspection>

function makeRandom (): () => number {
  let seed = 1
  return () => {
    const x = Math.sin(seed++) * 10000
    return x - Math.floor(x)
  }
}

const generator = new LoremIpsum({ random: makeRandom() })

function fakeRequirement (index: number): InspectionInfo {
  const description = generator.generateSentences(1)
  const rules = [`R${index}`]
  if (index % 6 === 0) {
    rules.push(`R${index / 2}`)
  }
  return {
    uuid: `R${index}`,
    description,
    rules,
    met: false
  }
}

function fakeSection (index: number, length: number, title: string): InspectionSectionData {
  return {
    uuid: `S${index}`,
    title,
    childRequirements: Array.from({ length }, (_, i) => fakeRequirement(index + i))
  }
}

const fakeRequirements: InspectionProps = { sections: [], hideComplete: true }
fakeRequirements.sections.push(fakeSection(1, 3, 'Some kind of rules'))
fakeRequirements.sections.push(fakeSection(4, 7, 'Some other kind of rules'))
fakeRequirements.sections.push(fakeSection(11, 5, 'The final kind of rules'))

export const Primary: Story = {
  args: fakeRequirements
}
