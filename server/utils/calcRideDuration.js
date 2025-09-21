export function calcRideDuration(fromPincode, toPincode) {
    const diff = Math.abs(parseInt(fromPincode) - parseInt(toPincode))
    const duration = diff % 24
    return duration || 0
} 
