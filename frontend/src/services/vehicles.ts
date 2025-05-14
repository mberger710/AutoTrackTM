export interface VehiclePayload {
  trackerId: string;
  vin: string;
  stock: string;
  make: string;
  model: string;
  year: string;
  color: string;
}

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

export const getTrackers = async (): Promise<{id:string,name?:string}[]> => {
  const res = await fetch(`${API_URL}/api/trackers`);
  if (!res.ok) throw new Error('Failed to fetch trackers');
  return res.json();
};

export const createVehicle = async (data: VehiclePayload) => {
  const res = await fetch(`${API_URL}/api/vehicles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      trackerId: data.trackerId,
      vin: data.vin,
      stock_number: data.stock,
      make: data.make,
      model: data.model,
      year: Number(data.year),
      color: data.color
    })
  });
  if (!res.ok) throw new Error('Failed to create vehicle');
  return res.json();
};
// tesing edits