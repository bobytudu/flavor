import React from 'react'
import projectImg from 'assets/project.png'
import { IconButton, Typography } from '@mui/material'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid'

interface ProjectCardPropTypes {
  title: string
  description: string
}

export default function ProjectCard(props: ProjectCardPropTypes) {
  return (
    <div
      style={{
        maxWidth: 310,
        maxHeight: 500,
        marginBottom: 16
      }}>
      <img
        src={projectImg}
        alt={props.title}
        style={{ width: '100%', marginBottom: 16, height: 'auto', objectFit: 'contain', borderRadius: '8px', overflow: 'hidden' }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}>
          <Typography variant="body2">{props.title}</Typography>
          <Typography variant="caption">{props.description}</Typography>
        </div>
        <IconButton>
          <EllipsisHorizontalIcon style={{ width: 20 }} />
        </IconButton>
      </div>
    </div>
  )
}
