export function mapBackendFilterToFrontend(
  backend: Record<string, any>,
  frontendTemplate: Record<string, any>,
): Record<string, any> {
  const frontend: Record<string, any> = {};
  Object.keys(frontendTemplate).forEach((frontendKey) => {
    if (frontendKey.startsWith("filter")) {
      const backendKey = frontendKey.charAt(6).toLowerCase() + frontendKey.slice(7);
      frontend[frontendKey] = backend[backendKey] ?? undefined;
    } else {
      frontend[frontendKey] = backend[frontendKey] ?? undefined;
    }
  });
  return frontend;
}

export function mapFrontendFilterToBackend(frontend: Record<string, any>): Record<string, any> {
  const backend: Record<string, any> = {};
  Object.keys(frontend).forEach((frontendKey) => {
    if (frontendKey.startsWith("filter")) {
      const backendKey = frontendKey.charAt(6).toLowerCase() + frontendKey.slice(7);
      backend[backendKey] = frontend[frontendKey];
    } else {
      backend[frontendKey] = frontend[frontendKey];
    }
  });
  return backend;
}
