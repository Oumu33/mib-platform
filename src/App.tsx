'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Badge } from '../components/ui/badge'
import { ScrollArea } from '../components/ui/scroll-area'
import { Separator } from '../components/ui/separator'
import { Progress } from '../components/ui/progress'
import { Alert, AlertDescription } from '../components/ui/alert'
import { Checkbox } from '../components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Textarea } from '../components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { toast } from 'sonner'
import { 
  Upload, 
  FileText, 
  Search, 
  Download, 
  Settings, 
  Server, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  FolderOpen,
  Database,
  Network,
  Monitor,
  Zap,
  Globe,
  Shield,
  Activity,
  BarChart3,
  Clock,
  Users,
  HardDrive,
  Cpu,
  MemoryStick,
  Wifi,
  Router,
  Eye,
  EyeOff,
  Copy,
  ExternalLink,
  RefreshCw,
  Trash2,
  Plus,
  Minus,
  ChevronDown,
  ChevronRight,
  Filter,
  SortAsc,
  SortDesc,
  X,
  Check,
  Info,
  AlertTriangle,
  Home,
  Building,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Tag,
  Hash,
  Type,
  ToggleLeft,
  ToggleRight,
  Layers,
  Package,
  Archive,
  FileArchive,
  FolderTree,
  TreePine,
  Workflow,
  GitBranch,
  Target,
  Crosshair,
  Radar,
  Satellite,
  Radio,
  Signal,
  Antenna,
  Broadcast,
  Cast,
  Share2,
  Link,
  Unlink,
  Chain,
  Anchor,
  Paperclip,
  Bookmark,
  Star,
  Heart,
  ThumbsUp,
  MessageSquare,
  Bell,
  BellRing,
  Volume2,
  VolumeX
} from 'lucide-react'

// 类型定义
interface MIBFile {
  id: string
  name: string
  size: number
  uploadTime: string
  oidCount: number
  batchId: string
  batchName: string
}

interface OID {
  id: string
  name: string
  oid: string
  type: string
  access: string
  status: string
  description: string
  translation?: string
  fileId: string
  fileName: string
}

interface SelectedOID extends OID {
  selected: boolean
}

interface ConfigTemplate {
  tool: 'snmp-exporter' | 'categraf'
  version: string
  config: any
}

interface Host {
  id: string
  name: string
  ip: string
  port: number
  username: string
  keyPath?: string
  description?: string
}

interface DeploymentTask {
  id: string
  hostId: string
  hostName: string
  status: 'pending' | 'running' | 'success' | 'failed'
  progress: number
  message?: string
  startTime?: string
  endTime?: string
}

export default function MIBPlatform() {
  // 状态管理
  const [activeTab, setActiveTab] = useState('upload')
  const [mibFiles, setMibFiles] = useState<MIBFile[]>([])
  const [selectedFile, setSelectedFile] = useState<MIBFile | null>(null)
  const [oids, setOids] = useState<OID[]>([])
  const [selectedOids, setSelectedOids] = useState<SelectedOID[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [configTemplate, setConfigTemplate] = useState<ConfigTemplate | null>(null)
  const [hosts, setHosts] = useState<Host[]>([])
  const [deploymentTasks, setDeploymentTasks] = useState<DeploymentTask[]>([])
  const [showPreview, setShowPreview] = useState(false)
  const [previewConfig, setPreviewConfig] = useState('')

  // 配置参数
  const [snmpVersion, setSnmpVersion] = useState('2c')
  const [community, setCommunity] = useState('public')
  const [timeout, setTimeout] = useState('5s')
  const [retries, setRetries] = useState('3')
  const [maxRepetitions, setMaxRepetitions] = useState('25')

  // 加载数据
  useEffect(() => {
    loadMIBFiles()
    loadHosts()
  }, [])

  // 加载MIB文件列表
  const loadMIBFiles = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/mib/files')
      if (response.ok) {
        const data = await response.json()
        setMibFiles(data)
      }
    } catch (error) {
      toast.error('加载MIB文件失败')
    } finally {
      setIsLoading(false)
    }
  }

  // 加载主机列表
  const loadHosts = async () => {
    try {
      const response = await fetch('/api/hosts')
      if (response.ok) {
        const data = await response.json()
        setHosts(data)
      }
    } catch (error) {
      toast.error('加载主机列表失败')
    }
  }

  // 文件上传处理
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const formData = new FormData()
    Array.from(files).forEach(file => {
      formData.append('files', file)
    })

    try {
      setIsLoading(true)
      setUploadProgress(0)

      const response = await fetch('/api/mib/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        toast.success(`成功上传 ${data.count} 个文件`)
        loadMIBFiles()
        setUploadProgress(100)
      } else {
        throw new Error('上传失败')
      }
    } catch (error) {
      toast.error('文件上传失败')
    } finally {
      setIsLoading(false)
      setTimeout(() => setUploadProgress(0), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* 头部 */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Database className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  MIB文件管理平台
                </h1>
              </div>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                v1.0.0
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* 标签页导航 */}
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
            <TabsTrigger value="upload" className="flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span className="hidden sm:inline">文件上传</span>
            </TabsTrigger>
            <TabsTrigger value="browse" className="flex items-center space-x-2">
              <FolderOpen className="h-4 w-4" />
              <span className="hidden sm:inline">文件浏览</span>
            </TabsTrigger>
            <TabsTrigger value="select" className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">OID选择</span>
            </TabsTrigger>
            <TabsTrigger value="config" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">配置生成</span>
            </TabsTrigger>
            <TabsTrigger value="deploy" className="flex items-center space-x-2">
              <Server className="h-4 w-4" />
              <span className="hidden sm:inline">部署管理</span>
            </TabsTrigger>
          </TabsList>

          {/* 文件上传页面 */}
          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>MIB文件上传</span>
                </CardTitle>
                <CardDescription>
                  支持单个文件或ZIP压缩包批量上传，自动解析MIB文件结构
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 上传区域 */}
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <Upload className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        拖拽文件到此处或点击选择
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        支持 .mib 文件和 .zip 压缩包
                      </p>
                    </div>
                    <Input
                      type="file"
                      multiple
                      accept=".mib,.zip"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <Label htmlFor="file-upload">
                      <Button variant="outline" className="cursor-pointer" asChild>
                        <span>
                          <FileText className="h-4 w-4 mr-2" />
                          选择文件
                        </span>
                      </Button>
                    </Label>
                  </div>
                </div>

                {/* 上传进度 */}
                {uploadProgress > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>上传进度</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}