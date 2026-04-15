import { GenerateRequest, GenerateResponse, JiraProject, JiraUserStory } from './types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

export async function generateTests(request: GenerateRequest): Promise<GenerateResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-tests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
    }

    const data: GenerateResponse = await response.json()
    return data
  } catch (error) {
    console.error('Error generating tests:', error)
    throw error instanceof Error ? error : new Error('Unknown error occurred')
  }
}

export async function fetchJiraProjects(): Promise<JiraProject[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/jira/projects`)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Error fetching Jira projects:', error)
    throw error instanceof Error ? error : new Error('Failed to fetch projects')
  }
}

export async function fetchJiraUserStories(projectKey: string): Promise<JiraUserStory[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/jira/user-stories?projectKey=${encodeURIComponent(projectKey)}`)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Error fetching Jira user stories:', error)
    throw error instanceof Error ? error : new Error('Failed to fetch user stories')
  }
}