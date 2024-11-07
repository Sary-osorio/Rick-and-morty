export interface apiData {
  info: {
    count: 0
    pages: 0
    next: ''
    prev: ''
  }
  results: []
}

const urlRequestService = async (
  urlapi: string,
  method: string,
  body?: FormData,
): Promise<apiData> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${urlapi}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    return await response.json()
  } catch (error) {
    throw new Error('Error al realizar la petición' + error)
  }
}

export default urlRequestService

// import { useRequestStore } from './../stores/requestApi'

// const useRequest = useRequestStore()

// export default {

//  getCharacters = async () => {
//   try {
//     const response = await useRequest.urlRequest(`character`, 'GET')
//     const data = await response
//     return data
//   } catch (error) {
//     throw new Error('Error al realizar la petición' + error)
//   }
// }

//  getCharactersByStatus = async (status: string) => {
//   try {
//     const response = await useRequest.urlRequest(
//       `character/?status=${status}`,
//       'GET',
//     )
//     const data = await response
//     return data
//   } catch (error) {
//     throw new Error('Error al realizar la petición' + error)
//   }
// }

//  getCharactersPage = async (page: number) => {
//   try {
//     const response = await useRequest.urlRequest(
//       `character/?page=${page}`,
//       'GET',
//     )
//     const data = await response
//     return data
//   } catch (error) {
//     throw new Error('Error al realizar la petición' + error)
//   }
// }

// }
