import React from 'react';
import { useLocation } from 'react-router-dom'

interface IParams {
    [key: string]: string[] | number[] | string;
}

interface IParamsParsed {
    [key: string]: string;
}

export const useQuery = () => {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const serializeQuery = (params: IParams) => {
    const parsedParams: IParamsParsed = {}
    for (const paramsKey in params) {
        if (params[paramsKey].length > 0){
            if(Array.isArray(params[paramsKey])){
                parsedParams[paramsKey] = (params[paramsKey] as []).join('↑')
            } else {
                parsedParams[paramsKey] = (params[paramsKey] as string)
            }
        }
    }
    return parsedParams
}
