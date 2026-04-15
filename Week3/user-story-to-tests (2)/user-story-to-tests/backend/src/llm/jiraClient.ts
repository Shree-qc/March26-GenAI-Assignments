import axios, { AxiosInstance } from 'axios'

export interface JiraProject {
  id: string
  key: string
  name: string
  projectTypeKey: string
}

export interface JiraIssue {
  id: string
  key: string
  fields: {
    summary: string
    description?: string
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

export interface JiraUserStory extends JiraIssue {
  acceptanceCriteria?: string
}

export class JiraClient {
  private client: AxiosInstance

  constructor() {
    const email = process.env.JIRA_EMAIL
    const apiKey = process.env.JIRA_API_KEY
    const baseURL = process.env.JIRA_BASE_URL

    if (!email || !apiKey || !baseURL) {
      throw new Error('JIRA_EMAIL, JIRA_API_KEY, and JIRA_BASE_URL must be configured in .env')
    }

    this.client = axios.create({
      baseURL: `${baseURL}/rest/api/3`,
      auth: {
        username: email,
        password: apiKey
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }

  async getProjects(): Promise<JiraProject[]> {
    try {
      const response = await this.client.get('/project')
      return response.data
    } catch (error) {
      console.error('Error fetching Jira projects:', error)
      throw new Error('Failed to fetch projects from Jira')
    }
  }

  async getUserStories(projectKey: string): Promise<JiraUserStory[]> {
    try {
      const jql = `project = ${projectKey} AND issuetype in (Story, Task, "User Story") ORDER BY created DESC`
      const response = await this.client.get('/search/jql', {
        params: {
          jql,
          fields: 'key,summary,description,status,reporter,issuetype',
          maxResults: 100
        }
      })

      return response.data.issues || []
    } catch (error) {
      console.error('Error fetching Jira user stories:', error)
      throw new Error('Failed to fetch user stories from Jira')
    }
  }

  async getUserStory(issueKey: string): Promise<JiraUserStory | null> {
    try {
      const response = await this.client.get(`/issue/${issueKey}`, {
        params: {
          fields: 'key,summary,description,status,reporter,issuetype'
        }
      })

      return response.data
    } catch (error) {
      console.error('Error fetching Jira user story:', error)
      return null
    }
  }
}