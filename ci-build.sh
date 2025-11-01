#!/bin/bash

# ========================================
# CI/CD Скрипт для Научного калькулятора
# Практическая работа №5
# Разработчик: BuMcHiKa
# Дата: 30 октября 2025
# Платформа: Linux/macOS
# ========================================

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Параметры по умолчанию
VERSION="4.0"
BUILD_CONFIG="Release"
SKIP_TESTS=false
SKIP_INSTALLER=false

# Обработка параметров
while [[ $# -gt 0 ]]; do
    case $1 in
        --version)
            VERSION="$2"
            shift 2
            ;;
        --skip-tests)
            SKIP_TESTS=true
            shift
            ;;
        --skip-installer)
            SKIP_INSTALLER=true
            shift
            ;;
        *)
            echo "Неизвестный параметр: $1"
            exit 1
            ;;
    esac
done

# Функции для вывода
print_step() {
    echo -e "\n${CYAN}========================================${NC}"
    echo -e "${CYAN}  $1${NC}"
    echo -e "${CYAN}========================================${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${CYAN}→ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Начало скрипта
echo ""
echo -e "${CYAN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║   CI/CD СКРИПТ: НАУЧНЫЙ КАЛЬКУЛЯТОР                   ║${NC}"
echo -e "${CYAN}║   Версия: $VERSION                                       ║${NC}"
echo -e "${CYAN}║   Конфигурация: $BUILD_CONFIG                           ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

START_TIME=$(date +%s)

# ========================================
# ШАГ 1: ЗАГРУЗКА АКТУАЛЬНОГО СОСТОЯНИЯ
# ========================================
print_step "ШАГ 1/5: Загрузка актуального состояния с сервера"

print_info "Проверка Git репозитория..."
if [ ! -d ".git" ]; then
    print_error "Не найден Git репозиторий!"
    exit 1
fi
print_success "Git репозиторий найден"

print_info "Получение обновлений с удалённого сервера..."
git fetch origin
if [ $? -ne 0 ]; then
    print_error "Ошибка при получении обновлений!"
    exit 1
fi
print_success "Обновления получены"

print_info "Слияние изменений..."
git pull origin main
if [ $? -ne 0 ]; then
    print_error "Ошибка при слиянии изменений!"
    exit 1
fi
print_success "Изменения успешно слиты"

CURRENT_BRANCH=$(git branch --show-current)
LAST_COMMIT=$(git log -1 --pretty=format:'%h - %s (%an)')
print_info "Текущая ветка: $CURRENT_BRANCH"
print_info "Последний коммит: $LAST_COMMIT"
print_success "Шаг 1 завершён успешно!"

# ========================================
# ШАГ 2: СБОРКА ПРОЕКТА И UNIT-ТЕСТОВ
# ========================================
print_step "ШАГ 2/5: Сборка проекта и подготовка unit-тестов"

print_info "Проверка наличия Node.js..."
if ! command -v node &> /dev/null; then
    print_error "Node.js не установлен!"
    exit 1
fi
NODE_VERSION=$(node --version)
print_success "Node.js найден: $NODE_VERSION"

print_info "Проверка package.json..."
if [ ! -f "package.json" ]; then
    print_error "Файл package.json не найден!"
    exit 1
fi
print_success "package.json найден"

print_info "Очистка старых зависимостей..."
if [ -d "node_modules" ]; then
    rm -rf node_modules
    print_success "Старые зависимости удалены"
fi

print_info "Установка зависимостей (npm install)..."
npm install --silent
if [ $? -ne 0 ]; then
    print_error "Ошибка при установке зависимостей!"
    exit 1
fi
print_success "Зависимости установлены"

print_info "Проверка наличия файлов проекта..."
REQUIRED_FILES=("index.html" "style.css" "calculator.js" "script.js" "calculator.test.js")
for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        print_error "Файл $file не найден!"
        exit 1
    fi
done
print_success "Все необходимые файлы найдены"
print_success "Шаг 2 завершён успешно!"

# ========================================
# ШАГ 3: ВЫПОЛНЕНИЕ UNIT-ТЕСТОВ
# ========================================
if [ "$SKIP_TESTS" = false ]; then
    print_step "ШАГ 3/5: Выполнение unit-тестов"
    
    print_info "Запуск тестов через Jest..."
    npm test -- --coverage --silent
    
    if [ $? -ne 0 ]; then
        print_error "Тесты провалились!"
        print_error "Сборка прервана из-за ошибок в тестах"
        exit 1
    fi
    print_success "Все тесты пройдены успешно!"
    
    print_info "Проверка покрытия тестами..."
    if [ -d "coverage" ]; then
        print_success "Отчёт о покрытии создан в папке 'coverage'"
    fi
    print_success "Шаг 3 завершён успешно!"
else
    print_step "ШАГ 3/5: Выполнение unit-тестов (ПРОПУЩЕНО)"
    print_warning "Тесты пропущены по запросу пользователя"
fi

# ========================================
# ШАГ 4: СОЗДАНИЕ АРХИВА ПРОЕКТА
# ========================================
if [ "$SKIP_INSTALLER" = false ]; then
    print_step "ШАГ 4/5: Создание архива проекта"
    
    print_info "Подготовка файлов для архива..."
    mkdir -p dist/app
    
    print_info "Копирование файлов приложения..."
    cp index.html dist/app/
    cp style.css dist/app/
    cp calculator.js dist/app/
    cp script.js dist/app/
    cp README.md dist/app/
    print_success "Файлы скопированы"
    
    print_info "Создание архива..."
    mkdir -p output
    ARCHIVE_NAME="ScientificCalculator-v${VERSION}.tar.gz"
    tar -czf "output/${ARCHIVE_NAME}" -C dist app/
    
    if [ $? -ne 0 ]; then
        print_error "Ошибка при создании архива!"
        exit 1
    fi
    
    ARCHIVE_SIZE=$(du -h "output/${ARCHIVE_NAME}" | cut -f1)
    print_success "Архив создан: output/${ARCHIVE_NAME}"
    print_info "Размер архива: $ARCHIVE_SIZE"
    print_success "Шаг 4 завершён успешно!"
else
    print_step "ШАГ 4/5: Создание архива (ПРОПУЩЕНО)"
    print_warning "Создание архива пропущено по запросу пользователя"
fi

# ========================================
# ШАГ 5: РАЗВЕРТЫВАНИЕ
# ========================================
print_step "ШАГ 5/5: Развертывание приложения"

if [ -d "output" ] && [ "$(ls -A output)" ]; then
    print_success "Артефакты найдены в папке output/"
    print_info "Список файлов:"
    ls -lh output/ | tail -n +2 | awk '{print "  - " $9 " (" $5 ")"}'
    
    print_info "Приложение готово к развёртыванию"
    print_warning "Для запуска откройте файл dist/app/index.html в браузере"
else
    print_warning "Артефакты не найдены"
fi

print_success "Шаг 5 завершён!"

# ========================================
# ЗАВЕРШЕНИЕ
# ========================================
END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))

echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║              CI/CD СБОРКА ЗАВЕРШЕНА УСПЕШНО!          ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

print_success "Все этапы выполнены успешно!"
print_info "Общее время выполнения: $DURATION секунд"
print_info "Версия: $VERSION"
print_info "Конфигурация: $BUILD_CONFIG"

if [ -d "output" ]; then
    print_info "\nСозданные файлы:"
    ls -lh output/ | tail -n +2 | awk '{print "  - " $9 " (" $5 ")"}'
fi

echo ""
print_success "Сборка готова к развертыванию!"
echo ""

exit 0