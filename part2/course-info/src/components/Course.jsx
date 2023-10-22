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
	// calculate the sum of exercises with the array method reduce.
	return (
		<p><b>Total of {parts.reduce((prev, curr) => prev + curr.exercises, 0)} exercises</b></p>
	)
}

// Declare the Course component as a separate module, which is imported by the App component.
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