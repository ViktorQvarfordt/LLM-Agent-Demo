const get = async (url: string) => {
  const res = await fetch(url)
  const txt = await res.text()
  return txt.trim()
}

export const runFunction = async (name: string, args: Record<string, unknown>) => {
  switch (name) {
    case 'getCurrentLocation': {
      const txt = await get('https://ipinfo.io/json')
      const { city, country } = JSON.parse(txt)
      return `${city}, ${country}`
    }

    case 'getCurrentWeather': {
      return await get(`https://wttr.in/${encodeURIComponent(args.location as string)}?format=1`)
    }

    case 'getCurrentTime': {
      return new Date().toString()
    }

    case 'playMusic': {
      // await fetch('https://example.com/play-music')
      return `Playing ${args.songName} by ${args.artistName}`
    }

    case 'sendEmail': {
      // await fetch('https://example.com/send-email')
      return `Ok`
    }

    default: {
      throw new Error(`Unknown function ${name}`)
    }
  }
}
