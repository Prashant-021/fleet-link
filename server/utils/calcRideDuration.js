export function calcRideDuration(fromPincode, toPincode) {
    const duration = Math.abs(parseInt(fromPincode) - parseInt(toPincode) % 24)
    return duration || 0
} 
