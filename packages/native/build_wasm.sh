BUILD_DIR=build_wasm
mkdir -p "${BUILD_DIR}"
cd "${BUILD_DIR}"

EMSDK=~/emsdk
if [ ! -d "${EMSDK}" ]; then
    echo "Emscripten SDK not found in ${EMSDK}."
    echo "Please install it by following the instructions at https://emscripten.org/docs/getting_started/downloads.html"
    exit 1
fi

echo "Setting up Emscripten environment..."
source ${EMSDK}/emsdk_env.sh

em++ ../src/cstyle.cpp ../src/repository.cpp ../src/entity.cpp \
  -o a.out.js \
  -gsource-map \
  -fsanitize=address \
  -sEXPORTED_RUNTIME_METHODS='["ccall","cwrap","UTF8ToString", "addFunction", "removeFunction"]' \
  -sALLOW_MEMORY_GROWTH \
  -sALLOW_TABLE_GROWTH \
  -sEXIT_RUNTIME=0 \
  --emit-tsd interface.d.ts \
  -sMODULARIZE \
  -sEXPORT_ES6 \
  -std=c++20 \
  -lembind
