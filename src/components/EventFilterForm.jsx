import { useState } from 'react';

const EventFilterForm = ({ onFilter }) => {
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filterType, filterValue);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-[80px] max-w-sm mx-auto my-4">
      <div className="mb-4">
        <label htmlFor="filterType" className="block mb-2 text-sm font-medium text-gray-700">
          Filter Type:
        </label>
        <select
          id="filterType"
          value={filterType}
          onChange={handleFilterTypeChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select Filter Type</option>
          <option value="theme">Theme</option>
          <option value="category">Category</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="filterValue" className="block mb-2 text-sm font-medium text-gray-700">
          Filter Value:
        </label>
        <input
          type="text"
          id="filterValue"
          value={filterValue}
          onChange={handleFilterValueChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Apply Filter
      </button>
    </form>
  );
};

export default EventFilterForm;
