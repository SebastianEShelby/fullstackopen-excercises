const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  const content = props.content
  return (
    <>
      <p>
        {content.part1.name} {content.part1.exercises}
      </p>
      <p>
        {content.part2.name} {content.part2.exercises}
      </p>
      <p>
        {content.part3.name} {content.part3.exercises}
      </p>
    </>
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