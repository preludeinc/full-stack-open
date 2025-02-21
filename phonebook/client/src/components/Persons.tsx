import Person from "./Person";

const Persons = ({array, handleDelete} : { array: any, handleDelete: any}) => {
    return (
        <ul>
            {array.map((arr: { id: any; name: any; number: any; }) =>
                <Person 
                  key={arr.id}
                  name={arr.name} 
                  number={arr.number} 
                  id={arr.id} 
                  handleDelete={handleDelete}/>
             )}
        </ul>
    );
}

export default Persons;