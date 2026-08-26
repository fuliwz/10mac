import axios from 'axios'

// Direct API origin requested for this deployment.
export const API_BASE = 'https://www.hlzy.store'
export const ART_API_BASE = 'https://www.hlzy.store'

const clients = new Map()

function getClient(baseURL) {
  if (!clients.has(baseURL)) {
    clients.set(baseURL, axios.create({
      baseURL,
      timeout: 15000,
      paramsSerializer: { indexes: null },
    }))
  }
  return clients.get(baseURL)
}

export async function request(params = {}, baseURL = API_BASE) {
  const { data } = await getClient(baseURL).get('', {
    params: { at: 'json', ...params },
  })
  if (!data) throw new Error('API empty response')
  return data
}
