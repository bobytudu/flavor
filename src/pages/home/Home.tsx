import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tooltip,
  Typography
} from '@mui/material'
import React from 'react'
import { ChevronUpDownIcon, Squares2X2Icon, Bars3Icon } from '@heroicons/react/24/solid'
import { TemplateCard, ProjectCard } from 'components'
import ImageView from './components/ImageView'

const rows = [
  { name: 'Frozen yoghurt', created: '2 Days ago', edited: '2 minutes ago' },
  { name: 'Orange Peel', created: '2 Days ago', edited: '2 minutes ago' },
  { name: 'Aesop', created: '2 Days ago', edited: '2 minutes ago' },
  { name: 'Toner Blend', created: '2 Days ago', edited: '2 minutes ago' }
]

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && children}
    </div>
  )
}
export default function Home() {
  const [tab, setTab] = React.useState(0)
  const [view, setView] = React.useState('grid' as 'grid' | 'list')

  function handleTab(event: React.SyntheticEvent, newValue: number) {
    setTab(newValue)
    if (newValue === 1) setView('grid')
  }
  return (
    <div>
      <Container
        maxWidth="xl"
        sx={{ p: 5 }}>
        <Box
          sx={{
            mb: 3,
            mx: 'auto',
            maxWidth: {
              xl: 1320,
              md: 1096
            }
          }}>
          <Box
            sx={{
              mb: 3,
              display: 'flex',
              justifyContent: 'space-between'
            }}>
            <Typography variant="h4">Start a new Project</Typography>
            <Button
              sx={{ color: 'rgba(86, 86, 86, 1)', fontWeight: 400, fontSize: 16 }}
              endIcon={<ChevronUpDownIcon style={{ width: 20, height: 30 }} />}>
              Template gallery
            </Button>
          </Box>
          <Grid
            container
            spacing={3}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Grid
                item
                key={item}>
                <TemplateCard blank={item === 1} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <Box bgcolor="background.paper">
        <Container
          maxWidth="xl"
          sx={{ p: 5 }}>
          <Box
            sx={{
              mb: 3,
              mx: 'auto',
              maxWidth: {
                xl: 1320,
                md: 1096
              }
            }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 24
              }}>
              <Typography variant="h4">Recent Projects</Typography>
              <div style={{ display: tab === 0 ? 'flex' : 'none' }}>
                <Tooltip
                  title="Grid View"
                  arrow
                  placement="top">
                  <IconButton
                    onClick={() => setView('grid')}
                    sx={{ borderRadius: '4px', bgcolor: view === 'grid' ? 'rgba(234, 246, 192, 1)' : 'transparent' }}>
                    <Squares2X2Icon style={{ width: 20, height: 20 }} />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title="Table View"
                  arrow
                  placement="top">
                  <IconButton
                    onClick={() => setView('list')}
                    sx={{ borderRadius: '4px', bgcolor: view === 'list' ? 'rgba(234, 246, 192, 1)' : 'transparent' }}>
                    <Bars3Icon style={{ width: 20, height: 20 }} />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            <Tabs
              TabIndicatorProps={{
                style: {
                  display: 'none'
                }
              }}
              value={tab}
              onChange={handleTab}>
              <Tab
                label="Projects"
                sx={{
                  mr: 2
                }}
                value={0}
              />
              <Tab
                label="Images"
                value={1}
              />
            </Tabs>
            <CustomTabPanel
              value={tab}
              index={0}>
              {view === 'grid' ? (
                <Grid
                  container
                  spacing={3}>
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <Grid
                      item
                      key={item}>
                      <ProjectCard
                        view={view}
                        title="Orange Peel"
                        description="2 minutes ago"
                        created="yesterday"
                      />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead
                      sx={{
                        '& .MuiTableCell-head': {
                          background: 'transparent'
                        }
                      }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 400 }}>Name</TableCell>
                        <TableCell
                          sx={{ fontWeight: 400 }}
                          align="right">
                          Last Modified
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: 400 }}
                          align="right">
                          Created
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: 400 }}
                          align="right"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <ProjectCard
                          view={view}
                          title="Orange Peel"
                          description="2 minutes ago"
                          created="yesterday"
                        />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CustomTabPanel>
            <CustomTabPanel
              value={tab}
              index={1}>
              <ImageView />
            </CustomTabPanel>
          </Box>
        </Container>
      </Box>
    </div>
  )
}
