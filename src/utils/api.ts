const API_BASE = (
  import.meta.env.VITE_API_BASE ??
  import.meta.env.VITE_API_BASE_URL ??
  ''
).replace(/\/$/, '')

const withBase = (path: string) => {
  if (!API_BASE) return path
  return `${API_BASE}${path}`
}

export const apiGet = async <T>(path: string): Promise<T> => {
  const res = await fetch(withBase(path), { credentials: 'include' })
  if (!res.ok) {
    const message = await res
      .text()
      .then((text) => text || `status ${res.status}`)
      .catch(() => `status ${res.status}`)
    const err = new Error(`GET ${path} failed: ${message}`) as Error & { status?: number }
    err.status = res.status
    throw err
  }
  return (await res.json()) as T
}

export const apiPost = async <T>(path: string, body: unknown): Promise<T> => {
  const res = await fetch(withBase(path), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    credentials: 'include',
  })
  if (!res.ok) {
    const message = await res
      .text()
      .then((text) => text || `status ${res.status}`)
      .catch(() => `status ${res.status}`)
    const err = new Error(`POST ${path} failed: ${message}`) as Error & { status?: number }
    err.status = res.status
    throw err
  }
  return (await res.json()) as T
}

export const apiPut = async <T>(path: string, body: unknown): Promise<T> => {
  const res = await fetch(withBase(path), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    credentials: 'include',
  })
  if (!res.ok) {
    const message = await res
      .text()
      .then((text) => text || `status ${res.status}`)
      .catch(() => `status ${res.status}`)
    const err = new Error(`PUT ${path} failed: ${message}`) as Error & { status?: number }
    err.status = res.status
    throw err
  }
  return (await res.json()) as T
}
