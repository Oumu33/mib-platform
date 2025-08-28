package main

import (
    "database/sql"
    "encoding/json"
    "fmt"
    "io"
    "log"
    "net/http"
    "os"
    "path/filepath"
    "strconv"
    "strings"
    "time"

    "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
    _ "github.com/mattn/go-sqlite3"
)

// 数据模型
type MibFile struct {
    ID          int    `json:"id" db:"id"`
    Filename    string `json:"filename" db:"filename"`
    LocalPath   string `json:"localPath" db:"local_path"`
    Size        int64  `json:"size" db:"size"`
    UploadTime  string `json:"uploadTime" db:"upload_time"`
    ParseStatus string `json:"parseStatus" db:"parse_status"`
}

type OidItem struct {
    ID          int    `json:"id" db:"id"`
    OID         string `json:"oid" db:"oid"`
    Name        string `json:"name" db:"name"`
    Type        string `json:"type" db:"type"`
    Description string `json:"description" db:"description"`
    MibFileID   int    `json:"mibFileId" db:"mib_file_id"`
}

type RemoteHost struct {
    ID            int    `json:"id" db:"id"`
    Name          string `json:"name" db:"name"`
    Host          string `json:"host" db:"host"`
    Port          int    `json:"port" db:"port"`
    Username      string `json:"username" db:"username"`
    Password      string `json:"password,omitempty" db:"password"`
    KeyPath       string `json:"keyPath,omitempty" db:"key_path"`
    Status        string `json:"status" db:"status"`
    LastConnected string `json:"lastConnected,omitempty" db:"last_connected"`
    Type          string `json:"type" db:"type"`
    ServicePort   int    `json:"servicePort" db:"service_port"`
}

type DeploymentTask struct {
    ID            int    `json:"id" db:"id"`
    HostID        int    `json:"hostId" db:"host_id"`
    ConfigContent string `json:"configContent" db:"config_content"`
    ConfigPath    string `json:"configPath" db:"config_path"`
    Status        string `json:"status" db:"status"`
    Error         string `json:"error,omitempty" db:"error"`
    CreatedAt     string `json:"createdAt" db:"created_at"`
}

type ConfigGenParams struct {
    Tool           string `json:"tool"`
    ToolVersion    string `json:"toolVersion"`
    SNMPParams     struct {
        Community string `json:"community"`
        Version   string `json:"version"`
        Timeout   int    `json:"timeout"`
        Retries   int    `json:"retries"`
    } `json:"snmpParams"`
    SelectedOidIds []int  `json:"selectedOidIds"`
    Target         string `json:"target,omitempty"`
    SNMPTarget     string `json:"snmpTarget,omitempty"`
}

type ApiResponse struct {
    Success bool        `json:"success"`
    Data    interface{} `json:"data,omitempty"`
    Error   string      `json:"error,omitempty"`
}

// 全局变量
var db *sql.DB

func main() {
    // 初始化数据库
    var err error
    db, err = sql.Open("sqlite3", "./data/mib_platform.db")
    if err != nil {
        log.Fatal("Failed to open database:", err)
    }
    defer db.Close()

    // 创建数据目录
    os.MkdirAll("./data", 0755)
    os.MkdirAll("./uploads", 0755)

    // 初始化数据库表
    initDatabase()

    // 设置Gin路由
    r := gin.Default()
    
    // CORS配置
    r.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"*"},
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowHeaders:     []string{"*"},
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: true,
    }))

    // API路由
    api := r.Group("/api")
    {
        // 路径配置相关
        api.GET("/path/default", getDefaultPath)
        api.POST("/path/validate", validatePath)
        api.POST("/path/save", savePath)

        // MIB文件管理相关
        api.POST("/mib/upload", uploadMibFile)
        api.GET("/mib/files", getMibFiles)
        api.POST("/mib/parse/:id", parseMibFile)
        api.DELETE("/mib/files/:id", deleteMibFile)

        // OID相关
        api.GET("/oids", getOidsByFile)
        api.POST("/config/generate", generateConfig)

        // 主机管理相关
        api.GET("/hosts", getHosts)
        api.POST("/hosts", addHost)
        api.POST("/hosts/:id/test", testConnection)
        api.DELETE("/hosts/:id", deleteHost)

        // 部署相关
        api.POST("/deploy", deployConfig)
        api.GET("/deployments", getDeployments)
        api.GET("/deployments/:id", getDeploymentStatus)

        // 版本管理
        api.GET("/versions/:tool", getToolVersions)
        
        // 健康检查
        api.GET("/health", func(c *gin.Context) {
            c.JSON(http.StatusOK, map[string]string{"status": "ok"})
        })
    }

    // 静态文件服务
    r.Static("/static", "./web")
    r.NoRoute(func(c *gin.Context) {
        c.File("./web/index.html")
    })

    log.Println("Server starting on :8080")
    r.Run(":8080")
}