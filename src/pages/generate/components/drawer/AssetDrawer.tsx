import { Button, ImageList, ImageListItem, Stack } from '@mui/material'
import React from 'react'
import { COLORS } from 'utils/colorConstant'
import styles from 'styles/GenerateProduct.module.css'

//images
import cup from 'assets/images/sample-assets/cup.png'
import sofa from 'assets/images/sample-assets/sofa.png'
import car from 'assets/images/sample-assets/car.png'
import perfume from 'assets/images/sample-assets/perfume.png'

interface AssetDrawerProps {
  selectedImageSrc: string
  setSelectedImageSrc: (src: string) => void
}

export default function AssetDrawer(props: AssetDrawerProps) {
  const [selectedTab, setSelectedTab] = React.useState('Products')
  const tabs = ['Products', 'Props']
  const sampleAssets = [cup, perfume, sofa, car]
  return (
    <div>
      <Stack
        direction={'row'}
        spacing={1}>
        {tabs.map((item, index) => {
          return (
            <Button
              fullWidth
              className={styles.tabsButton}
              key={index}
              onClick={() => setSelectedTab(item)}
              style={{
                backgroundColor: selectedTab === item ? COLORS.greenishYellow : ''
              }}>
              {item}
            </Button>
          )
        })}
      </Stack>
      <ImageList
        cols={3}
        gap={8}
        className={styles.assetImageList}>
        {sampleAssets.map((item, index) => (
          <ImageListItem key={index}>
            <img
              src={`${item}`}
              alt={'image'}
              loading="lazy"
              style={{
                cursor: 'pointer',
                borderRadius: '10px',
                border: '1px solid #c4c4c4'
              }}
              className={`${styles.imgTag} ${item === props.selectedImageSrc ? styles.imgActive : ''}`}
              onClick={() => {
                props.setSelectedImageSrc(item)
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  )
}
