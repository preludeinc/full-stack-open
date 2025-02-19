const Filter = ({filter, handleFilter} : {filter: any, handleFilter: any}) => {
    return (
        <div>
            <span>filter shown with</span>
            <input value={filter} onChange={handleFilter}/>
        </div>
    )
}

export default Filter;