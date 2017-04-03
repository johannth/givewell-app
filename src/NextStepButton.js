import React from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';

import './NextStepButton.css';

const NextStepButton = ({to, disabled, children}) => {
  return (
    <Link
      className={classNames({
        NextStepButton: true,
        'NextStepButton--disabled': disabled,
      })}
      to={to}
      onClick={e => {
        if (disabled) {
          e.preventDefault();
        }
      }}
    >
      {children}
    </Link>
  );
};

export default NextStepButton;
