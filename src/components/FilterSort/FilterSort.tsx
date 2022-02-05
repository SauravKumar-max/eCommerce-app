import { Stack, Button, Modal, Typography } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { FilterBox } from "./FilterBox";
import { SortBox } from "./SortBox";
import { useState } from "react";

export function FilterSort(): JSX.Element {
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          position: { xs: "fixed", md: "inherit" },
          bottom: { xs: "0" },
          left: { xs: "0" },
          zIndex: "3",
          width: "100%",
          margin: { md: "2rem 0 1rem 0" },
          padding: { md: "0 2rem" },
        }}
      >
        <Typography
          component="h6"
          sx={{
            display: { xs: "none", md: "inline-block" },
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "text.primary",
          }}
        >
          Products
        </Typography>
        <Stack
          direction="row"
          spacing={{ xs: 0, md: 2 }}
          sx={{
            width: { xs: "100%", md: "fit-content" },
            background: { xs: "white" },
            border: { xs: "solid 1px #3d41d7", md: "none" },
          }}
        >
          <Button
            variant="outlined"
            startIcon={<SortIcon />}
            sx={{
              width: { xs: "100%" },
              borderRadius: 0,
              fontWeight: "bold",
              border: "solid 1px #3d41d7",
            }}
            onClick={() => setSortOpen(true)}
          >
            SortBy
          </Button>
          <Button
            variant="outlined"
            startIcon={<FilterAltIcon />}
            sx={{
              width: { xs: "100%" },
              borderRadius: 0,
              fontWeight: "bold",
              border: "solid 1px #3d41d7",
            }}
            onClick={() => setFilterOpen(true)}
          >
            Filter
          </Button>
        </Stack>
      </Stack>
      <Modal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <FilterBox setFilterOpen={setFilterOpen} />
        </div>
      </Modal>
      <Modal
        open={sortOpen}
        onClose={() => setSortOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <SortBox setSortOpen={setSortOpen} />
        </div>
      </Modal>
    </>
  );
}
