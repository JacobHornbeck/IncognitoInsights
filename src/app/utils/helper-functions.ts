const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

const zeroPad = (num: number, digits: number = 2) => {
    return String(num).padStart(digits, '0')
}

export function getPreciseTime(date: Date) {
    return `${zeroPad(date.getMonth()+1)}/${zeroPad(date.getDate())}/${date.getFullYear()} ${zeroPad(date.getHours())}:${zeroPad(date.getMinutes())}:${zeroPad(date.getSeconds())}`
}

export function getAbsoluteDate(date: Date) {
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

export function getRelativeDate(date: Date) {
    let basedOn = new Date()
    let difference = basedOn.getTime() - date.getTime()
    if (difference < 5000) return 'A few seconds ago'
    if (difference < 60000) return 'Less than a minute ago'
    if (difference < 120000) return 'A minute ago'
    if (difference < 3600000) return `${Math.floor(difference/60000)} minutes ago`
    if (difference < 7200000) return 'An hour ago'
    if (difference < 86400000) return `${Math.floor(difference/3600000)} hours ago`
    if (difference < 172800000) return '1 day ago'
    if (difference < 604800000) return `${Math.floor(difference/86400000)} days ago`
    if (difference < 1209600000) return '1 week ago'
    if (difference < 31536000000) return `${Math.floor(difference/604800000)} weeks ago`
    if (difference < 63072000000) return '1 year ago'
    if (difference >= 63072000000) return `${Math.floor(difference/31536000000)} years ago`
    return 'Some time in history'
}

export function getViewport() {
    let win = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        w = win.innerWidth || e.clientWidth || g.clientWidth,
        h = win.innerHeight || e.clientHeight || g.clientHeight;
    
    return { width: w, height: h }
}
