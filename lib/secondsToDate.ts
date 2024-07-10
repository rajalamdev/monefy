export default function secondsToDate(s: number){
    return new Date(s * 1000).toLocaleString()
}