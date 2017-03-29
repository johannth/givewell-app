import React from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';

import './NextStepButton.css';

const NextStepButton = ({to, disabled, children}) => {
  return (
    <div
      className={classNames({
        NextStepButton: true,
        'NextStepButton--disabled': disabled,
      })}
    >
      <Link
        className={classNames({
          NextStepButton__link: true,
          'NextStepButton__link--disabled': disabled,
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
    </div>
  );
};

export default NextStepButton;
