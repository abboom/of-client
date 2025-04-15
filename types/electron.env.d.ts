export {} // Make this a module

declare global {
  const SERVER_PORT: number
  const MODE: 'production' | 'development'
  const BASE_URL: string
}
