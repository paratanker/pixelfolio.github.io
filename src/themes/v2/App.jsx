import './theme.css'
import { useDocumentMeta } from '../../hooks/useDocumentMeta'
import GameShell from './components/GameShell'

function App() {
  useDocumentMeta()

  return <GameShell />
}

export default App
