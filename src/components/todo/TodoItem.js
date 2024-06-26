import React from 'react';
import { PropTypes } from 'prop-types';
import { partial } from '../../lib/utils';

export const TodoItem = (props) => {
  // const handleToggle = props.handleToggle.bind(null, props.id);
  const handleToggle = partial(props.handleToggle, props.id);
  const handleRemove = partial(props.handleRemove, props.id);

  return (
    <li>

      <span className='delete-item'>{
        // eslint-disable-next-line
      }<a role="button" href="#"
           onClick={handleRemove}>X</a>
      </span>
      <input type="checkbox"
             onChange={ handleToggle }
             defaultChecked={props.isComplete}/> {props.name}
    </li>
  )
};

TodoItem.propTypes = {
    name: PropTypes.string.isRequired,
    isComplete: PropTypes.bool,
    id: PropTypes.number.isRequired
};

