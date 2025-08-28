// MIB文件元数据类型
export interface MibFile {
  id: number
  filename: string
  localPath: string
  size: number
  uploadTime: string
  parseStatus: "pending" | "success" | "failed"
  oidCount?: number
  batchId?: string      // 批次ID，用于组织文件
  batchSource?: string  // 批次源（ZIP文件名或单文件名）
  source?: string       // 文件来源描述
}

// OID解析结果类型
export interface OidItem {
  id: number
  oid: string
  name: string
  type: string
  description: string
  mibFileId: number
}

// 远程主机配置类型
export interface RemoteHost {
  id: number
  name: string
  host: string
  port: number
  username: string
  keyPath?: string
  status: "connected" | "disconnected" | "connecting" | "error"
  lastConnected?: string
  type: "snmp-exporter" | "categraf" | "vmagent" // 主机类型
  deployPath?: string
  servicePort?: number // 服务端口（snmp-exporter:9116, categraf:8080, vmagent:8429）
}

// SNMP监控目标设备
export interface SnmpTarget {
  id: number
  name: string // 设备名称，如"核心交换机-01"
  address: string // 设备IP地址
  community: string
  version: "v2c" | "v3"
  assignedCollector?: number // 分配给哪个SNMP采集器
}

// 配置生成参数类型
export interface ConfigGenParams {
  tool: "snmp-exporter" | "categraf" | "vmagent"
  toolVersion: string
  snmpParams: {
    community: string
    version: "v2c" | "v3"
    timeout: number
    retries: number
  }
  selectedOidIds: number[]
  target: string
  snmpTarget?: string // SNMP目标设备地址
}

// GitHub版本信息类型
export interface GitHubRelease {
  tag_name: string
  name: string
  published_at: string
  prerelease: boolean
}

// 部署任务类型
export interface DeploymentTask {
  id: number
  hostId: number
  hostName: string
  configPath: string
  status: "pending" | "deploying" | "success" | "failed"
  progress: number
  error?: string
  createdAt: string
  completedAt?: string
}

// API响应类型
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}