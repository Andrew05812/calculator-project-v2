# ========================================
# CI/CD Скрипт для Научного калькулятора
# Практическая работа №5
# Разработчик: andrew05812
# Дата: 30 октября 2025
# ========================================

param(
    [string]$Version = "4.0",
    [string]$BuildConfig = "Release",
    [switch]$SkipTests = $false,
    [switch]$SkipInstaller = $false
)

# Цвета для вывода
$ColorSuccess = "Green"
$ColorError = "Red"
$ColorInfo = "Cyan"
$ColorWarning = "Yellow"

# Функция для красивого вывода
function Write-Step {
    param([string]$Message)
    Write-Host "`n========================================" -ForegroundColor $ColorInfo
    Write-Host "  $Message" -ForegroundColor $ColorInfo
    Write-Host "========================================`n" -ForegroundColor $ColorInfo
}

function Write-Success {
    param([string]$Message)
    Write-Host "✓ $Message" -ForegroundColor $ColorSuccess
}

function Write-Error-Message {
    param([string]$Message)
    Write-Host "✗ $Message" -ForegroundColor $ColorError
}

function Write-Info {
    param([string]$Message)
    Write-Host "→ $Message" -ForegroundColor $ColorInfo
}

function Write-Warning {
    param([string]$Message)
    Write-Host "⚠ $Message" -ForegroundColor $ColorWarning
}

# Начало скрипта
Write-Host "`n"
Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor $ColorInfo
Write-Host "║   CI/CD СКРИПТ: НАУЧНЫЙ КАЛЬКУЛЯТОР                   ║" -ForegroundColor $ColorInfo
Write-Host "║   Версия: $Version                                       ║" -ForegroundColor $ColorInfo
Write-Host "║   Конфигурация: $BuildConfig                           ║" -ForegroundColor $ColorInfo
Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor $ColorInfo
Write-Host "`n"

$StartTime = Get-Date

# ========================================
# ОСНОВНОЙ БЛОК ВЫПОЛНЕНИЯ
# ========================================
try {
    # ШАГ 1: ЗАГРУЗКА АКТУАЛЬНОГО СОСТОЯНИЯ
    Write-Step "ШАГ 1/5: Загрузка актуального состояния с сервера"
    
    Write-Info "Проверка Git репозитория..."
    if (-not (Test-Path ".git")) {
        Write-Error-Message "Не найден Git репозиторий!"
        exit 1
    }
    Write-Success "Git репозиторий найден"
    
    Write-Info "Получение обновлений с удалённого сервера..."
    git fetch origin
    if ($LASTEXITCODE -ne 0) {
        Write-Error-Message "Ошибка при получении обновлений!"
        exit 1
    }
    Write-Success "Обновления получены"
    
    Write-Info "Слияние изменений..."
    git pull origin main
    if ($LASTEXITCODE -ne 0) {
        Write-Error-Message "Ошибка при слиянии изменений!"
        exit 1
    }
    Write-Success "Изменения успешно слиты"
    
    Write-Info "Текущая ветка: $(git branch --show-current)"
    Write-Info "Последний коммит: $(git log -1 --pretty=format:'%h - %s (%an)')"
    Write-Success "Шаг 1 завершён успешно!"

    # ШАГ 2: СБОРКА ПРОЕКТА И UNIT-ТЕСТОВ
    Write-Step "ШАГ 2/5: Сборка проекта и подготовка unit-тестов"
    
    Write-Info "Проверка наличия Node.js..."
    $nodeVersion = node --version 2>$null
    if (-not $nodeVersion) {
        Write-Error-Message "Node.js не установлен!"
        exit 1
    }
    Write-Success "Node.js найден: $nodeVersion"
    
    Write-Info "Проверка package.json..."
    if (-not (Test-Path "package.json")) {
        Write-Error-Message "Файл package.json не найден!"
        exit 1
    }
    Write-Success "package.json найден"
    
    Write-Info "Очистка старых зависимостей..."
    if (Test-Path "node_modules") {
        Remove-Item -Recurse -Force "node_modules"
        Write-Success "Старые зависимости удалены"
    }
    
    Write-Info "Установка зависимостей (npm install)..."
    npm install --silent
    if ($LASTEXITCODE -ne 0) {
        Write-Error-Message "Ошибка при установке зависимостей!"
        exit 1
    }
    Write-Success "Зависимости установлены"
    
    Write-Info "Проверка наличия файлов проекта..."
    $requiredFiles = @("index.html", "style.css", "calculator.js", "script.js", "calculator.test.js")
    foreach ($file in $requiredFiles) {
        if (-not (Test-Path $file)) {
            Write-Error-Message "Файл $file не найден!"
            exit 1
        }
    }
    Write-Success "Все необходимые файлы найдены"
    Write-Success "Шаг 2 завершён успешно!"

    # ШАГ 3: ВЫПОЛНЕНИЕ UNIT-ТЕСТОВ
    if (-not $SkipTests) {
        Write-Step "ШАГ 3/5: Выполнение unit-тестов"
        
        Write-Info "Запуск тестов через Jest..."
        npm test -- --coverage --silent
        
        if ($LASTEXITCODE -ne 0) {
            Write-Error-Message "Тесты провалились!"
            Write-Error-Message "Сборка прервана из-за ошибок в тестах"
            exit 1
        }
        Write-Success "Все тесты пройдены успешно!"
        
        Write-Info "Проверка покрытия тестами..."
        if (Test-Path "coverage") {
            Write-Success "Отчёт о покрытии создан в папке 'coverage'"
        }
        Write-Success "Шаг 3 завершён успешно!"
    } else {
        Write-Step "ШАГ 3/5: Выполнение unit-тестов (ПРОПУЩЕНО)"
        Write-Warning "Тесты пропущены по запросу пользователя"
    }

    # ШАГ 4: СОЗДАНИЕ УСТАНОВЩИКА
    if (-not $SkipInstaller) {
        Write-Step "ШАГ 4/5: Создание установочного пакета"
        
        Write-Info "Проверка наличия Inno Setup..."
        $innoSetupPath = "C:\Program Files (x86)\Inno Setup 6\ISCC.exe"
        if (-not (Test-Path $innoSetupPath)) {
            Write-Warning "Inno Setup не найден по пути: $innoSetupPath"
            Write-Info "Попытка найти альтернативные пути..."
            
            $alternativePaths = @(
                "C:\Program Files\Inno Setup 6\ISCC.exe",
                "C:\Program Files (x86)\Inno Setup 5\ISCC.exe",
                "${env:ProgramFiles}\Inno Setup 6\ISCC.exe"
            )
            
            $found = $false
            foreach ($path in $alternativePaths) {
                if (Test-Path $path) {
                    $innoSetupPath = $path
                    $found = $true
                    break
                }
            }
            
            if (-not $found) {
                Write-Error-Message "Inno Setup не установлен!"
                Write-Info "Установите Inno Setup с https://jrsoftware.org/isdl.php"
                exit 1
            }
        }
        Write-Success "Inno Setup найден: $innoSetupPath"
        
        Write-Info "Подготовка файлов для установщика..."
        if (-not (Test-Path "dist")) {
            New-Item -ItemType Directory -Path "dist" | Out-Null
        }
        if (-not (Test-Path "dist\app")) {
            New-Item -ItemType Directory -Path "dist\app" | Out-Null
        }
        
        Write-Info "Копирование файлов приложения..."
        Copy-Item "index.html" "dist\app\" -Force
        Copy-Item "style.css" "dist\app\" -Force
        Copy-Item "calculator.js" "dist\app\" -Force
        Copy-Item "script.js" "dist\app\" -Force
        Copy-Item "README.md" "dist\app\" -Force
        Write-Success "Файлы скопированы"
        
        Write-Info "Проверка наличия installer.iss..."
        if (-not (Test-Path "installer.iss")) {
            Write-Error-Message "Файл installer.iss не найден!"
            exit 1
        }
        Write-Success "installer.iss найден"
        
        Write-Info "Компиляция установщика..."
        & $innoSetupPath "installer.iss"
        
        if ($LASTEXITCODE -ne 0) {
            Write-Error-Message "Ошибка при компиляции установщика!"
            exit 1
        }
        Write-Success "Установщик скомпилирован"
        
        Write-Info "Проверка созданного установщика..."
        $installerPath = "output\ScientificCalculator-Setup-v$Version.exe"
        if (-not (Test-Path $installerPath)) {
            $anyInstaller = Get-ChildItem "output\*.exe" -ErrorAction SilentlyContinue | Select-Object -First 1
            if ($anyInstaller) {
                $installerPath = $anyInstaller.FullName
                Write-Warning "Найден установщик: $installerPath"
            } else {
                Write-Error-Message "Установщик не создан!"
                exit 1
            }
        }
        
        $installerSize = (Get-Item $installerPath).Length / 1KB
        Write-Success "Установщик создан: $installerPath"
        Write-Info "Размер установщика: $([math]::Round($installerSize, 2)) KB"
        Write-Success "Шаг 4 завершён успешно!"
    } else {
        Write-Step "ШАГ 4/5: Создание установочного пакета (ПРОПУЩЕНО)"
        Write-Warning "Создание установщика пропущено по запросу пользователя"
    }

    # ШАГ 5: УСТАНОВКА ПРИЛОЖЕНИЯ
    Write-Step "ШАГ 5/5: Установка приложения"
    
    Write-Info "Поиск установщика..."
    $installerPath = Get-ChildItem "output\*.exe" -ErrorAction SilentlyContinue | Select-Object -First 1
    
    if ($installerPath) {
        Write-Success "Установщик найден: $($installerPath.Name)"
        Write-Info "Размер: $([math]::Round($installerPath.Length / 1KB, 2)) KB"
        
        Write-Host "`n"
        $response = Read-Host "Хотите запустить установщик? (Y/N)"
        
        if ($response -eq "Y" -or $response -eq "y") {
            Write-Info "Запуск установщика..."
            Start-Process $installerPath.FullName
            Write-Success "Установщик запущен"
        } else {
            Write-Warning "Установка пропущена пользователем"
            Write-Info "Вы можете запустить установщик вручную:"
            Write-Info "  $($installerPath.FullName)"
        }
    } else {
        Write-Warning "Установщик не найден в папке output"
        Write-Info "Пропускаем шаг установки"
    }
    
    Write-Success "Шаг 5 завершён!"

    # ЗАВЕРШЕНИЕ
    $EndTime = Get-Date
    $Duration = $EndTime - $StartTime
    
    Write-Host "`n"
    Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor $ColorSuccess
    Write-Host "║              CI/CD СБОРКА ЗАВЕРШЕНА УСПЕШНО!          ║" -ForegroundColor $ColorSuccess
    Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor $ColorSuccess
    Write-Host "`n"
    
    Write-Success "Все этапы выполнены успешно!"
    Write-Info "Общее время выполнения: $($Duration.Minutes) мин. $($Duration.Seconds) сек."
    Write-Info "Версия: $Version"
    Write-Info "Конфигурация: $BuildConfig"
    
    if (Test-Path "output") {
        Write-Info "`nСозданные файлы:"
        Get-ChildItem "output" | ForEach-Object {
            Write-Info "  - $($_.Name) ($([math]::Round($_.Length / 1KB, 2)) KB)"
        }
    }
    
    Write-Host "`n✓ Сборка готова к развертыванию!" -ForegroundColor $ColorSuccess
    Write-Host "`n"
    
    exit 0
}
catch {
    Write-Host "`n"
    Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor $ColorError
    Write-Host "║                ОШИБКА ПРИ СБОРКЕ!                     ║" -ForegroundColor $ColorError
    Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor $ColorError
    Write-Host "`n"
    
    Write-Host "✗ Произошла критическая ошибка:" -ForegroundColor $ColorError
    Write-Host $_.Exception.Message -ForegroundColor $ColorError
    Write-Host "`n"
    
    exit 1
}