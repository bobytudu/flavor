import { Container, Grid, Typography } from '@mui/material'
import React from 'react'
import prodImg from 'assets/img8.png'
import img6 from 'assets/img6.png'

export default function Projects() {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const component = (
    <Container
      maxWidth="xl"
      disableGutters>
      <div style={{ display: 'flex', width: '100%', minHeight: 'calc(100vh - 80px)' }}>
        <div
          style={{
            width: 400,
            height: 'calc(100vh - 70px)',
            borderRight: '1px solid #E5E5E5',
            backgroundColor: 'white'
          }}
        />
        <div
          style={{
            width: '100%'
          }}>
          <div
            style={{
              width: '100%',
              minHeight: 400,
              backgroundColor: '#E5E5E5',
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column'
            }}>
            <div>
              <Typography
                variant="subtitle1"
                sx={{ ml: 1, color: '#2291FF' }}>
                Dimensions: Instagram Post (1:1)
              </Typography>
              <img
                src={prodImg}
                style={{ width: 320, height: 320 }}
                alt="prod_img"
              />
            </div>
          </div>
          <div style={{ padding: 24, background: 'white', height: 'calc(100vh - 470px)', overflowY: 'auto' }}>
            <Typography
              variant="h4"
              sx={{ mb: 2 }}>
              Recent
            </Typography>
            <Grid
              container
              spacing={3}>
              {list.map((item) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}>
                  <img
                    src={img6}
                    style={{ width: '100%', height: '100%' }}
                    alt="img6"
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </div>
    </Container>
  )
  return <div>{component}</div>
}
