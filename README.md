# WebAssembly Memory Management Patterns and Examples

This repository explores memory management approaches in WebAssembly (Wasm) and Emscripten, focusing on convenience and minimal code in both C++ code compiled to WebAssembly and TypeScript.

## Table of Contents

- [Introduction](#introduction)
- [Memory Management Topics Illustrated](#memory-management-approaches)
- [Setup and Usage](#setup-and-usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Emscripten SDK provides a rich set of tools for building, optimizing, and troubleshooting WebAssembly modules using C++. This repository demonstrates modern patterns for memory and resource management, focusing on interoperability between C++ and JavaScript. It also includes an example of using Clang’s AddressSanitizer to detect memory leaks and memory access errors. The full article is available at [].

## Memory Management Topics Illustrated

- Configuring AddressSanitizer  
- Returning data by value vs. by reference using Embind  
- Taking advantage of the `using` clause for RAII-style automatic disposal  
- Implementing scope guards and Go-style `defer` logic  
- Handling JavaScript callbacks with exclusive memory ownership in WebAssembly

## Setup and Usage

1. Install Emscripten: Follow the [official guide](https://emscripten.org/docs/getting_started/downloads.html).
2. Build examples: Run `npm run build`.
3. Test: Run `npm test`

## Contributing

Contributions are welcome! Please open issues or pull requests for new patterns or improvements.

## License

MIT License. See LICENSE file for details.
