export interface Character {
  id: number
  name: string
  status: string
  species: string
  image: string
  type: string
  gender: string
  created: string
  origin: Origin
  location: Location
  episode: string[]
}

export interface Origin {
  name: string
  url: string
}

export interface Location {
  name: string
  url: string
}

export interface ResponseRequest {
  info: {
    count: number
    pages: number
    next: string
    prev: string
  }
  results: Character[]
}
