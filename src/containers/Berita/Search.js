import { useEffect } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { Search as SearchIcon } from 'components/Icons';

const Search = () => {
  useEffect(() => {}, []);
  return (
    <InputGroup style={{ marginBottom: '24px' }}>
      <Form.Control variant="normal" type="text" placeholder="Cari Berita" />
      <SearchIcon />
    </InputGroup>
  );
};

export default Search;
