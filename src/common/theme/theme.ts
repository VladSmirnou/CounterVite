import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    components: {
        MuiPaper: {
            variants: [
                {
                    props: {
                        variant: 'outlined',
                    },
                    style: {
                        borderColor: '#5ed1f5',
                        borderWidth: 3,
                        borderRadius: 10,
                        backgroundColor: '#292c35',
                    },
                },
            ],
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    '&.Mui-disabled': {
                        backgroundColor: '#3e6d7e',
                    },
                },
            },
            variants: [
                {
                    props: {
                        variant: 'contained',
                    },
                    style: {
                        backgroundColor: '#5ed1f5',
                        color: 'black',
                        fontWeight: 900,
                        fontSize: 20,
                    },
                },
            ],
        },
    },
});
