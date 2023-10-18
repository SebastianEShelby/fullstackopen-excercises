const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = ({ content }) => {
  return (
    <>
      <Part part={content.part1} />
      <Part part={content.part2} />
      <Part part={content.part3} />
    </>
  )
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Total = (props) => {

  return (
    <p>Number of exercises {props.total}</p>
  )

}


const App = () => {
  const course = 'Half Stack application development'
  const content = {
    part1: { name: 'Fundamentals of React', exercises: 10 },
    part2: { name: 'Using props to pass data', exercises: 7 },
    part3: { name: 'State of a component', exercises: 14 }
  }

  const total = Object.values(content).reduce((prev, curr) => prev + curr.exercises, 0)

  return (
    <div>
      <Header course={course} />
      <Content content={content} />
      <Total total={total} />
    </div>
  )
}

export default App