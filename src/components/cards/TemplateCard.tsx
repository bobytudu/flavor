import { Box, Typography } from '@mui/material'
import React from 'react'
import { PlusIcon } from '@heroicons/react/24/solid'
import templateImg from 'assets/template.png'
import { Link } from 'react-router-dom'

interface TemplateCardPropTypes {
  description?: string
  image?: string
  id?: string
  blank?: boolean
}

export default function TemplateCard(props: TemplateCardPropTypes) {
  return (
    <Box>
      {props.blank ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            flexDirection: 'column',
            border: '1px dotted rgba(0,0,0,0.1)',
            bgcolor: 'white',
            width: 200,
            height: 200,
            justifyContent: 'center',
            borderRadius: '8px'
          }}>
          <PlusIcon style={{ width: 50, height: 50, marginBottom: 16 }} />
          <Typography variant="body2">Blank</Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            flexDirection: 'column',
            border: '1px dotted rgba(0,0,0,0.1)',
            height: 200,
            justifyContent: 'center',
            width: 200,
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer',
            '& .overlay': {
              top: '100%',
              transition: '0.3s ease-in-out'
            },
            '&:hover': {
              '& .overlay': {
                top: 0
              }
            }
          }}>
          <div
            className="overlay"
            style={{
              position: 'absolute',
              background: 'rgba(255, 255, 255,0.8)',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <div
              style={{
                width: '80%',
                margin: 'auto',
                height: '80%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
              <Typography
                variant="subtitle2"
                sx={{ textAlign: 'left', mb: 2 }}>
                A black perfume bottle stands on the glass among the water droplets
              </Typography>
              <Link to="/">
                <Typography
                  variant="body2"
                  color="text.color-text-clickable"
                  sx={{ textAlign: 'left', textDecoration: 'underline' }}>
                  Use as example
                </Typography>
              </Link>
            </div>
          </div>
          <img
            src={templateImg}
            alt="template"
            style={{ width: 210, height: 210, objectFit: 'contain' }}
          />
        </Box>
      )}
    </Box>
  )
}
