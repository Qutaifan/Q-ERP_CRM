# Dolibarr Backup Script for Windows
# Run this script regularly to backup your database and files

param(
    [string]$BackupDir = "q:\Projects\Q-ERP_CRM-main\Q-ERP_CRM-main\backups",
    [switch]$DatabaseOnly,
    [switch]$FilesOnly
)

# Configuration
$DockerContainer = "dolibarr_db"
$DatabaseName = "Qutaifan"
$DatabaseUser = "root"
$DatabasePassword = "rootpassword"
$DocumentsDir = "q:\Projects\Q-ERP_CRM-main\Q-ERP_CRM-main\documents"
$ConfFile = "q:\Projects\Q-ERP_CRM-main\Q-ERP_CRM-main\htdocs\conf\conf.php"

# Create timestamp
$Timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$BackupSubDir = Join-Path $BackupDir $Timestamp

# Create backup directory
if (!(Test-Path $BackupDir)) {
    New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null
}
New-Item -ItemType Directory -Path $BackupSubDir -Force | Out-Null

Write-Host "=== Dolibarr Backup Script ===" -ForegroundColor Cyan
Write-Host "Backup directory: $BackupSubDir" -ForegroundColor Yellow
Write-Host ""

# Database Backup
if (!$FilesOnly) {
    Write-Host "[1/3] Backing up database..." -ForegroundColor Green
    $DbBackupFile = Join-Path $BackupSubDir "database_$DatabaseName.sql"
    
    try {
        docker exec $DockerContainer mysqldump -u $DatabaseUser -p"$DatabasePassword" $DatabaseName > $DbBackupFile
        
        if (Test-Path $DbBackupFile) {
            $Size = (Get-Item $DbBackupFile).Length / 1MB
            Write-Host "      Database backup created: $([math]::Round($Size, 2)) MB" -ForegroundColor Gray
        }
    } catch {
        Write-Host "      ERROR: Database backup failed - $_" -ForegroundColor Red
    }
}

# Documents Backup
if (!$DatabaseOnly) {
    Write-Host "[2/3] Backing up documents folder..." -ForegroundColor Green
    $DocsBackupDir = Join-Path $BackupSubDir "documents"
    
    if (Test-Path $DocumentsDir) {
        try {
            Copy-Item -Path $DocumentsDir -Destination $DocsBackupDir -Recurse -Force
            $FileCount = (Get-ChildItem $DocsBackupDir -Recurse -File).Count
            Write-Host "      Documents backup created: $FileCount files" -ForegroundColor Gray
        } catch {
            Write-Host "      ERROR: Documents backup failed - $_" -ForegroundColor Red
        }
    } else {
        Write-Host "      SKIP: Documents directory not found" -ForegroundColor Yellow
    }
}

# Configuration Backup
if (!$DatabaseOnly) {
    Write-Host "[3/3] Backing up configuration..." -ForegroundColor Green
    $ConfBackupFile = Join-Path $BackupSubDir "conf.php"
    
    if (Test-Path $ConfFile) {
        Copy-Item -Path $ConfFile -Destination $ConfBackupFile -Force
        Write-Host "      Configuration backup created" -ForegroundColor Gray
    } else {
        Write-Host "      SKIP: conf.php not found" -ForegroundColor Yellow
    }
}

# Cleanup old backups (keep last 7 days)
Write-Host ""
Write-Host "Cleaning up old backups (keeping last 7 days)..." -ForegroundColor Yellow
$CutoffDate = (Get-Date).AddDays(-7)
Get-ChildItem $BackupDir -Directory | Where-Object { $_.CreationTime -lt $CutoffDate } | ForEach-Object {
    Write-Host "      Removing old backup: $($_.Name)" -ForegroundColor Gray
    Remove-Item $_.FullName -Recurse -Force
}

Write-Host ""
Write-Host "=== Backup Complete ===" -ForegroundColor Cyan
Write-Host "Location: $BackupSubDir" -ForegroundColor Green

# Create summary file
$Summary = @"
Dolibarr Backup Summary
=======================
Date: $Timestamp
Database: $DatabaseName
Documents: $DocumentsDir
Configuration: $ConfFile

To restore:
1. Database: docker exec -i $DockerContainer mysql -u $DatabaseUser -p$DatabasePassword $DatabaseName < database_$DatabaseName.sql
2. Documents: Copy documents folder back to original location
3. Configuration: Copy conf.php back to htdocs/conf/
"@
$Summary | Out-File -FilePath (Join-Path $BackupSubDir "README.txt") -Encoding UTF8
