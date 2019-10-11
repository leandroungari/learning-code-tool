import React from 'react';

export default function TextField({
  type = 'text',
  placeholder,
  autocompleteOptions = null,
  label,
  onChangeText
}) {

   

  return (
    <>
      <p>{label}</p>
      <input 
        type={type} 
        list={autocompleteOptions ? autocompleteOptions[0] : null}
        onChange={onChangeText}
      /> 
      {
        (
          autocompleteOptions !== null ? 
          <datalist id={autocompleteOptions[0]}>
            {
              autocompleteOptions.map((option, key) => (
                <option value={option} key={key} />
              ))
            }
          </datalist> : 
          null
        )
      }
    </>
  );
}