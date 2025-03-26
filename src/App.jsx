import { useEffect, useState } from 'react';
import { Form, GroceryItem } from './components';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  const [items, setItems] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    setDataLoaded(true);
    const savedGroceryItems = localStorage.getItem('groceryItems');
    savedGroceryItems && setItems(JSON.parse(savedGroceryItems));
  }, []);

  useEffect(() => {
    if (!dataLoaded) {
      return;
    }

    localStorage.setItem('groceryItems', JSON.stringify(items));
  }, [items]);

  const addGroceryItem = (newItem) => {
    const newList = Object.assign({}, items, {
      [nanoid()]: { text: newItem, isComplete: false },
    });
    setItems(newList);
    toast.success('List item added');
  };

  const deleteItem = (itemId) => {
    setItems((prevItems) => {
      let newItems = Object.assign({}, prevItems);
      delete newItems[itemId];
      return newItems;
    });

    toast.success('List item deleted');
  };

  const updateItem = (itemId, newText, isComplete) => {
    setItems((prevItems) => {
      const newItems = Object.assign({}, prevItems);
      newItems[itemId] = {
        text: newText,
        isComplete,
      };
      return newItems;
    });

    toast.success('List item updated');
  };

  return (
    <section className='container'>
      <h2>Grocery Bud</h2>
      <Form addGroceryItem={addGroceryItem} />
      {Object.entries(items).map(([id, { text, isComplete }]) => {
        return (
          <GroceryItem
            key={id}
            itemId={id}
            text={text}
            isComplete={isComplete || false}
            deleteItem={deleteItem}
            updateItem={updateItem}
          />
        );
      })}
      <ToastContainer position='bottom-right' />
    </section>
  );
};

export default App;
