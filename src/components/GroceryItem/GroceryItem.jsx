import { useRef, useState } from 'react';

const GroceryItem = ({ itemId, text, isComplete, deleteItem, updateItem }) => {
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(text);
  const textElement = useRef();

  const handleKeyDown = (e) => {
    if (e.keyCode !== 13) {
      return;
    }

    e.preventDefault();

    updateItem(itemId, inputValue, isComplete);
    setEditMode(false);
  };

  const toggleComplete = (checked) => {
    updateItem(itemId, inputValue, checked);
  };

  const textInput = editMode ? (
    <input
      type='text'
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  ) : (
    <span
      className={`text ${isComplete ? 'complete' : ''}`}
      ref={textElement}
      onClick={() => setEditMode(!editMode)}
    >
      {text}
    </span>
  );

  return (
    <article className='item'>
      <input
        type='checkbox'
        checked={isComplete}
        onChange={(e) => toggleComplete(e.target.checked)}
      />
      {textInput}
      <button type='button' className='btn' onClick={() => deleteItem(itemId)}>
        delete
      </button>
    </article>
  );
};

export default GroceryItem;
