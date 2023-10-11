import {
  CheckCircleIcon,
  EyeDropperIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  ClickAwayListener,
  Collapse,
  Divider,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Popper,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import { ColorChangeHandler, ColorResult, SketchPicker } from "react-color";
import GridImages from "./GridImages";
import CustomButton from "components/buttons/CustomButton";
import { placementOptions, shadowOptions } from "utils/helper";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { setGenerateImagePayload } from "redux/reducers/generate.reducer";
import config from "utils/config/env";
import AgeSelect from "./AgeSelect";

const texturedTypes = [
  "Metal",
  "Wood",
  "Paint",
  "Marble",
  "Glass",
  "Concrete",
  "Paper",
];
interface StudioComponentsProps {
  ratio: string;
  handleSelectRatio: (e: any) => void;
  handleViewMore: () => void;
}
export default function StudioComponents({
  ratio,
  handleSelectRatio,
  handleViewMore,
}: StudioComponentsProps) {
  const dispatch = useAppDispatch();
  const genderOptions = ["Men", "Women", "Others"];
  const [gender, setGender] = React.useState("Men");
  const [color, setColor] = React.useState("#d81f1f");
  const [background, setBackground] = React.useState(10);
  const colorTypes = ["HEX", "RGB", "CSS", "HSL", "HSB"];
  const [colorType, setColorType] = React.useState("HEX");
  const [openTarget, setOpenTarget] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [selectedLocation, setSelectedLocation] = React.useState("");
  const [selectedTexture, setSelectedTexture] = React.useState("Metal");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { generateImagePayload } = useAppSelector((state) => state.generate);

  // console.log(config.REACT_APP_GOOGLE_API_KEY);

  const { ref: materialRef } = usePlacesWidget({
    apiKey: config.REACT_APP_GOOGLE_API_KEY,
    onPlaceSelected: (place: any) => {
      let location = place?.formatted_address || "";
      setSelectedLocation(location);
    },
    inputAutocompleteValue: "country",
  });

  const handleChange: ColorChangeHandler = (color: ColorResult) =>
    setColor(color.hex);
  const handleOpenPicker = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleValueChange = (event: SelectChangeEvent, key: string) => {
    const payload = {
      ...generateImagePayload,
      customScene: {
        ...generateImagePayload.customScene,
        [key]: event.target.value,
      },
    };
    dispatch(setGenerateImagePayload(payload));
  };

  const handleAgeChange = (event: SelectChangeEvent, key: string) => {
    let age = event.target.value;
    let payload = {
      ...generateImagePayload,
      personaBasedState: {
        ...generateImagePayload.personaBasedState,
        [key]: age,
      },
    };
    dispatch(setGenerateImagePayload(payload));
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
          value={generateImagePayload.customScene.selectedPlacementValue}
          size="small"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={(e) => handleValueChange(e, "selectedPlacementValue")}
        >
          {placementOptions.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div style={{ marginBottom: 24 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
          Shadow
        </Typography>
        <Select
          fullWidth
          value={generateImagePayload.customScene.selectedShadowValue}
          size="small"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={(e) => handleValueChange(e, "selectedShadowValue")}
        >
          {shadowOptions.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
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
                key={t}
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
      <Divider sx={{ mb: 2 }} />

      <div style={{ marginBottom: 24 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
            Target audience
          </Typography>
          <IconButton onClick={() => setOpenTarget((prev) => !prev)}>
            {openTarget ? (
              <MinusIcon style={{ color: "black", width: 16, height: 16 }} />
            ) : (
              <PlusIcon style={{ color: "black", width: 16, height: 16 }} />
            )}
          </IconButton>
        </Stack>
        <Collapse in={openTarget}>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
            Location
          </Typography>
          <OutlinedInput
            fullWidth
            inputRef={materialRef}
            size="small"
            defaultValue={generateImagePayload.personaBasedState.location}
          />
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <AgeSelect
                value={generateImagePayload.personaBasedState.minAge}
                onChange={(e) => handleAgeChange(e, "minAge")}
                label="Min Age*"
              />
            </Grid>
            <Grid item xs={6}>
              <AgeSelect
                value={generateImagePayload.personaBasedState.maxAge}
                onChange={(e) => handleAgeChange(e, "minAge")}
                label="Max Age*"
              />
            </Grid>
          </Grid>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, mt: 2 }}>
            Gender
          </Typography>
          <Stack direction="row" sx={{ pl: 0 }}>
            {genderOptions.map((item) => (
              <Checkbox
                key={item}
                disableRipple
                sx={{ borderRadius: 0, p: 0, mr: 1 }}
                checked={item === gender}
                onChange={(e) => setGender(item)}
                icon={
                  <Chip
                    sx={{ borderRadius: "8px", width: 90 }}
                    label={item}
                    clickable
                    variant="outlined"
                  />
                }
                checkedIcon={
                  <Chip
                    sx={{ borderRadius: "8px", width: 90 }}
                    label={item}
                    clickable
                    variant="outlined"
                    onDelete={() => {}}
                    deleteIcon={
                      <CheckCircleIcon
                        style={{
                          width: 16,
                          height: 16,
                          color: "black",
                          // display: gender === item ? "block" : "none",
                        }}
                      />
                    }
                  />
                }
              />
            ))}
          </Stack>
        </Collapse>
      </div>
    </div>
  );
}
