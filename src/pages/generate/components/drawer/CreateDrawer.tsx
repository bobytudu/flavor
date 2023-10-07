import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import {
  IconButton,
  InputLabel,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React from "react";
import capitalize from "lodash/capitalize";
import GridImages from "./components/GridImages";
import StudioComponents from "./components/StudioComponents";
import LifeStylesComponents from "./components/LifeStylesComponents";
import CustomButton from "components/buttons/CustomButton";

const types = ["studio", "lifestyle"];
interface DefaultDrawerProps {
  ratio: string;
  handleSelectRatio: (e: SelectChangeEvent) => void;
}

export default function CreateDrawer({
  ratio,
  handleSelectRatio,
}: DefaultDrawerProps) {
  const [viewMore, setViewMore] = React.useState(false);
  const [type, setType] = React.useState("studio");
  const [selectedImage, setSelectedImage] = React.useState(0);
  const handleViewMore = () => setViewMore(!viewMore);

  return (
    <div>
      {viewMore ? (
        <div>
          <div
            style={{ display: "flex", alignItems: "center", marginBottom: 24 }}
          >
            <IconButton onClick={handleViewMore}>
              <ArrowLeftIcon
                style={{
                  width: 24,
                  height: 24,
                  color: "black",
                  fontWeight: 600,
                }}
              />
            </IconButton>
            <Typography variant="h4">Reference Images</Typography>
          </div>
          <GridImages
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: 24 }}>
            <InputLabel sx={{ fontSize: 20, fontWeight: 600 }}>
              Create
            </InputLabel>
            <div style={{ display: "flex" }}>
              {types.map((t) => (
                <CustomButton
                  label={capitalize(t)}
                  value={type}
                  index={t}
                  onClick={() => setType(t)}
                />
              ))}
            </div>
          </div>

          {type === "studio" && (
            <StudioComponents
              ratio={ratio}
              handleViewMore={handleViewMore}
              handleSelectRatio={handleSelectRatio}
            />
          )}
          {type === "lifestyle" && (
            <LifeStylesComponents
              ratio={ratio}
              handleViewMore={handleViewMore}
              handleSelectRatio={handleSelectRatio}
            />
          )}

          {/* <div style={{ marginBottom: 24 }}>
            <InputLabel sx={{ fontSize: 20, fontWeight: 600 }}>Colors</InputLabel>
            <Grid
              container
              columns={10}
              spacing={2}>
              {colors.map((color) => (
                <Grid
                  item
                  key={color}
                  xs={2}>
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 100,
                      backgroundColor: color
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
          <div style={{ marginBottom: 24 }}>
            <InputLabel sx={{ fontSize: 20, fontWeight: 600 }}>Aspect ration</InputLabel>
            <Grid
              container
              spacing={1}>
              <Grid
                item
                xs={4}>
                <img
                  src={size1Img}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'bottom' }}
                  alt="size"
                />
              </Grid>
              <Grid
                item
                xs={4}>
                <img
                  src={size2Img}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'bottom' }}
                  alt="size"
                />
              </Grid>
              <Grid
                item
                xs={4}>
                <img
                  src={size3Img}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'bottom' }}
                  alt="size"
                />
              </Grid>
            </Grid>
          </div> */}
        </div>
      )}
    </div>
  );
}
