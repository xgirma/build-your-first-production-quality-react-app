import React from 'react';
import { TodoItem} from "./TodoItem";
import { PropTypes } from 'prop-types';

export const TodoList = (props) => (
    <div className='Todo-List'>
        <ul>
            {props.todos.map( todo => <TodoItem handleToggle={props.handleToggle} key={todo.id} {...todo}/> )}
        </ul>
    </div>
);

TodoList.propTypes = {
    todos: PropTypes.array.isRequired
};