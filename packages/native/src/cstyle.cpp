#include <stdio.h>
#include <string>
#include <emscripten.h>
#include <sanitizer/lsan_interface.h>

extern "C"
{
  EMSCRIPTEN_KEEPALIVE void lsan_check_now() {
    __lsan_do_recoverable_leak_check();
    printf("LSan leak check done\n");
  }

  EMSCRIPTEN_KEEPALIVE const char* hello_from_native() {
    return new char[]{"Hello from native code!"};
  }

  EMSCRIPTEN_KEEPALIVE void release_mem(void *ptr) {
    delete[] static_cast<char*>(ptr);
  }

  EMSCRIPTEN_KEEPALIVE void js_callback(void (*cb)(const char* str)) {
    std::string message = "Callback called from native code";
    cb(message.c_str());
  }
}
