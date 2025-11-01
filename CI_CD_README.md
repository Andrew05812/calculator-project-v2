# 🔄 CI/CD Документация

**Автор документации:** BuMcHiKa  
**Разработчик скриптов:** andrew05812, BuMcHiKa  
**Практическая работа:** №5  
**Дата:** 30 октября 2025

---

## 📋 Описание

Система непрерывной интеграции (CI/CD) для проекта "Научный калькулятор".  
Автоматизирует процессы сборки, тестирования и развертывания приложения.

---

## 🎯 Что делает CI/CD скрипт

### Основные этапы:

1. **Загрузка актуального состояния** с удалённого сервера (GitHub)
2. **Сборка проекта** и установка зависимостей
3. **Выполнение unit-тестов** (89 тестов)
4. **Создание установщика** (Windows) или архива (Linux/Mac)
5. **Установка/развертывание** приложения

---

## 🖥️ Платформы

### Windows (PowerShell)
- **Файл:** `ci-build.ps1`
- **Разработчик:** andrew05812
- **Требования:** PowerShell 5.1+, Node.js, Git, Inno Setup 6

### Linux/macOS (Bash)
- **Файл:** `ci-build.sh`
- **Разработчик:** BuMcHiKa
- **Требования:** Bash 4.0+, Node.js, Git, tar

---

## 🚀 Использование

### Windows:

#### Базовый запуск:
```powershell
.\ci-build.ps1
```

#### С параметрами:
```powershell
# Указать версию
.\ci-build.ps1 -Version "4.1"

# Пропустить тесты
.\ci-build.ps1 -SkipTests

# Пропустить создание установщика
.\ci-build.ps1 -SkipInstaller

# Комбинация параметров
.\ci-build.ps1 -Version "4.2" -SkipTests -SkipInstaller
```

### Linux/macOS:

#### Базовый запуск:
```bash
./ci-build.sh
```

#### С параметрами:
```bash
# Указать версию
./ci-build.sh --version 4.1

# Пропустить тесты
./ci-build.sh --skip-tests

# Пропустить создание архива
./ci-build.sh --skip-installer

# Комбинация параметров
./ci-build.sh --version 4.2 --skip-tests --skip-installer
```

---

## 📊 Детальное описание этапов

### Этап 1: Загрузка актуального состояния

**Что происходит:**
- Проверка наличия Git репозитория
- Получение обновлений с origin (git fetch)
- Слияние изменений (git pull)
- Отображение текущей ветки и последнего коммита

**Проверки:**
- ✅ Наличие папки `.git`
- ✅ Успешное выполнение `git fetch`
- ✅ Успешное выполнение `git pull`

**При ошибке:**
- Скрипт прерывается с кодом
- Скрипт прерывается с кодом выхода 1
- Выводится сообщение об ошибке

---

### Этап 2: Сборка проекта

**Что происходит:**
- Проверка наличия Node.js
- Проверка package.json
- Очистка старых зависимостей (node_modules)
- Установка свежих зависимостей (npm install)
- Проверка наличия всех необходимых файлов

**Проверки:**
- ✅ Node.js установлен и доступен
- ✅ package.json существует
- ✅ npm install выполнен без ошибок
- ✅ Все файлы проекта на месте:
  - index.html
  - style.css
  - calculator.js
  - script.js
  - calculator.test.js

**При ошибке:**
- Скрипт останавливается
- Выводится конкретная причина ошибки

---

### Этап 3: Выполнение unit-тестов

**Что происходит:**
- Запуск Jest с покрытием кода
- Проверка всех 89 тестов
- Создание отчёта о покрытии

**Проверки:**
- ✅ Все тесты пройдены (89/89)
- ✅ Нет критических ошибок
- ✅ Покрытие кода > 80%

**Параметры тестирования:**
- `--coverage` - генерация отчёта о покрытии
- `--silent` - минимальный вывод в консоль

**При ошибке:**
- Сборка прерывается
- Выводится информация о проваленных тестах
- Код выхода: 1

**Пропуск этапа:**
- Windows: `.\ci-build.ps1 -SkipTests`
- Linux/Mac: `./ci-build.sh --skip-tests`

---

### Этап 4: Создание установщика/архива

#### Windows (Inno Setup):

**Что происходит:**
- Поиск Inno Setup Compiler
- Создание структуры dist/app
- Копирование файлов приложения
- Компиляция installer.iss
- Создание ScientificCalculator-Setup-vX.X.exe

**Проверки:**
- ✅ Inno Setup установлен
- ✅ installer.iss существует
- ✅ Все файлы скопированы
- ✅ Компиляция успешна
- ✅ .exe файл создан в папке output/

**Пути поиска Inno Setup:**
1. `C:\Program Files (x86)\Inno Setup 6\ISCC.exe`
2. `C:\Program Files\Inno Setup 6\ISCC.exe`
3. `C:\Program Files (x86)\Inno Setup 5\ISCC.exe`

#### Linux/macOS (tar.gz):

**Что происходит:**
- Создание структуры dist/app
- Копирование файлов приложения
- Создание архива tar.gz
- Сохранение в output/

**Проверки:**
- ✅ Файлы скопированы
- ✅ Архив создан
- ✅ Размер архива адекватен

**Пропуск этапа:**
- Windows: `.\ci-build.ps1 -SkipInstaller`
- Linux/Mac: `./ci-build.sh --skip-installer`

---

### Этап 5: Установка/развертывание

#### Windows:

**Что происходит:**
- Поиск созданного .exe файла
- Запрос подтверждения у пользователя
- Запуск установщика (опционально)

**Интерактивный режим:**
```
Хотите запустить установщик? (Y/N)
```

#### Linux/macOS:

**Что происходит:**
- Отображение списка созданных артефактов
- Информация о файлах в output/
- Инструкции по развертыванию

**Развертывание вручную:**
```bash
# Распаковка архива
tar -xzf output/ScientificCalculator-v4.0.tar.gz

# Открытие приложения
open app/index.html  # macOS
xdg-open app/index.html  # Linux
```

---

## 🎨 Особенности скриптов

### Цветной вывод

**Windows (PowerShell):**
- 🟢 Зелёный - успех
- 🔴 Красный - ошибка
- 🔵 Синий - информация
- 🟡 Жёлтый - предупреждение

**Linux/macOS (Bash):**
- `\033[0;32m` - зелёный (успех)
- `\033[0;31m` - красный (ошибка)
- `\033[0;36m` - голубой (информация)
- `\033[1;33m` - жёлтый (предупреждение)

### Функции вывода

#### PowerShell:
```powershell
Write-Step "Название этапа"        # Заголовок этапа
Write-Success "Сообщение"          # Успешное действие
Write-Error-Message "Сообщение"    # Ошибка
Write-Info "Сообщение"             # Информация
Write-Warning "Сообщение"          # Предупреждение
```

#### Bash:
```bash
print_step "Название этапа"        # Заголовок этапа
print_success "Сообщение"          # Успешное действие
print_error "Сообщение"            # Ошибка
print_info "Сообщение"             # Информация
print_warning "Сообщение"          # Предупреждение
```

---

## 📈 Метрики и статистика

### Время выполнения (примерное):

| Этап | Windows | Linux/Mac |
|------|---------|-----------|
| 1. Загрузка | 5-10 сек | 5-10 сек |
| 2. Сборка | 20-30 сек | 20-30 сек |
| 3. Тесты | 5-10 сек | 5-10 сек |
| 4. Установщик/Архив | 10-15 сек | 3-5 сек |
| 5. Развертывание | 1-2 сек | 1-2 сек |
| **ИТОГО** | **~50 сек** | **~40 сек** |

### Размеры артефактов:

| Артефакт | Размер |
|----------|--------|
| Windows Installer (.exe) | ~800 KB |
| Linux/Mac Archive (.tar.gz) | ~100 KB |
| node_modules/ | ~50 MB |
| Coverage отчёт | ~500 KB |

---

## ⚙️ Системные требования

### Windows:

**Обязательно:**
- Windows 7/8/10/11
- PowerShell 5.1 или выше
- Git 2.0+
- Node.js 14.0+ (с npm)

**Для создания установщика:**
- Inno Setup 6.x
- ~2 MB свободного места

### Linux/macOS:

**Обязательно:**
- Bash 4.0+
- Git 2.0+
- Node.js 14.0+ (с npm)
- tar (обычно предустановлен)

**Опционально:**
- make (для автоматизации)

---

## 🔧 Настройка и конфигурация

### Изменение версии по умолчанию:

**Windows (ci-build.ps1):**
```powershell
# Строка 9
[string]$Version = "4.0",  # Измени на нужную версию
```

**Linux/Mac (ci-build.sh):**
```bash
# Строка 18
VERSION="4.0"  # Измени на нужную версию
```

### Изменение пути к Inno Setup:

**Windows (ci-build.ps1), строка ~143:**
```powershell
$innoSetupPath = "C:\Program Files (x86)\Inno Setup 6\ISCC.exe"
```

### Добавление дополнительных проверок:

Добавь код после соответствующего этапа:
```powershell
# Пример: проверка размера файла
if ((Get-Item "index.html").Length -lt 1000) {
    Write-Error-Message "Файл index.html слишком мал!"
    exit 1
}
```

---

## 🐛 Решение проблем

### Проблема 1: "Node.js не установлен"

**Решение:**
1. Скачай Node.js: https://nodejs.org/
2. Установи LTS версию
3. Перезапусти терминал
4. Проверь: `node --version`

---

### Проблема 2: "Git репозиторий не найден"

**Решение:**
1. Убедись, что запускаешь скрипт из корня проекта
2. Проверь наличие папки `.git`
3. Если нужно: `git init`

---

### Проблема 3: "Тесты провалились"

**Решение:**
1. Запусти тесты вручную: `npm test`
2. Посмотри какие тесты не прошли
3. Исправь ошибки в коде
4. Или пропусти тесты: `-SkipTests` / `--skip-tests`

---

### Проблема 4: "Inno Setup не найден" (Windows)

**Решение:**
1. Установи Inno Setup: https://jrsoftware.org/isdl.php
2. Или укажи правильный путь в скрипте
3. Или пропусти создание установщика: `-SkipInstaller`

---

### Проблема 5: "Permission denied" (Linux/Mac)

**Решение:**
```bash
# Сделай скрипт исполняемым
chmod +x ci-build.sh
```

---

### Проблема 6: "npm install failed"

**Решение:**
1. Удали node_modules и package-lock.json:
```bash
   rm -rf node_modules package-lock.json
```
2. Очисти кеш npm:
```bash
   npm cache clean --force
```
3. Установи заново:
```bash
   npm install
```

---

## 📚 Примеры использования

### Пример 1: Стандартная сборка
```powershell
# Windows
.\ci-build.ps1

# Результат:
# ✓ Загрузка кода
# ✓ Установка зависимостей
# ✓ Все 89 тестов пройдены
# ✓ Установщик создан
# ✓ Готово к установке
```

---

### Пример 2: Быстрая сборка без тестов
```powershell
# Windows
.\ci-build.ps1 -SkipTests

# Linux/Mac
./ci-build.sh --skip-tests

# Экономия времени: ~10 секунд
```

---

### Пример 3: Создание новой версии
```powershell
# Windows
.\ci-build.ps1 -Version "5.0"

# Linux/Mac
./ci-build.sh --version 5.0

# Результат:
# ScientificCalculator-Setup-v5.0.exe
# или
# ScientificCalculator-v5.0.tar.gz
```

---

### Пример 4: Только тестирование
```powershell
# Windows
.\ci-build.ps1 -SkipInstaller

# Linux/Mac
./ci-build.sh --skip-installer

# Проверит код и тесты, но не создаст установщик
```

---

### Пример 5: Полностью автоматическая сборка
```powershell
# Windows - создание батник-файла
# build-auto.bat
@echo off
powershell -ExecutionPolicy Bypass -File ci-build.ps1 -SkipTests
pause

# Двойной клик по build-auto.bat = автоматическая сборка
```

---

## 🔄 Интеграция с GitHub Actions

### Пример workflow файла (.github/workflows/ci.yml):
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-windows:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Run CI/CD Script
        run: .\ci-build.ps1 -SkipInstaller
        
  build-linux:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Make script executable
        run: chmod +x ci-build.sh
      - name: Run CI/CD Script
        run: ./ci-build.sh --skip-installer
```

---

## 📊 Логирование

### Сохранение логов сборки:

#### Windows:
```powershell
.\ci-build.ps1 | Tee-Object -FilePath "build-log.txt"
```

#### Linux/Mac:
```bash
./ci-build.sh 2>&1 | tee build-log.txt
```

---

## 🎯 Best Practices

### 1. Запускай CI/CD перед коммитом
```bash
# Проверь, что всё работает
./ci-build.sh

# Если успешно - делай коммит
git add .
git commit -m "Новая функция"
git push
```

### 2. Не пропускай тесты в продакшене
```bash
# Для разработки можно
./ci-build.sh --skip-tests

# Для релиза - никогда!
./ci-build.sh
```

### 3. Версионируй сборки
```bash
# Для каждого релиза - новая версия
./ci-build.sh --version 4.1
./ci-build.sh --version 4.2
```

### 4. Сохраняй логи сборок
```bash
./ci-build.sh 2>&1 | tee "logs/build-$(date +%Y%m%d-%H%M%S).log"
```

---

## 📖 Дополнительные ресурсы

### Документация:
- [Node.js](https://nodejs.org/docs/)
- [Jest Testing](https://jestjs.io/docs/getting-started)
- [Inno Setup](https://jrsoftware.org/ishelp/)
- [PowerShell](https://docs.microsoft.com/powershell/)
- [Bash Scripting](https://www.gnu.org/software/bash/manual/)

### Наш проект:
- [GitHub Repository](https://github.com/Andrew05812/calculator-project-v2)
- [Issues](https://github.com/Andrew05812/calculator-project-v2/issues)

---

## 👥 Авторы

- **andrew05812** - разработка PowerShell скрипта (ci-build.ps1)
- **BuMcHiKa** - разработка Bash скрипта (ci-build.sh), документация

---

## 📄 Лицензия

MIT License - свободное использование

---

## 📝 Changelog

### v1.0 (30.10.2025)
- ✅ Первая версия CI/CD скриптов
- ✅ Поддержка Windows (PowerShell)
- ✅ Поддержка Linux/macOS (Bash)
- ✅ Все 5 этапов реализованы
- ✅ Полная документация

---

**Дата последнего обновления:** 30 октября 2025  
**Версия документации:** 1.0  
**Составитель:** BuMcHiKa