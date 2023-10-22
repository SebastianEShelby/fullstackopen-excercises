const Header = ({ course }) => <h1>{course}</h1>

const Part = ({ part }) => {
	return (
		<p>
			{part.name} {part.exercises}
		</p>
	)
}

const Content = ({ parts }) => {
	return (
		<>
			{parts.map(part =>
				<Part key={part.id} part={part} />
			)}
		</>
	)
}

const Total = ({ parts }) => {
	return (
		<p><b>Total of {parts.reduce((prev, curr) => prev + curr.exercises, 0)} exercises</b></p>
	)
}

const Course = ({ course }) => {
	return (
		<div>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	)
}

export default Course