import Person from "./Person";

const Persons = ({array, handleDelete} : { array: any, handleDelete: any}) => {
    return (
        <ul>
            {array.map((arr: { id: any; name: any; number: any; }) =>
              <div key={Number(arr.id)}>
                <Person name={arr.name} number={arr.number} id={Number(arr.id)} handleDelete={handleDelete}/>
              </div>)}
        </ul>
    );
}

export default Persons;