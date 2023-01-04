export const substringStr = (str: string, length: number) => {
    return str.length > 25 ? str.substring(0, length-1) + '...' : str
}