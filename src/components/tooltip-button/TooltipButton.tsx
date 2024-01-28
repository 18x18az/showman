import { VariantProps } from 'class-variance-authority'
import { Button, buttonVariants } from '../../primitives/button/Button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

export interface TooltipButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  tooltip?: string
}

export default function TooltipButton (props: TooltipButtonProps): JSX.Element {
  const { tooltip, ...rest } = props

  if (tooltip === undefined) {
    return <Button {...rest} />
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button {...rest} />
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
