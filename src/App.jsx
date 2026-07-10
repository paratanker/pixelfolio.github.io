import { Suspense, lazy } from 'react'
import content from './data/content.json'

// The theme is a content setting: set "version" in src/data/content.json to
// "v1.0" (scrolling RPG page) or "v2.0" (fixed game shell). React.lazy +
// dynamic import code-splits per theme, so visitors only download the active one.
const Theme = lazy(() =>
  content.version === 'v2.0' ? import('./themes/v2/App.jsx') : import('./themes/v1/App.jsx')
)

export default function App() {
  return (
    <Suspense fallback={null}>
      <Theme />
    </Suspense>
  )
}
