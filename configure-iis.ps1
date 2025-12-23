# IIS PHP FastCGI Configuration Script for Dolibarr
# Run this script as Administrator!

#Requires -RunAsAdministrator

Write-Host "=== IIS PHP FastCGI Configuration ===" -ForegroundColor Cyan
Write-Host ""

# Import IIS module
Import-Module WebAdministration
Write-Host "[1/6] WebAdministration module loaded" -ForegroundColor Green

# Variables
$phpPath = "C:\php\php-cgi.exe"
$sitePath = "q:\Projects\Q-ERP_CRM-main\Q-ERP_CRM-main\htdocs"
$siteName = "Dolibarr"
$sitePort = 8080

# Check if PHP exists
if (!(Test-Path $phpPath)) {
    Write-Host "ERROR: PHP not found at $phpPath" -ForegroundColor Red
    exit 1
}
Write-Host "[2/6] PHP found at $phpPath" -ForegroundColor Green

# Remove existing FastCGI app if exists
try {
    $existingApp = Get-WebConfiguration -Filter "/system.webServer/fastCgi/application[@fullPath='$phpPath']" -PSPath 'IIS:\'
    if ($existingApp) {
        Remove-WebConfigurationProperty -PSPath 'IIS:\' -Filter "system.webServer/fastCgi" -Name "." -AtElement @{fullPath=$phpPath}
        Write-Host "[3/6] Removed existing FastCGI config" -ForegroundColor Yellow
    }
} catch {}

# Add FastCGI application
Add-WebConfiguration -Filter /system.webServer/fastCgi -PSPath 'IIS:\' -Value @{
    fullPath = $phpPath
    arguments = ''
    maxInstances = 4
    idleTimeout = 300
    activityTimeout = 600
    requestTimeout = 600
    instanceMaxRequests = 10000
}
Write-Host "[3/6] FastCGI application registered" -ForegroundColor Green

# Add environment variables for PHP
Add-WebConfiguration -Filter "/system.webServer/fastCgi/application[@fullPath='$phpPath']/environmentVariables" -PSPath 'IIS:\' -Value @{
    name = 'PHP_FCGI_MAX_REQUESTS'
    value = '10000'
}
Add-WebConfiguration -Filter "/system.webServer/fastCgi/application[@fullPath='$phpPath']/environmentVariables" -PSPath 'IIS:\' -Value @{
    name = 'PHPRC'
    value = 'q:\Projects\Q-ERP_CRM-main\Q-ERP_CRM-main'
}
Write-Host "[4/6] PHP environment variables set" -ForegroundColor Green

# Remove existing site if exists
if (Get-Website -Name $siteName -ErrorAction SilentlyContinue) {
    Remove-Website -Name $siteName
    Write-Host "       Removed existing $siteName site" -ForegroundColor Yellow
}

# Create new website
New-Website -Name $siteName -PhysicalPath $sitePath -Port $sitePort -Force | Out-Null
Write-Host "[5/6] Website '$siteName' created on port $sitePort" -ForegroundColor Green

# Add PHP handler to the site
New-WebHandler -PSPath "IIS:\Sites\$siteName" -Name "PHP_via_FastCGI" -Path "*.php" -Verb "*" -Modules "FastCgiModule" -ScriptProcessor $phpPath -ResourceType "Either" -RequiredAccess "Script"
Write-Host "[6/6] PHP handler mapping added" -ForegroundColor Green

# Set default document
Set-WebConfigurationProperty -PSPath "IIS:\Sites\$siteName" -Filter "system.webServer/defaultDocument/files" -Name "." -Value @{value='index.php'}

# Start the site
Start-Website -Name $siteName

Write-Host ""
Write-Host "=== Configuration Complete ===" -ForegroundColor Cyan
Write-Host "Dolibarr is now accessible at: http://localhost:$sitePort/" -ForegroundColor Green
Write-Host ""
Write-Host "You can now stop the PHP dev server and use IIS instead." -ForegroundColor Yellow
