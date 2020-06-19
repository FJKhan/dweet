import React from 'react'
import { connect } from 'react-redux'
import { setTodosFilter, TodosFilters } from '../../actions/todoActions'
import Button from '../Button/Button.component'
export class FilterButton extends React.Component {
    handleFilterChange = (filter) => {
        const filterQuery = this.setFilter(filter)
        this.props.dispatch(setTodosFilter(filter, filterQuery))
    }
    setFilter = (filter) => {
        switch (filter) {
            case TodosFilters.SHOW_COMPLETED:
                return { completed: true }
            case TodosFilters.SHOW_ACTIVE:
                return { completed: false }
            default:
                return
        }
    }
    render() {
        return (
            <Button
                active={this.props.active}
                handleClick={() => this.handleFilterChange(this.props.filter)}>
                {this.props.text}
            </Button>
        )
    }
}
const mapStateToProps = (state, ownProps) => ({
    active: ownProps.filter === state.filter
})
export default connect(mapStateToProps)(FilterButton)
