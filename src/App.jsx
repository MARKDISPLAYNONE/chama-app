import { useState } from 'react';

export default function App() {
  const [formData, setFormData] = useState({
    chamaName: '',
    chamaEmail: '',
    chairpersonName: '',
    chairpersonEmail: '',
    phone: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.chamaName.trim()) newErrors.chamaName = 'Chama name is required';
    if (!formData.chamaEmail.trim()) newErrors.chamaEmail = 'Chama email is required';
    if (!formData.chairpersonName.trim()) newErrors.chairpersonName = 'Your name is required';
    if (!formData.chairpersonEmail.trim()) newErrors.chairpersonEmail = 'Email is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else {
      // Accepts: 07XXXXXXXX, 01XXXXXXXX, +2547XXXXXXXX, +2541XXXXXXXX
      const phoneRegex = /^(?:\+254|0)[17]\d{8}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Enter a valid Kenyan phone (e.g., 0712345678 or +254712345678)';
      }
    }
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('✅ Chama created! (Demo only — no real data saved)');
    }
  };

  return (
    <div className="min-h-screen bg-background text-text p-4 font-sans">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-2">Create Your Chama</h1>
        <p className="mb-6 text-lg">Let’s set up your savings group together.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Chama Name */}
          <div>
            <label className="block text-lg mb-1">Chama Name *</label>
            <input
              type="text"
              name="chamaName"
              value={formData.chamaName}
              onChange={handleChange}
              className="w-full p-4 text-lg border border-gray-300 rounded-xl"
              placeholder="e.g., Mama Grace’s Circle"
            />
            {errors.chamaName && <p className="text-red-600 mt-1">{errors.chamaName}</p>}
          </div>

          {/* Chama Email */}
          <div>
            <label className="block text-lg mb-1">Chama Email *</label>
            <input
              type="email"
              name="chamaEmail"
              value={formData.chamaEmail}
              onChange={handleChange}
              className="w-full p-4 text-lg border border-gray-300 rounded-xl"
              placeholder="chama@example.com"
            />
            {errors.chamaEmail && <p className="text-red-600 mt-1">{errors.chamaEmail}</p>}
          </div>

          {/* Chairperson Name */}
          <div>
            <label className="block text-lg mb-1">Your Full Name *</label>
            <input
              type="text"
              name="chairpersonName"
              value={formData.chairpersonName}
              onChange={handleChange}
              className="w-full p-4 text-lg border border-gray-300 rounded-xl"
              placeholder="e.g., Grace Akinyi"
            />
            {errors.chairpersonName && <p className="text-red-600 mt-1">{errors.chairpersonName}</p>}
          </div>

          {/* Personal Email */}
          <div>
            <label className="block text-lg mb-1">Your Email *</label>
            <input
              type="email"
              name="chairpersonEmail"
              value={formData.chairpersonEmail}
              onChange={handleChange}
              className="w-full p-4 text-lg border border-gray-300 rounded-xl"
              placeholder="you@example.com"
            />
            {errors.chairpersonEmail && <p className="text-red-600 mt-1">{errors.chairpersonEmail}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-lg mb-1">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-4 text-lg border border-gray-300 rounded-xl"
              placeholder="0712345678 or +254712345678"
            />
            {errors.phone && <p className="text-red-600 mt-1">{errors.phone}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-lg mb-1">Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-4 text-lg border border-gray-300 rounded-xl"
              placeholder="At least 8 characters"
            />
            {errors.password && <p className="text-red-600 mt-1">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-button text-white font-bold text-lg rounded-xl mt-4"
          >
            ✅ Create Chama
          </button>
        </form>
      </div>
    </div>
  );
}