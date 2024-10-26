import { Message } from 'src/shared/types'
import Base, { onResultChange } from './base'
import { ApiError } from './errors'

// import ollama from 'ollama/browser'

interface Options {
    myOwnKey: string
    myOwnApiHost: string
}

export default class MyOwn extends Base {
    public name = 'MyOwn'

    public options: Options
    constructor(options: Options) {
        super()
        this.options = options
    }

    async callChatCompletion(rawMessages: Message[], signal?: AbortSignal, onResultChange?: onResultChange): Promise<string> {
        const messages = rawMessages.map(m => ({ role: m.role, content: m.content }))
        const res = await this.post(
            `${this.options.myOwnApiHost}`,
            { 'Content-Type': 'application/json' },
            {
                model: this.options.myOwnApiHost,
                messages,
                stream: true,
            },
            signal,
        )
        let result = ''
        await this.handleNdjson(res, (message) => {
            const data = JSON.parse(message)
            if (data['done']) {
                return
            }
            const word = data['message']?.['content']
            if (!word) {
                throw new ApiError(JSON.stringify(data))
            }
            result += word
            if (onResultChange) {
                onResultChange('test')
            }
        })
        return result
    }
}
