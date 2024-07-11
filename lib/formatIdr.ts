export function formatId(num: any) {
    if (num === 0 ) return 'Rp. 0'
    if (typeof num !== 'number' || isNaN(num)) {
        return 'Rp. 0'; // Defaultsdfsdf value or error handling
    }
    return 'Rp. ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}