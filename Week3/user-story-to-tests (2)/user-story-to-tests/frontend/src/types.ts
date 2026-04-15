export interface GenerateRequest {
  projectKey: string
  issueKey: string
  additionalInfo?: string
}

export interface JiraProject {
  id: string
  key: string
  name: string
  projectTypeKey: string
}

export interface JiraUserStory {
  id: string
  key: string
  fields: {
    summary: string
    description?: string | Record<string, unknown>
    status: {
      name: string
    }
    issuetype: {
      name: string
    }
    reporter?: {
      displayName: string
    }
  }
}

export interface TestCase {
  id: string
  title: string
  priority: string
  steps: string[]
  testData?: string
  expectedResult: string
  category: string
}

export interface GenerateResponse {
  cases: TestCase[]
  model?: string
  promptTokens: number
  completionTokens: number
}