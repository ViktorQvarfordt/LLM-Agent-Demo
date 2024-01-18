import { AssistantCreateParams } from 'openai/resources/beta/assistants/assistants'

export const agentSpecification: AssistantCreateParams = {
  name: 'Stockholm AI Demo Agent',

  instructions:
    'You are an AI agent helping the user. Use the provided functions to perform tasks and answer questions.',

  model: 'gpt-4-1106-preview', // Supports parallel function calling
  // model: 'gpt-3.5-turbo-1106', // Supports parallel function calling
  // model: 'gpt-3.5-turbo', // Does not support parallel function calling
  // model: 'gpt-4', // Does not support parallel function calling

  tools: [
    {
      type: 'function',
      function: {
        name: 'getCurrentLocation',
        description: 'Get the current location of the user',
      },
    },

    {
      type: 'function',
      function: {
        name: 'getCurrentTime',
        description: 'Get the current time for the user',
      },
    },

    {
      type: 'function',
      function: {
        name: 'getCurrentWeather',
        description: 'Get the weather in location',
        parameters: {
          type: 'object',
          properties: {
            location: {
              type: 'string',
              description: 'The city and country',
            },
          },
          required: ['location'],
        },
      },
    },

    {
      type: 'function',
      function: {
        name: 'playMusic',
        description: 'Play music for the user',
        parameters: {
          type: 'object',
          properties: {
            songName: { type: 'string', description: 'Name of song or track' },
            artistName: { type: 'string', description: 'Name of artist' },
          },
          required: ['songName', 'artistName'],
        },
      },
    },

    {
      type: 'function',
      function: {
        name: 'sendEmail',
        description:
          'Send an email. Before using this function, show the user a preview of the email to be sent and make sure the user explicitly specified the email address.',
        parameters: {
          type: 'object',
          properties: {
            toEmail: {
              type: 'string',
              description:
                'Reciptient email. Important: The address must be explicitly specified by the user before sending.',
            },
            subject: { type: 'string', description: 'Email subject' },
            body: { type: 'string', description: 'Email text' },
          },
          required: ['toEmail', 'subject', 'body'],
        },
      },
    },
  ],
}
