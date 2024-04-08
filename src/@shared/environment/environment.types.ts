import { z } from 'zod'

export enum NodeEnvironment {
  DEV = 'dev', // local
  TEST = 'test',
  HMG = 'hmg',
  PRD = 'prd'
}

export const environmentSchema = z.object({
  NODE_ENV: z.nativeEnum(NodeEnvironment),
  MONGO_DB_URL: z.string().url(),
  BASE_URL: z.string().url().optional()
})

export type Environment = z.infer<typeof environmentSchema>
