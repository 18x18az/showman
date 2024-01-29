import * as Apollo from '@apollo/client'
import { toast } from '@/primitives/toast/useToast'

export type MutationFunction<Mutation, MutationVariables> = (baseOptions?: Apollo.BaseMutationOptions<Mutation, MutationVariables>) => ReturnType<typeof Apollo.useMutation<Mutation, MutationVariables>>
type MutationExecution<Mutation, MutationVariables> = ReturnType<typeof Apollo.useMutation<Mutation, MutationVariables>>[0]
export type MutationOptions<Mutation, MutationVariables> = Apollo.BaseMutationOptions<Mutation, MutationVariables>

export function useErrorableMutation<Mutation, MutationVariables> (
  mutation: MutationFunction<Mutation, MutationVariables>,
  options?: MutationOptions<Mutation, MutationVariables>
): MutationExecution<Mutation, MutationVariables> {
  const handleError = (error: Apollo.ApolloError): void => {
    toast({
      duration: 3000,
      description: (
        <div className='text-xl flex gap-4 content-center align-center'>{error.message}</div>
      )
    })
  }

  const modifiedOptions = options ?? {}
  modifiedOptions.errorPolicy = 'all'
  modifiedOptions.onError = handleError

  const [execute] = mutation(modifiedOptions)
  return execute
}
