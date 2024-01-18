# LLM Agent Demo

## Introduction

**Agent = LLM + State + Tools**

* The **LLM** component has the reasoning abilities to select the right action in a given situation. An action can be to respond with a message or to use a tool.
* The **State** component is the agent's memory of previous messages and results from used tools.
* The **Tools** component is the agent's ability to interact with external systems.

Agents can be triggered by manual user input or by external events. External events can be a change in a database, monitoring of an email inbox, or time-based trigger.

An autonomous agent is an agent that is triggered by an event other than a user's direct request. It gets particularly interesting when the output of the agent is used to schedule a future invocation of itself or another agent. This can be done by maintaining state in a database and scheduling triggers with something like a cron job based on the state and how it changes.

OpenAI has an API for easily building agents. The API abstracts away the complexity of dealing with the infrastructure to maintain state and orchestrate the LLM execution.

This repo uses the OpenAI Assistant API to implement a simple yet flexible tool using Agent. It's easy to extend the agent with additional tools. Enjoy!
 
See the diagrams and docs to understand the inner workings of setting up OpenAI Assistant agents: https://platform.openai.com/docs/assistants/how-it-works

## Run code

This demo agent is terminal based chat interface to agent that has some basic tools.

**Setup**

1. Clone the repo: https://github.com/ViktorQvarfordt/LLM-Agent-Demo
2. Make sure you have `node` ≥18 and `pnpm` installed
3. Run `pnpm install`
4. Get an OpenAI API key: https://platform.openai.com/api-keys

**Start**

```
OPENAI_API_KEY='OMITTED' pnpm start
```

**Example output**

```
> Play music that fit's the mood of the weather

<< Agent requests function calls: [ getCurrentLocation({}) ]
>> Submitting function outputs: [ "Stockholm, SE" ]

<< Agent requests function calls: [ getCurrentWeather({"location":"Stockholm, SE"}) ]
>> Submitting function outputs: [ "🌨  -7°C" ]

<< Agent requests function calls: [ playMusic({"songName":"Winter Winds","artistName":"Mumford & Sons"}) ]
>> Submitting function outputs: [ "Playing Winter Winds by Mumford & Sons" ]

< I've set "Winter Winds" by Mumford & Sons to play, which should match the chilly and snowy mood of the weather in Stockholm. Enjoy the music! 🎵❄️
```
