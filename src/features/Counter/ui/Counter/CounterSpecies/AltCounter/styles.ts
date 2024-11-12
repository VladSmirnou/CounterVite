export const getStyles = (element: string) => {
    switch (element) {
        case 'paper': {
            return {
                width: '100%',
                maxWidth: 430,
                margin: '0 auto',
            };
        }
        case 'scoreboard': {
            return {
                height: 148,
            };
        }
    }
};
