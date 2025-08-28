# MIB Platform - Production Deployment

## 🚀 Quick Start

### Prerequisites
- Docker 20.0+
- Docker Compose v2.0+
- 8GB+ RAM recommended
- 50GB+ disk space

### 1. Clone Repository
```bash
git clone https://github.com/Oumu33/mib-platform.git
cd mib-platform/deployment
```

### 2. Environment Configuration
```bash
cp .env.template .env
# Edit .env with your settings
vi .env
```

### 3. Start Services
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Check status
docker-compose ps
```

### 4. Access Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **MySQL**: localhost:3316
- **Redis**: localhost:6389

## 🔧 Configuration

### Environment Variables
```bash
# Database
MYSQL_ROOT_PASSWORD=secure_root_password
MYSQL_PASSWORD=secure_user_password

# Redis
REDIS_PASSWORD=secure_redis_password

# Application
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### Resource Requirements
- **Frontend**: 512MB RAM, 1 CPU
- **Backend**: 1GB RAM, 2 CPU
- **MySQL**: 2GB RAM, 2 CPU
- **Redis**: 256MB RAM, 1 CPU

## 📊 Monitoring

### Health Checks
```bash
# Frontend health
curl http://localhost:3000/api/health

# Backend health
curl http://localhost:8080/api/health
```

### Logs
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs mib-frontend
docker-compose logs mib-backend
```

## 🔄 Maintenance

### Update Application
```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Backup Database
```bash
# Create backup
docker-compose exec mysql mysqldump -u root -p mib_platform > backup.sql

# Restore backup
docker-compose exec -T mysql mysql -u root -p mib_platform < backup.sql
```

### Clean Up
```bash
# Stop and remove containers
docker-compose down

# Remove volumes (WARNING: Data loss)
docker-compose down -v

# Remove images
docker-compose down --rmi all
```

## 🔒 Security

### Production Checklist
- [ ] Change default passwords
- [ ] Enable SSL/TLS certificates
- [ ] Configure firewall rules
- [ ] Set up log rotation
- [ ] Configure backup strategy
- [ ] Enable monitoring alerts

### SSL/TLS Setup
```bash
# Generate certificates
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout ssl/private.key -out ssl/certificate.crt

# Update docker-compose.yml with SSL configuration
```

## 🚫 Troubleshooting

### Common Issues

1. **Port conflicts**
   ```bash
   # Check port usage
   netstat -tulpn | grep :3000
   netstat -tulpn | grep :8080
   ```

2. **Permission issues**
   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER .
   ```

3. **Database connection**
   ```bash
   # Test MySQL connection
   docker-compose exec mysql mysql -u mib_user -p mib_platform
   ```

4. **Memory issues**
   ```bash
   # Check Docker resources
   docker system df
   docker stats
   ```

### Performance Tuning

1. **MySQL Optimization**
   - Adjust `innodb_buffer_pool_size`
   - Configure `max_connections`
   - Enable slow query log

2. **Redis Optimization**
   - Set appropriate `maxmemory`
   - Configure `maxmemory-policy`
   - Enable persistence if needed

3. **Application Tuning**
   - Adjust container resource limits
   - Configure connection pooling
   - Enable caching strategies

---

## 📞 Support

For deployment issues:
- **GitHub Issues**: [Report Issues](https://github.com/Oumu33/mib-platform/issues)
- **Documentation**: [Full Docs](../README.md)
- **Discord**: Join our community

---

*Generated with ❤️ by MIB Platform Team*