import { defineStore } from 'pinia'

export const useRequestStore = defineStore('fetchRequest', {
  // state: () => ({urlapi: 0}),
  // getters: {
  //   string: (state) => state.urlapi
  // },
  actions: {
    async urlRequest(urlapi: string, method: string, body?: FormData) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}${urlapi}`,
          {
            method: method,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          },
        )

        return await response.json()
      } catch (error) {
        throw new Error('Error al realizar la petición' + error)
      }
    },
    // async getAPi(urlapi: string) {
    //   const response = await fetch(`${import.meta.env.VITE_API_URL}${urlapi}`)
    //   return await response.json()
    // },
  },
})
