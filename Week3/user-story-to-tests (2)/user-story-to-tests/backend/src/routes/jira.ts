import express from 'express'
import { JiraClient } from '../llm/jiraClient'

export const jiraRouter = express.Router()

jiraRouter.get('/projects', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const jiraClient = new JiraClient()
    const projects = await jiraClient.getProjects()

    res.json({
      success: true,
      data: projects
    })
  } catch (error) {
    console.error('Error in /projects route:', error)
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch projects'
    })
  }
})

jiraRouter.get('/user-stories', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const { projectKey } = req.query

    if (!projectKey || typeof projectKey !== 'string') {
      res.status(400).json({
        success: false,
        error: 'projectKey query parameter is required'
      })
      return
    }

    const jiraClient = new JiraClient()
    const userStories = await jiraClient.getUserStories(projectKey)

    res.json({
      success: true,
      data: userStories
    })
  } catch (error) {
    console.error('Error in /user-stories route:', error)
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch user stories'
    })
  }
})