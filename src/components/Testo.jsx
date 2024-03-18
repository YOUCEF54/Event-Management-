import { useState, useEffect } from 'react';

const Testo = () => {
  const [myValue, setMyValue] = useState('');

  useEffect(() => {
    const storedValue = localStorage.getItem('myKey');
    if (storedValue) {
      setMyValue(storedValue);
    }
  }, []);

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setMyValue(newValue);
    localStorage.setItem('myKey', newValue);
  };

  return (
    <div className='m-16 bg-violet-700 p-8 text-white rounded-lg'>
      <input className='bg-inherit border px-2 py-1 outline-none rounded-lg my-2' type="text" value={myValue} onChange={handleInputChange} />
      <p>Stored value: {myValue}</p>
    </div>
  );
};

export default Testo;
