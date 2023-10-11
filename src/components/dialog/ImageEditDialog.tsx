import { ArrowLeftCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import img8 from "assets/img8.png";

export default function ImageEditDialog() {
  return (
    <Dialog open maxWidth="md" PaperProps={{ sx: { overflow: "visible" } }}>
      <IconButton
        sx={{
          borderRadius: "8px",
          bgcolor: "black",
          position: "absolute",
          top: -36,
          right: -36,
          width: 36,
          height: 36,
        }}
      >
        <XMarkIcon style={{ color: "white", width: 24, height: 24 }} />
      </IconButton>
      <DialogContent>
        <Stack>
          <IconButton>
            <ArrowLeftCircleIcon />
          </IconButton>
          <Typography variant="h4">Edit Image</Typography>
        </Stack>
        <Box
          p={5}
          minWidth={600}
          height="100%"
          bgcolor="background.color-background-base"
          borderRadius="8px"
          display="flex"
          justifyContent="center"
        >
          <div
            style={{
              width: 300,
              height: "auto",
            }}
          >
            <img
              src={img8}
              alt=""
              style={{ width: 300, height: "100%", objectFit: "contain" }}
            />
          </div>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
