import * as Apollo from '@apollo/client'
import { toast } from '../../primitives/toast/useToast'
import TooltipButton, { TooltipButtonProps } from '../tooltip-button/TooltipButton'

type MutationFunction<Mutation, MutationVariables> = (baseOptions?: Apollo.BaseMutationOptions<Mutation, MutationVariables>) => ReturnType<typeof Apollo.useMutation<Mutation, MutationVariables>>

export interface ButtonProps<Mutation, MutationVariables> extends TooltipButtonProps {
  asChild?: boolean
  mutation: MutationFunction<Mutation, MutationVariables>
  options?: Apollo.BaseMutationOptions<Mutation, MutationVariables>
}

export default function ErrorableButton<Mutation, MutationVariables> (props: ButtonProps<Mutation, MutationVariables>): JSX.Element {
  const { mutation, options, ...rest } = props
  const modifiedOptions = options ?? {}

  const handleError = (error: Apollo.ApolloError): void => {
    toast({
      duration: 3000,
      description: (
        <div className='text-xl flex gap-4 content-center align-center'>{error.message}</div>
      )
    })
  }

  modifiedOptions.errorPolicy = 'all'
  modifiedOptions.onError = handleError
  const [execute] = props.mutation(modifiedOptions)
  return <TooltipButton {...rest} onClick={() => { void execute() }} />
}
