import { ConversionForm } from './components/ConversionForm'

const App = () => {

  return (
    <main className="flex h-screen">
    <div className="w-1/2 p-4 flex flex-col">
      <ConversionForm onConvert={() => {}} />
    </div>
  </main>
  )
}

export default App
