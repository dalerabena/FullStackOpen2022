const Persons = ({ persons, removePerson }) => {

  return (
    <div>
      <ul>
        {persons.map(person => {
          return (
            <li key={person.id}>
              {person.name} {person.number}
              <button onClick={removePerson(person.id)}>delete</button>
            </li>
          )
        })}        
      </ul>
    </div>
  )
}

export default Persons