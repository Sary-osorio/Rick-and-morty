import urlRequestService from '@/services/ApiServices'
import { defineStore } from 'pinia'

export const useRequestStore = defineStore('fetchRequest', {
  actions: {
    async getCharachters() {
      try {
        const response = await urlRequestService('character', 'GET')
        return response
      } catch (error) {
        throw new Error('Error al realizar la petición' + error)
      }
    },

    async getCharachtersByStatus(status: string) {
      try {
        const response = await urlRequestService(
          `character/?status=${status}`,
          'GET',
        )
        return response
      } catch (error) {
        throw new Error('Error al realizar la petición' + error)
      }
    },
    async getCharachtersByStatusPages(status: string, page: number) {
      try {
        const response = await urlRequestService(
          `character/?page=${page}&status=${status}`,
          'GET',
        )
        console.log(response)
        return response
      } catch (error) {
        throw new Error('Error al realizar la petición' + error)
      }
    },
    async getCharactersPage(page: number) {
      console.log('page', page)
      try {
        const response = await urlRequestService(
          `character/?page=${page}`,
          'GET',
        )
        const data = await response
        return data
      } catch (error) {
        throw new Error('Error al realizar la petición' + error)
      }
    },

    // async urlRequest(urlapi: string, method: string, body?: FormData) {
    //   try {
    //     const response = await fetch(
    //       `${import.meta.env.VITE_API_URL}${urlapi}`,
    //       {
    //         method: method,
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(body),
    //       },
    //     )

    //     return await response.json()
    //   } catch (error) {
    //     throw new Error('Error al realizar la petición' + error)
    //   }
    // },
  },
})
