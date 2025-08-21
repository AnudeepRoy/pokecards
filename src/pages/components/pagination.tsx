import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import type { Dispatch, SetStateAction } from "react";

type PageInfo = {
  count: number; // total pages
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};

export default function PokePagination({ count, page, setPage }: PageInfo) {
  console.log("PokePagination received page =", page);
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
