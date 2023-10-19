const App = () => {
  const friends = [ 'Peter', 'Maya']

  return (
    <div>
      {/* React also allows arrays to be rendered if the array contains values ​​that are eligible for rendering */}
      {/* results in: PeterMaya */}
      <p>{friends}</p>
    </div>
  )
}

export default App