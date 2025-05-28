// import { cache } from '@emotion/css'
import createCache from '@emotion/cache'

export const emotionCache = createCache({ key: 'css', prepend: true })