export function scope<T, R>(
  cleanup: (resource: R) => void,
  body: (defer: (res: R) => void) => T
): T {
  const cleanups: Array<R> = [];

  const defer = (res: R) => {
    cleanups.push(res);
  };

  try {
    return body(defer);
  } finally {
    for (let i = cleanups.length - 1; i >= 0; --i) {
      try {
        cleanup(cleanups[i]);
      } catch (err) {
        console.error("Cleanup error:", err);
      }
    }
  }
}