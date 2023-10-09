import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { setGenerateImagePayload } from "redux/reducers/generate.reducer";

export default function ThemeDrawer() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const [tempSelectedTheme, setTempSelectedTheme] = React.useState<string>("");
  const { themesImageList, generateImagePayload, fetchingThemesImage } =
    useAppSelector((state) => state.generate);
  const selectedTheme =
    generateImagePayload?.themeBasedState?.selectedTheme || "";

  const handleThemeChange = (themeName: string) => {
    let payload = {
      ...generateImagePayload,
      themeBasedState: {
        ...generateImagePayload.themeBasedState,
        selectedTheme: themeName,
      },
    };
    dispatch(setGenerateImagePayload(payload));
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        onAbort={() => setOpen(false)}
        maxWidth="xs"
      >
        <DialogContent>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Set a theme
          </Typography>
          <Typography variant="subtitle1">
            This will overwrite your current progress in the Create section. Are
            you sure you want to do this?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            fullWidth
            onClick={() => {
              setOpen(false);
              handleThemeChange(tempSelectedTheme);
            }}
            sx={{ bgcolor: "background.color-brand-background" }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Themes
      </Typography>
      {fetchingThemesImage && (
        <Grid container spacing={1}>
          {[...Array(6)].map((_, index) => (
            <Grid item key={index} xs={4}>
              <Skeleton variant="rounded" width={95} height={95} />
              <Skeleton variant="text" />
            </Grid>
          ))}
        </Grid>
      )}
      <Grid container spacing={1}>
        {themesImageList.map((image, index) => (
          <Grid item key={image.theme} sx={{ textAlign: "center" }} xs={4}>
            <Box
              onClick={() => {
                setOpen(true);
                setTempSelectedTheme(image.theme);
              }}
              sx={{
                borderRadius: "8px",
                borderColor:
                  selectedTheme === image.theme
                    ? "text.color-text-secondary"
                    : "transparent",
                borderWidth: "2px",
                borderStyle: "solid",
                "&:hover": {
                  borderColor: "text.color-text-clickable",
                },
                cursor: "pointer",
              }}
            >
              <img
                alt="theme"
                style={{
                  width: 86,
                  height: 86,
                  marginBottom: 2,
                  borderRadius: 8,
                  maxWidth: 86,
                  maxHeight: 86,
                  objectFit: "cover",
                }}
                src={image.image}
              />
              <Typography color="text.color-text-secondary" variant="caption">
                {image.theme}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
