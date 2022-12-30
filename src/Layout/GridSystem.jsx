import Navigation from './Navigation'
const GridSystem = (props) => {
  return (
    <>
      <Navigation />
      <div className='background'>
        <div className='main__container'>{props.children}</div>
      </div>
    </>
  )
}

export default GridSystem
