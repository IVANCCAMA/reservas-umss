// src/components/Filter/Filter.jsx
import React, {useState} from 'react';

const Filter = ({ onFilter }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        onFilter(value);
    };

    return (
        <div className="form-outline mb-3">
            <input 
                type="text"
                className='form-control'
                placeholder="Buscar"
                value={searchTerm}
                onChange={handleSearch} 
            />
        </div>
    );
};

export default Filter;