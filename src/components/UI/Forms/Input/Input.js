import React from 'react';

import classes from './Input.css';

const Input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }
  
  switch (props.htmlType) {
    case ('input'):
      inputElement = <input 
        className={inputClasses.join(' ')}
        {...props.htmlConfig}
        value={props.value}
        onChange={props.changed} />;
      break;
    case ('textarea'):
      inputElement = <textarea 
        className={inputClasses.join(' ')}
        {...props.htmlConfig}
        value={props.value}
        onChange={props.changed} />;
      break;
    case ('select'):
      inputElement = (
        <select 
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed} > 
          {props.htmlConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = <input 
        className={inputClasses.join(' ')}
        {...props.htmlConfig}
        value={props.value}/>;
  }

  return(
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
}

export default Input;