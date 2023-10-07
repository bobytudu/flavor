import { EyeDropperIcon } from '@heroicons/react/24/solid'
import { Box, Button, ClickAwayListener, Divider, Grid, IconButton, InputLabel, MenuItem, OutlinedInput, Popper, Select, Typography } from '@mui/material'
import React from 'react'
import { ColorChangeHandler, ColorResult, SketchPicker } from 'react-color'
import GridImages from './GridImages'
import CustomButton from "components/buttons/CustomButton";

const texturedTypes = [
  "Metal",
  "Wood",
  "Paint",
  "Marble",
  "Glass",
  "Concrete",
  "Paper",
];

export default function StudioComponents({
  ratio,
  handleSelectRatio,
}: {
  ratio: string;
  handleSelectRatio: (e: any) => void;
}) {
  const [viewMore, setViewMore] = React.useState(false);
  const [background, setBackground] = React.useState(10);
  const colorTypes = ["HEX", "RGB", "CSS", "HSL", "HSB"];
  const [selectedTexture, setSelectedTexture] = React.useState("Metal");
  const [colorType, setColorType] = React.useState("HEX");
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [color, setColor] = React.useState("#d81f1f");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleChange: ColorChangeHandler = (color: ColorResult) =>
    setColor(color.hex);
  const handleViewMore = () => setViewMore(!viewMore);
  const handleOpenPicker = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <InputLabel>Aspect ratio</InputLabel>
        <Select
          fullWidth
          value={ratio}
          size="small"
          onChange={handleSelectRatio}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
        >
          <MenuItem value="1:1">Instagram Post (1:1)</MenuItem>
          <MenuItem value="16:9">Instagram Post (16:9)</MenuItem>
          <MenuItem value="9:16">Instagram Post (9:16)</MenuItem>
        </Select>
      </div>
      <Divider sx={{ my: 2 }} />
      <div style={{ marginBottom: 24 }}>
        <InputLabel>Reference image</InputLabel>
        <Box py={1} mb={1} display="flex" justifyContent="space-between">
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            Images
          </Typography>
          <Typography
            onClick={handleViewMore}
            variant="caption"
            sx={{
              fontWeight: 400,
              color: "text.color-text-clickable",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            View more
          </Typography>
        </Box>
        <GridImages
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      </div>

      <Divider sx={{ my: 2 }} />
      <div style={{ marginBottom: 24 }}>
        <Typography variant="body1" sx={{ fontWeight: 600, mb: 2 }}>
          Scene composition
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
          Placement
        </Typography>
        <Select
          fullWidth
          value={10}
          size="small"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
        >
          <MenuItem value={10}>Standing</MenuItem>
          <MenuItem value={20}>Another</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </div>
      <div style={{ marginBottom: 24 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
          Shadow
        </Typography>
        <Select
          fullWidth
          value={10}
          size="small"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
        >
          <MenuItem value={10}>Any</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </div>
      <div style={{ marginBottom: 24 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
          Background
        </Typography>
        <Select
          fullWidth
          value={background}
          onChange={(e) => setBackground(e.target.value as number)}
          size="small"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
        >
          <MenuItem value={10}>Colored</MenuItem>
          <MenuItem value={20}>Textured</MenuItem>
        </Select>
        {background === 10 && (
          <div>
            <Grid container sx={{ mt: 1 }} columns={10} spacing={1}>
              {colorTypes.map((t) => (
                <Grid item key={t} xs={2}>
                  <Button
                    key={t}
                    color="primary"
                    onClick={() => setColorType(t)}
                    style={{ paddingLeft: 0 }}
                    sx={{
                      px: 0,
                      minWidth: 50,
                      width: 50,
                      fontWeight: 400,
                      color:
                        colorType === t ? "white" : "text.color-text-clickable",
                      border: "1px solid #E5E5E5",
                      bgcolor:
                        colorType === t ? "text.color-text-clickable" : "white",
                      "&:hover": {
                        bgcolor:
                          colorType === t
                            ? "text.color-text-clickable"
                            : "white",
                        color:
                          colorType === t
                            ? "white"
                            : "text.color-text-clickable",
                      },
                      paddingLeft: 0,
                    }}
                  >
                    {t}
                  </Button>
                </Grid>
              ))}
            </Grid>
            <OutlinedInput
              sx={{ mt: 2 }}
              startAdornment={
                <div
                  style={{
                    width: 18,
                    height: 14,
                    background: `${color}`,
                    borderRadius: "2px",
                    marginRight: 16,
                  }}
                />
              }
              endAdornment={
                <IconButton
                  onClick={handleOpenPicker}
                  sx={{
                    bgcolor: "text.color-text-clickable",
                    "&:hover": { bgcolor: "text.color-text-clickable" },
                  }}
                >
                  <EyeDropperIcon
                    style={{ width: 14, height: 14, color: "white" }}
                  />
                </IconButton>
              }
              fullWidth
              size="small"
              value={color}
              onAbort={() => {}}
            />
            <Popper
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              placement="bottom"
              style={{ zIndex: 9999 }}
            >
              <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                <div>
                  <SketchPicker color={color} onChange={handleChange} />
                </div>
              </ClickAwayListener>
            </Popper>
          </div>
        )}
        {background === 20 && (
          <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap" }}>
            <CustomButton
              value={selectedTexture}
              index="All"
              label="All"
              onClick={() => setSelectedTexture("All")}
            />
            <Divider flexItem sx={{ mr: 1 }} orientation="vertical" />
            {texturedTypes.map((t) => (
              <CustomButton
                value={selectedTexture}
                index={t}
                label={t}
                onClick={() => setSelectedTexture(t)}
              />
            ))}
            <Box
              py={1}
              mb={1}
              display="flex"
              justifyContent="space-between"
              width="100%"
            >
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                {selectedTexture}
              </Typography>
              <Typography
                onClick={handleViewMore}
                variant="caption"
                sx={{
                  fontWeight: 400,
                  color: "text.color-text-clickable",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                View more
              </Typography>
            </Box>
            <GridImages
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
