export const API_BASE =
    import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://localhost:5174'

export function api(path) {
    return `${API_BASE}${path}`
}

export async function addVehicleAPI(payload) {
    const res = await fetch(api('/api/vehicles'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data?.error || 'Failed to add vehicle')
    return data
}

export async function getVehicles() {
    const res = await fetch(api('/api/vehicles/getAll'))
    const data = await res.json()
    if (!res.ok) throw new Error(data?.error || 'Failed to fetch vehicles')
    return data
}

export async function deleteVehicle(vehicleId) {
    const res = await fetch(api(`/api/vehicles/delete/${vehicleId}`), {
        method: 'DELETE',
    })
    if (!res.ok) throw new Error('Failed to delete vehicle')
    return
}