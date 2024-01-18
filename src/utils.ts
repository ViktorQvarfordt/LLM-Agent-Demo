import assert from 'node:assert'
import readline from 'node:readline/promises'
import OpenAI from 'openai'
import { runFunction } from './run-function'

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

export const clearLine = () => {
  process.stdout.clearLine(0)
  process.stdout.cursorTo(0)
}

export const write = (str: string) => {
  process.stdout.write(str)
}

// Poll for updates each second until the run is completed.
// The OpenAI Agent API requires polling for updates.
// https://platform.openai.com/docs/assistants/how-it-works/polling-for-updates
export const waitForRun = async (run: OpenAI.Beta.Threads.Runs.Run) => {
  while (true) {
    if (run.status !== 'queued' && run.status !== 'in_progress') {
      return run
    }

    await new Promise(resolve => setTimeout(resolve, 1000))

    run = await openai.beta.threads.runs.retrieve(run.thread_id, run.id)
  }
}

export const handleActionRequest = async (run: OpenAI.Beta.Threads.Runs.Run) => {
  assert(run.required_action?.type === 'submit_tool_outputs')
  clearLine()
  console.log(
    `<< Agent requests function calls: [ ${run.required_action.submit_tool_outputs.tool_calls
      .map(tool => `${tool.function.name}(${tool.function.arguments.replace(/\s+/g, ' ')})`)
      .join(', ')} ]`
  )

  // Run the requested functions (in parallel)
  const functionOutputs = await Promise.all(
    run.required_action.submit_tool_outputs.tool_calls.map(async tool => {
      return {
        tool_call_id: tool.id,
        output: await runFunction(tool.function.name, JSON.parse(tool.function.arguments)),
      }
    })
  )

  console.log(
    `>> Submitting function outputs: [ ${functionOutputs.map(tool => `"${tool.output}"`).join(', ')} ]`
  )
  write('\nRunning...')

  // Give the result of the function calls to the agent
  return await waitForRun(
    await openai.beta.threads.runs.submitToolOutputs(run.thread_id, run.id, {
      tool_outputs: functionOutputs,
    })
  )
}

export const addUserInput = async (threadId: string) => {
  const content = await rl.question('> ')

  if (content === 'exit') {
    process.exit()
  }

  write('\nRunning...')

  await openai.beta.threads.messages.create(threadId, { role: 'user', content })

  return content
}

export const waitForAssistantResponse = async (threadId: string, assistantId: string) => {
  return await waitForRun(
    await openai.beta.threads.runs.create(threadId, { assistant_id: assistantId })
  )
}

export const showLatestMessage = async (threadId: string) => {
  const { data } = await openai.beta.threads.messages.list(threadId)
  assert(data[0].content[0].type === 'text')
  clearLine()
  write(`< ${data[0].content[0].text.value}\n\n`)
}
