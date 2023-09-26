import { ComponentsOverridesProps } from '.'

export default function InputLabel(theme: ComponentsOverridesProps) {
  return {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.text.primary,
          '&.Mui-focused': {
            color: theme.palette.text.primary
          },
          fontWeight: 400,
          marginBottom: 8
        }
      }
    }
  }
}
