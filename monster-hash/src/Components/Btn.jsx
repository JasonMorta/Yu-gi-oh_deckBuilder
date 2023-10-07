import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function BasicButtons({ variant, text, onClick }) {
  // variant types: text, contained, outlined
  return (
    <Stack spacing={2} direction="row">
      <Button variant={variant} onClick={onClick}>
        {text}
      </Button>
    </Stack>
  );
}
