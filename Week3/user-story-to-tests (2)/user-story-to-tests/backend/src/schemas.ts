import { z } from 'zod'

export const GenerateRequestSchema = z.object({
  projectKey: z.string().min(1, 'Project key is required'),
  issueKey: z.string().min(1, 'Issue key is required'),
  additionalInfo: z.string().optional()
})

export const TestCaseSchema = z.object({
  id: z.string(),
  title: z.string(),
  priority: z.string(),
  steps: z.array(z.string()),
  testData: z.string().optional(),
  expectedResult: z.string(),
  category: z.string()
})

export const GenerateResponseSchema = z.object({
  cases: z.array(TestCaseSchema),
  model: z.string().optional(),
  promptTokens: z.number(),
  completionTokens: z.number()
})

// Jira schemas
export const JiraProjectSchema = z.object({
  id: z.string(),
  key: z.string(),
  name: z.string(),
  projectTypeKey: z.string()
})

export const JiraUserStorySchema = z.object({
  id: z.string(),
  key: z.string(),
  fields: z.object({
    summary: z.string(),
    description: z.string().optional(),
    status: z.object({
      name: z.string()
    }),
    issuetype: z.object({
      name: z.string()
    }),
    reporter: z.object({
      displayName: z.string()
    }).optional()
  })
})

// Type exports
export type GenerateRequest = z.infer<typeof GenerateRequestSchema>
export type TestCase = z.infer<typeof TestCaseSchema>
export type GenerateResponse = z.infer<typeof GenerateResponseSchema>
export type JiraProject = z.infer<typeof JiraProjectSchema>
export type JiraUserStory = z.infer<typeof JiraUserStorySchema>