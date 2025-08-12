import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

type PageInfo = {
  count: number; // total pages
  page: number;
  setPage: (page: number) => void;
};

export default function PokePagination({ count, page, setPage }: PageInfo) {
  return (
    <div className="pagination">
      <Stack className='pagination-stack' spacing={2}>
        <Pagination
          count={count}
          color="primary"
          page={page}
          onChange={(_, value) => setPage(value)}
        />
      </Stack>
    </div>
  );
}
