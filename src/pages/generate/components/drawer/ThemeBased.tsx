import { Box, ImageList, ImageListItem, ImageListItemBar, Tooltip } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from 'styles/GenerateProduct.module.css'
import Loader from 'components/AnimatedLoader'
import { getThemeImageListsApi } from 'redux/action/generate.action'
import { setGenerateImagePayload } from 'redux/reducers/generate.reducer'

function ThemeBased() {
  const dispatch = useDispatch()
  const generateProductState = useSelector((state: any) => state.generate)
  const themesImageList = generateProductState.themesImageList || []
  const fetchingThemesImage = generateProductState?.fetchingThemesImage || false
  const generateImageStatePayload = generateProductState?.generateImagePayload
  const selectedTheme = generateImageStatePayload?.themeBasedState?.selectedTheme || ''
  let isLoading = fetchingThemesImage
  const handleThemeChange = (themeName: string) => {
    let payload = {
      ...generateImageStatePayload,
      themeBasedState: {
        ...generateImageStatePayload.themeBasedState,
        selectedTheme: themeName
      }
    }
    dispatch(setGenerateImagePayload(payload))
  }
  useEffect(() => {
    if (themesImageList && themesImageList.length > 0 && !selectedTheme) {
      handleThemeChange(themesImageList[0].theme)
    }
  }, [themesImageList])
  useEffect(() => {
    getThemeImageListsApi()
  }, [])
  return (
    <Box>
      {isLoading && themesImageList.length === 0 ? (
        <Loader
          width="350px"
          height="220px"
        />
      ) : (
        <>
          <Box className={styles.themeListsBox}>
            <ImageList
              cols={3}
              rowHeight={120}
              gap={8}
              className={styles.imageList}>
              {themesImageList && themesImageList.length ? (
                themesImageList.map((item: any, index: number) => (
                  <ImageListItem key={index}>
                    <img
                      src={item.image}
                      alt={item.theme}
                      loading="lazy"
                      style={{
                        borderRadius: '10px',
                        height: '150px',
                        boxSizing: 'border-box'
                      }}
                      className={`${styles.imgTag} ${item.theme === selectedTheme ? styles.imgActive : ''}`}
                      onClick={() => handleThemeChange(item.theme)}
                    />
                    <ImageListItemBar
                      className={styles.imgTitle}
                      onClick={() => handleThemeChange(item.theme)}
                      title={
                        <Tooltip
                          componentsProps={{
                            tooltip: {
                              sx: {
                                textTransform: 'capitalize'
                              }
                            }
                          }}
                          title={item?.theme}>
                          <span>{item?.theme}</span>
                        </Tooltip>
                      }
                      classes={{
                        title: styles.titleFont
                      }}
                    />
                  </ImageListItem>
                ))
              ) : (
                <></>
              )}
            </ImageList>
          </Box>
        </>
      )}
    </Box>
  )
}

export default ThemeBased
