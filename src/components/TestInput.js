import React from 'react';

const TestInput = React.forwardRef((props, ref) => {
  const normalRange = props.normalRange || '';
  const myArray = normalRange.split(" ");

  return (
    <div className="testInputContainer">
      <span className="testField">{props.fieldName}</span>
      <div>
        <input className="testValueInput" type="text" placeholder={myArray[0]} ref={ref} data-unit={myArray[1]} />
        <span className="fieldunit">{myArray[1]}</span>
      </div>
    </div>
  );
});

export default TestInput;
