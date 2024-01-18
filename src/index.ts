import { agentSpecification } from './agent-specification'
import {
  addUserInput,
  handleActionRequest,
  openai,
  showLatestMessage,
  waitForAssistantResponse,
  write,
} from './utils'

const runAgent = async () => {
  write('Creating agent...')

  const assistant = await openai.beta.assistants.create(agentSpecification)
  const thread = await openai.beta.threads.create({ messages: [] })

  await addUserInput(thread.id)
  let lastRun = await waitForAssistantResponse(thread.id, assistant.id)

  while (true) {
    if (lastRun.status === 'completed') {
      await showLatestMessage(thread.id)
      await addUserInput(thread.id)
      lastRun = await waitForAssistantResponse(thread.id, assistant.id)
    } else if (lastRun.status === 'requires_action') {
      lastRun = await handleActionRequest(lastRun)
    } else {
      console.error(lastRun)
      throw new Error(`Unknown run status ${lastRun.status}`)
    }
  }
}

runAgent()
