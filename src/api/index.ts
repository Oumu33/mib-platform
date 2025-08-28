const API_BASE = '/api'

export const api = {
  // MIB文件管理
  uploadMibFile: async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await fetch(`${API_BASE}/mib/upload`, {
      method: 'POST',
      body: formData,
    })
    return response.json()
  },

  getMibFiles: async () => {
    const response = await fetch(`${API_BASE}/mib/files`)
    return response.json()
  },

  getOids: async (mibFileId: number) => {
    const response = await fetch(`${API_BASE}/mib/files/${mibFileId}/oids`)
    return response.json()
  },

  // 主机管理
  getHosts: async () => {
    const response = await fetch(`${API_BASE}/hosts`)
    return response.json()
  },

  addHost: async (host: Omit<RemoteHost, 'id'>) => {
    const response = await fetch(`${API_BASE}/hosts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(host),
    })
    return response.json()
  },

  testConnection: async (hostId: number) => {
    const response = await fetch(`${API_BASE}/hosts/${hostId}/test`, {
      method: 'POST',
    })
    return response.json()
  },

  // 配置生成
  generateConfig: async (params: ConfigGenParams) => {
    const response = await fetch(`${API_BASE}/config/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    })
    return response.json()
  },

  // 部署
  deploy: async (hostId: number, config: string) => {
    const response = await fetch(`${API_BASE}/deployments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hostId, config }),
    })
    return response.json()
  },

  getDeployments: async () => {
    const response = await fetch(`${API_BASE}/deployments`)
    return response.json()
  },
}

export default api