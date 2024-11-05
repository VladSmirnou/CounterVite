import { FieldNames } from '@/features/Counter/lib/enums';
import { Input } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import { ChangeEvent } from 'react';

type Props = {
    value: number;
    labelText: string;
    fieldIsIncorrect: boolean;
    fieldName: FieldNames;
    setValues: (fieldName: FieldNames, value: number) => void;
};

export const ValuePanel = ({
    value,
    labelText,
    fieldIsIncorrect,
    fieldName,
    setValues,
}: Props) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        // Number('') === 0, and not NaN
        if (value === '') return;

        const nextValue = Number(value);

        if (isNaN(nextValue)) return;
        setValues(fieldName, nextValue);
    };

    let finalBackgroundColor = 'white';
    let finalBorderColor = '#5ed1f5';

    if (fieldIsIncorrect) {
        finalBackgroundColor = 'lightpink';
        finalBorderColor = '#d73d3d';
    }

    const inputId = `${labelText}_value`;

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                columnGap: 3,
            }}
        >
            <InputLabel htmlFor={inputId} sx={{ flex: 1 }}>
                <Typography
                    variant="h5"
                    component={'p'}
                    sx={{ color: '#5ed1f5', fontWeight: 900 }}
                >
                    {labelText}
                </Typography>
            </InputLabel>
            <Input
                id={inputId}
                type="number"
                value={value}
                onChange={handleChange}
                sx={{
                    all: 'revert',
                    '& > input': {
                        backgroundColor: finalBackgroundColor,
                        fontWeight: 900,
                        border: `3px solid ${finalBorderColor}`,
                        borderRadius: 1.5,
                        textAlign: 'center',
                        transition: 'border 0.2s ease-in-out',
                    },
                    '& > input:focus-visible': {
                        border: '3px solid #4568b4',
                    },
                }}
            />
        </Box>
    );
};
