import { useState } from 'react';
import { toast } from 'react-toastify';

const Form = ({ addGroceryItem }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputValue.length) {
      toast.error('Please provide text to add');
      return;
    }

    addGroceryItem(inputValue);
    setInputValue('');
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <div className='formRow'>
        <input
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type='submit' className='btn'>
          add item
        </button>
      </div>
    </form>
  );
};

export default Form;
