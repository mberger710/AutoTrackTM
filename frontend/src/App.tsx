import React, { useState, useEffect } from 'react';
import { getTrackers, createVehicle } from './services/vehicles';

interface Tracker { id: string; name?: string; }

interface FormState {
  trackerId: string;
  vin: string;
  stock: string;
  make: string;
  model: string;
  year: string;
  color: string;
}

const App: React.FC = () => {
  const [trackers, setTrackers] = useState<Tracker[]>([]);
  const [form, setForm] = useState<FormState>({
    trackerId: '', vin: '', stock: '', make: '', model: '', year: '', color: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTrackers().then(setTrackers).catch(console.error);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.trackerId) return alert('Please select a tracker');
    setLoading(true);
    try {
      await createVehicle(form);
      alert('Vehicle successfully added!');
      setForm({ trackerId: '', vin: '', stock: '', make: '', model: '', year: '', color: '' });
    } catch {
      alert('Error adding vehicle');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Add New Vehicle</h1>
      <form onSubmit={handleSubmit}>
        <select name="trackerId" value={form.trackerId} onChange={handleChange} required>
          <option value="">-- Select BLE Tracker --</option>
          {trackers.map(t => (
            <option key={t.id} value={t.id}>{t.name || t.id}</option>
          ))}
        </select>

        {['vin','stock','make','model','year','color'].map(key => (
          <input
            key={key}
            name={key}
            type={key === 'year' ? 'number' : 'text'}
            placeholder={key.toUpperCase()}
            value={(form as any)[key]}
            onChange={handleChange}
            required
          />
        ))}

        <button type="submit" disabled={loading}>
          {loading ? 'Saving…' : 'Save Vehicle'}
        </button>
      </form>
    </div>
  );
};

export default App;
