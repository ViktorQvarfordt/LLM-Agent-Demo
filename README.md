# LLM Agent Demo

**Agent = LLM + State + Tools**

See [this article](https://www.linkedin.com/pulse/llm-agents-overview-implementation-viktor-qvarfordt-ysdyf/) for an overview of LLM agents.

## Run code

This demo agent is a terminal-based chat interface to an agent that has some basic tools/actions.

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
> Play music that fits the mood of the weather

<< Agent requests function calls: [ getCurrentLocation({}) ]
>> Submitting function outputs: [ "Stockholm, SE" ]

<< Agent requests function calls: [ getCurrentWeather({"location":"Stockholm, SE"}) ]
>> Submitting function outputs: [ "🌨  -7°C" ]

<< Agent requests function calls: [ playMusic({"songName":"Winter Winds","artistName":"Mumford & Sons"}) ]
>> Submitting function outputs: [ "Playing Winter Winds by Mumford & Sons" ]

< I've set "Winter Winds" by Mumford & Sons to play, which should match the chilly and snowy mood of the weather in Stockholm. Enjoy the music! 🎵❄️
```
