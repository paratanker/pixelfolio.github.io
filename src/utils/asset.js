// Resolves public/ files against the deployed base path (e.g. GitHub Pages
// project subpaths) instead of the domain root.
export const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
