import React from 'react'
import { connect } from 'react-redux'
import { setTodosFilter, TodosFilters } from '../../actions/todoActions'
import Button from '../Button/Button.component'
const FilterButton = ({ active, filter, setTodosFilter, text }) => {
    const handleFilterChange = (filter) => {
        const filterQuery = setFilter(filter)
        setTodosFilter(filter, filterQuery)
    }
    const setFilter = (filter) => {
        switch (filter) {
            case TodosFilters.SHOW_COMPLETED:
                return { completed: true }
            case TodosFilters.SHOW_ACTIVE:
                return { completed: false }
            default:
                return
        }
    }
    return (
        <Button active={active} handleClick={() => handleFilterChange(filter)}>
            {text}
        </Button>
    )
}
const mapStateToProps = (state, ownProps) => ({
    active: ownProps.filter === state.filter,
    text: ownProps.text,
    filter: ownProps.filter
})
const mapDispatchToProps = (dispatch) => ({
    setTodosFilter: (filter, filterQuery) =>
        dispatch(setTodosFilter(filter, filterQuery))
})
export default connect(mapStateToProps, mapDispatchToProps)(FilterButton)
