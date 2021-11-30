import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationComponent({count, page, handleChange, defaultPage}) {
  return (
    <Stack style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} spacing={2}>
      <Pagination
        count={count}
        page={page}
        onChange={handleChange}
        defaultPage={defaultPage}
        showFirstButton
      />
    </Stack>
  );
}
