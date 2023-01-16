import {Button as MaterialButton} from '@mui/material';
import { MouseEvent } from 'react';

interface IMainPageButtonProps {
    isAdded: boolean;
    callback: ((e: MouseEvent) => void) | undefined;
}

export const MainPageButton = ({isAdded, callback}: IMainPageButtonProps) => {
    return (
        <>
            <MaterialButton size='small' color={isAdded ? 'primary' : 'success'} onClick={callback !== undefined ? (e) => callback(e) : undefined}>
            {isAdded ? 'Drom from basket' : 'Add to card'}
            </MaterialButton>
            <MaterialButton size='small' color='primary'>
                More
            </MaterialButton>
        </>
    )
}