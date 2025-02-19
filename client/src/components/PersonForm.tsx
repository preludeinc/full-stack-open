const PersonForm = ({addPerson, newName, newNumber, handleNameUpdate, handleNumberUpdate} : 
    {addPerson: any, newName: any, newNumber: any, handleNameUpdate: any, handleNumberUpdate: any}) => {
        return (
            <form onSubmit={addPerson}>
                <div>
                    <h2>add a new</h2>
                        <span>name: </span> 
                    <input value={newName} onChange={handleNameUpdate}/>
                </div>
                <div>
                        <span>number: </span> 
                    <input value={newNumber} onChange={handleNumberUpdate}/>
                </div>
                <div>
                    <button type="submit" >add</button>
                </div>
          </form>
        );
}

export default PersonForm;