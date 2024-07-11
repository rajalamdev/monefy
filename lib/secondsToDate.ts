const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

export default function secondsToDate(s: number){
    return new Date(s * 1000).toLocaleString("en-US" , {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",

    })
}