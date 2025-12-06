@echo off
set BUILD_DIR=build_wasm
if not exist "%BUILD_DIR%" mkdir "%BUILD_DIR%"
cd "%BUILD_DIR%"

set EMSDK=%USERPROFILE%\emsdk
if not exist "%EMSDK%" (
  echo Emscripten SDK not found in %EMSDK%.
  echo Please install it by following the instructions at https://emscripten.org/docs/getting_started/downloads.html
  exit /b 1
)

echo Setting up Emscripten environment...
call "%EMSDK%\emsdk_env.bat"

if "%1"=="--release" (
  set OPTIMIZATION_FLAGS=-O3
  set DEBUG_FLAGS=
) else (
  set OPTIMIZATION_FLAGS=
  set DEBUG_FLAGS=-gsource-map -fsanitize=address
)

em++ ../src/cstyle.cpp ../src/repository.cpp ../src/entity.cpp -o a.out.js ^
  -sEXPORTED_RUNTIME_METHODS="[\"ccall\",\"cwrap\",\"UTF8ToString\",\"addFunction\",\"removeFunction\"]" ^
  -sALLOW_MEMORY_GROWTH ^
  -sALLOW_TABLE_GROWTH ^
  -sEXIT_RUNTIME=0 ^
  --emit-tsd interface.d.ts ^
  -sMODULARIZE ^
  -sEXPORT_ES6 ^
  %OPTIMIZATION_FLAGS% ^
  %DEBUG_FLAGS% ^
  -std=c++20 ^
  -lembind
