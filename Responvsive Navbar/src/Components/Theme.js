import { createTheme } from '@mui/material/styles';
const Theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#3D2C8D',
            dark: '#142850',
            light: '#27496D',
            contrastText: '#e1d6e1',
        },
        secondary: {
            main: '#f50057',
        },
        breakpoints: {
            values: {
              sm: 0,
              lg: 1200
            },
          }
    }
})

export default Theme;