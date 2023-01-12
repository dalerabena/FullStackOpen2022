const Header = ({ name }) => <h3>{name}</h3>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => {
    const total = parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)

    return (
        <div>
            {parts.map(part => {
                return (
                    <Part key={part.id} part={part} />
                )
            })}
            <strong>total of {total} exercises</strong>
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
        </div>
    )
}

export default Course