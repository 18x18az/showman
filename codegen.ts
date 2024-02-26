import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:3002/graphql',
  documents: ['./src/graphql/**/*.graphql'],
  generates: {
    './src/__generated__/graphql.ts': {
      config: {
        avoidOptionals: {
          object: true,
          field: true,
          inputValue: false,
          defaultValue: true
        }
      },
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo']
    }
  }
}

export default config
