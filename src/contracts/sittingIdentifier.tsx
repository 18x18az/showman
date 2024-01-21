import { gql } from '../__generated__'

export const SITTING_IDENTIFIER = gql(`
  fragment SittingInformation on Sitting {
    id
    contest {
      round
      number
    }
    match {
      number
    }
  }
`)
