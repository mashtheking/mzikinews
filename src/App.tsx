import { MainPage } from './components/MainPage'
import { Navbar } from './components/Navbar'
function App() {
  return (
    <>
      <Navbar />
      <div className='w-[90%] mx-auto'>
        <MainPage />
      </div>
    </>
  )
}

export default App
