import React from 'react';
import { PropTypes } from 'prop-types';

export const TodoItem = (props) => (
    <li>
        <input type="checkbox"
               onChange={ () => props.handleToggle(props.id) }
               defaultChecked={props.isComplete}/> {props.name}
    </li>
);

TodoItem.propTypes = {
    name: PropTypes.string.isRequired,
    isComplete: PropTypes.bool,
    id: PropTypes.number.isRequired
};

