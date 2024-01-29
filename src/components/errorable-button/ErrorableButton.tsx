import TooltipButton, { TooltipButtonProps } from '../tooltip-button/TooltipButton'
import { MutationFunction, MutationOptions, useErrorableMutation } from '@/hooks/useErrorableMutation'
export interface ButtonProps<Mutation, MutationVariables> extends TooltipButtonProps {
  readonly asChild?: boolean
  readonly mutation: MutationFunction<Mutation, MutationVariables>
  readonly options?: MutationOptions<Mutation, MutationVariables>
}

export default function ErrorableButton<Mutation, MutationVariables> (props: ButtonProps<Mutation, MutationVariables>): JSX.Element {
  const { mutation, options, ...rest } = props
  const execute = useErrorableMutation(mutation, options)
  return <TooltipButton {...rest} onClick={() => { void execute() }} />
}
