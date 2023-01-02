import {Button as MaterialButton} from '@mui/material';
import React from 'react';

interface IMainPageButtonProps {
    isAdded: boolean;
    callback: (e: React.MouseEvent) => void;
}

export const MainPageButton = ({isAdded, callback}: IMainPageButtonProps) => {
    return (
        <>
            <MaterialButton size='small' color={isAdded ? 'primary' : 'success'} onClick={(e) => callback(e)}>
                Add to card
            </MaterialButton>
            <MaterialButton size='small' color='primary'>
                More
            </MaterialButton>
        </>
    )
}