import Navigation from './Navigation'
import { useLocation } from 'react-router-dom'
const LayoutWrapper = (props) => {
  const pathname = useLocation().pathname

  return (
    <>
      {pathname !== '/login' && pathname !== '/signup' && <Navigation />}
      <div className='main__container'>{props.children}</div>
    </>
  )
}

export default LayoutWrapper
