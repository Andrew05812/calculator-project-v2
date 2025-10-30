; Скрипт установщика для Научного калькулятора v3.0
; Разработчики: andrew05812, BuMcHiKa
; Практическая работа №4

[Setup]
; Основные параметры приложения
AppName=Научный калькулятор
AppVersion=3.0
AppPublisher=andrew05812 & BuMcHiKa
AppPublisherURL=https://github.com/Andrew05812/calculator-project-v2
AppSupportURL=https://github.com/Andrew05812/calculator-project-v2/issues
AppUpdatesURL=https://github.com/Andrew05812/calculator-project-v2/releases
DefaultDirName={autopf}\ScientificCalculator
DefaultGroupName=Научный калькулятор
AllowNoIcons=yes
LicenseFile=LICENSE.txt
InfoBeforeFile=INSTALL_INFO.txt
OutputDir=output
OutputBaseFilename=ScientificCalculator-Setup-v3.0
SetupIconFile=dist\icon.ico
Compression=lzma
SolidCompression=yes
WizardStyle=modern
ArchitecturesAllowed=x64compatible
ArchitecturesInstallIn64BitMode=x64compatible

; Параметры установки
PrivilegesRequired=lowest
UninstallDisplayIcon={app}\icon.ico

; Информация о версии
VersionInfoVersion=3.0.0.0
VersionInfoCompany=andrew05812 & BuMcHiKa
VersionInfoDescription=Научный калькулятор с unit-тестами
VersionInfoCopyright=Copyright (C) 2025 andrew05812 & BuMcHiKa
VersionInfoProductName=Научный калькулятор
VersionInfoProductVersion=3.0

[Languages]
Name: "russian"; MessagesFile: "compiler:Languages\Russian.isl"
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked
Name: "quicklaunchicon"; Description: "{cm:CreateQuickLaunchIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked; OnlyBelowVersion: 6.1; Check: not IsAdminInstallMode

[Files]
; Основные файлы приложения
Source: "dist\app\index.html"; DestDir: "{app}"; Flags: ignoreversion
Source: "dist\app\style.css"; DestDir: "{app}"; Flags: ignoreversion
Source: "dist\app\calculator.js"; DestDir: "{app}"; Flags: ignoreversion
Source: "dist\app\script.js"; DestDir: "{app}"; Flags: ignoreversion
Source: "dist\app\README.md"; DestDir: "{app}"; Flags: ignoreversion isreadme
Source: "dist\icon.ico"; DestDir: "{app}"; Flags: ignoreversion

; Дополнительная документация
Source: "TESTING_REPORT.md"; DestDir: "{app}"; Flags: ignoreversion
Source: "LICENSE.txt"; DestDir: "{app}"; Flags: ignoreversion
Source: "INSTALL_INFO.txt"; DestDir: "{app}"; Flags: ignoreversion

[Icons]
; Ярлыки в меню Пуск
Name: "{group}\Научный калькулятор"; Filename: "{app}\index.html"; IconFilename: "{app}\icon.ico"
Name: "{group}\Документация"; Filename: "{app}\README.md"
Name: "{group}\Отчёт о тестировании"; Filename: "{app}\TESTING_REPORT.md"
Name: "{group}\{cm:UninstallProgram,Научный калькулятор}"; Filename: "{uninstallexe}"

; Ярлык на рабочем столе
Name: "{autodesktop}\Научный калькулятор"; Filename: "{app}\index.html"; IconFilename: "{app}\icon.ico"; Tasks: desktopicon

; Ярлык в панели быстрого запуска
Name: "{userappdata}\Microsoft\Internet Explorer\Quick Launch\Научный калькулятор"; Filename: "{app}\index.html"; IconFilename: "{app}\icon.ico"; Tasks: quicklaunchicon

[Run]
; Запуск приложения после установки
Filename: "{app}\index.html"; Description: "{cm:LaunchProgram,Научный калькулятор}"; Flags: shellexec postinstall skipifsilent

[Code]
// Дополнительный код для проверки системных требований
function InitializeSetup(): Boolean;
begin
  Result := True;
  if not FileExists(ExpandConstant('{sys}\mshta.exe')) then
  begin
    MsgBox('Для работы калькулятора необходим браузер. Убедитесь, что в системе установлен веб-браузер.', mbError, MB_OK);
    Result := False;
  end;
end;