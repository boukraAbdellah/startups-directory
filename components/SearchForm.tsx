import React from 'react'
import Form from "next/form";
import ResetFormButton from './ResetFormButton';
import { Search } from 'lucide-react';

const SearchForm = ({query} : {query?: string}) => {

  return (
    <Form action="/" scroll={false} className="search-form">
      <input
        type="text"
        name="query"
        value={query}
        className="search-input"
        placeholder="Search for startups"
      />
      <div className="flex gap-2">
        {query && <ResetFormButton />}
        <button type="submit" className="search-btn text-white">
          <Search size={24} />
        </button>
      </div>
    </Form>
  );
}

export default SearchForm