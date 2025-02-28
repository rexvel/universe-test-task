import { ConversionForm } from './components/ConversionForm'
import { Layout } from './components/ui/layout'

const App = () => {


  throw new Error('test')
  return (
    <Layout>
      <main className="flex h-screen">
        <div className="w-1/2 p-4 flex flex-col">
          <ConversionForm onConvert={() => { }} />
        </div>
      </main>
    </Layout>

  )
}

export default App
