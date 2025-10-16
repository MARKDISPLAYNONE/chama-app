import { useState, useEffect } from 'react';

export default function App() {
  const [view, setView] = useState('form'); // form, check-email, dashboard, invite-officer, pending-approvals, add-member, self-register, loan-view
  const [formData, setFormData] = useState({
    chamaName: '',
    chamaEmail: '',
    chairpersonName: '',
    chairpersonEmail: '',
    phone: '',
    password: '',
  });
  const [inviteData, setInviteData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Treasurer',
  });
  const [memberData, setMemberData] = useState({
    name: '',
    idNumber: '',
    phone: '',
    email: '',
  });
  const [selfRegData, setSelfRegData] = useState({
    name: '',
    idNumber: '',
    phone: '',
    email: '',
    reason: '',
  });
  const [errors, setErrors] = useState({});
  const [pendingUsers, setPendingUsers] = useState([]);

  // Simulate verification
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token === 'demo-verified-token') {
      setView('dashboard');
    } else if (token === 'loan-token-demo') {
      setView('loan-view');
    }
  }, []);

  // === VALIDATION ===
  const validateChairperson = () => {
    const e = {};
    if (!formData.chamaName.trim()) e.chamaName = 'Chama name is required';
    if (!formData.chamaEmail.trim()) e.chamaEmail = 'Chama email is required';
    if (!formData.chairpersonName.trim()) e.chairpersonName = 'Your name is required';
    if (!formData.chairpersonEmail.trim()) e.chairpersonEmail = 'Email is required';
    if (!formData.phone.trim()) {
      e.phone = 'Phone number is required';
    } else if (!/^(?:\+254|0)[17]\d{8}$/.test(formData.phone)) {
      e.phone = 'Enter a valid Kenyan phone';
    }
    if (formData.password.length < 8) e.password = 'Password must be at least 8 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateInvite = () => {
    const e = {};
    if (!inviteData.name.trim()) e.name = 'Name is required';
    if (!inviteData.email.trim()) e.email = 'Email is required';
    if (!inviteData.phone.trim() || !/^(?:\+254|0)[17]\d{8}$/.test(inviteData.phone)) {
      e.phone = 'Valid Kenyan phone required';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateMember = () => {
    const e = {};
    if (!memberData.name.trim()) e.name = 'Name is required';
    if (!memberData.idNumber.trim()) e.idNumber = 'National ID is required';
    if (!memberData.phone.trim() || !/^(?:\+254|0)[17]\d{8}$/.test(memberData.phone)) {
      e.phone = 'Valid Kenyan phone required';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateSelfReg = () => {
    const e = {};
    if (!selfRegData.name.trim()) e.name = 'Name is required';
    if (!selfRegData.idNumber.trim()) e.idNumber = 'National ID is required';
    if (!selfRegData.email.trim()) e.email = 'Email is required';
    if (!selfRegData.phone.trim() || !/^(?:\+254|0)[17]\d{8}$/.test(selfRegData.phone)) {
      e.phone = 'Valid Kenyan phone required';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // === HANDLERS ===
  const handleChairpersonChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleInviteChange = (e) => {
    const { name, value } = e.target;
    setInviteData({ ...inviteData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleMemberChange = (e) => {
    const { name, value } = e.target;
    setMemberData({ ...memberData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleSelfRegChange = (e) => {
    const { name, value } = e.target;
    setSelfRegData({ ...selfRegData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleCreateChama = (e) => {
    e.preventDefault();
    if (validateChairperson()) setView('check-email');
  };

  const handleInviteSubmit = (e) => {
    e.preventDefault();
    if (validateInvite()) {
      const newUser = { ...inviteData, type: 'Officer', status: 'Pending' };
      setPendingUsers([...pendingUsers, newUser]);
      alert(`✅ Invitation sent to ${inviteData.email}!`);
      setView('dashboard');
      setInviteData({ name: '', email: '', phone: '', role: 'Treasurer' });
    }
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (validateMember()) {
      const newMember = { ...memberData, type: 'Member', status: 'Pending' };
      setPendingUsers([...pendingUsers, newMember]);
      alert(`✅ Member ${memberData.name} added for approval!`);
      setView('dashboard');
      setMemberData({ name: '', idNumber: '', phone: '', email: '' });
    }
  };

  const handleSelfRegSubmit = (e) => {
    e.preventDefault();
    if (validateSelfReg()) {
      const newMember = { ...selfRegData, type: 'Member (Self)', status: 'Pending' };
      setPendingUsers([...pendingUsers, newMember]);
      alert(`✅ Request submitted! Await approval.`);
      setView('dashboard');
      setSelfRegData({ name: '', idNumber: '', phone: '', email: '', reason: '' });
    }
  };

  const handleApprove = (index) => {
    const updated = [...pendingUsers];
    updated[index].status = 'Approved';
    setPendingUsers(updated);
    alert('✅ Approved!');
  };

  const handleReject = (index) => {
    const updated = pendingUsers.filter((_, i) => i !== index);
    setPendingUsers(updated);
    alert('❌ Rejected.');
  };

  // === SCREENS ===

  // ... (check-email, dashboard, invite-officer screens remain same as before) ...

  if (view === 'check-email') {
    return (
      <div className="min-h-screen bg-background text-text p-4 font-sans">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4">Check Your Email</h1>
          <p className="mb-6 text-lg">
            We sent a verification link to:
            <br />
            <span className="font-bold">{formData.chairpersonEmail}</span>
          </p>
          <button onClick={() => setView('form')} className="w-full py-4 bg-gray-200 text-text font-bold text-lg rounded-xl mb-3">
            ← Edit Details
          </button>
          <button onClick={() => alert(`📧 Demo: Email resent to ${formData.chairpersonEmail}`)} className="w-full py-4 bg-button text-white font-bold text-lg rounded-xl">
            📤 Resend Email
          </button>
        </div>
      </div>
    );
  }

  if (view === 'dashboard') {
    return (
      <div className="min-h-screen bg-background text-text p-4 font-sans">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-2">Welcome, {formData.chairpersonName}!</h1>
          <p className="mb-6">Chama: <strong>{formData.chamaName}</strong></p>

          <div className="space-y-4">
            <button onClick={() => setView('invite-officer')} className="w-full py-4 bg-button text-white font-bold text-lg rounded-xl">
              👥 Invite Officer
            </button>
            <button onClick={() => setView('add-member')} className="w-full py-4 bg-green-600 text-white font-bold text-lg rounded-xl">
              ➕ Add Member
            </button>
            <button onClick={() => setView('self-register')} className="w-full py-4 bg-purple-600 text-white font-bold text-lg rounded-xl">
              🤝 Join This Chama (Public)
            </button>
            <button onClick={() => setView('pending-approvals')} className="w-full py-4 bg-yellow-500 text-text font-bold text-lg rounded-xl">
              ⏳ Pending Approvals ({pendingUsers.length})
            </button>
            <button onClick={() => window.location.href = '/?token=loan-token-demo'} className="w-full py-4 bg-blue-500 text-white font-bold text-lg rounded-xl">
              💸 View Loan (Demo)
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'invite-officer') {
    return (
      <div className="min-h-screen bg-background text-text p-4 font-sans">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-2">Invite Officer</h1>
          <form onSubmit={handleInviteSubmit} className="space-y-5">
            <div>
              <label className="block text-lg mb-1">Full Name *</label>
              <input type="text" name="name" value={inviteData.name} onChange={handleInviteChange} className="w-full p-4 text-lg border border-gray-300 rounded-xl" placeholder="e.g., John Kamau" />
              {errors.name && <p className="text-red-600 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-lg mb-1">Email *</label>
              <input type="email" name="email" value={inviteData.email} onChange={handleInviteChange} className="w-full p-4 text-lg border border-gray-300 rounded-xl" placeholder="officer@example.com" />
              {errors.email && <p className="text-red-600 mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-lg mb-1">Phone *</label>
              <input type="tel" name="phone" value={inviteData.phone} onChange={handleInviteChange} className="w-full p-4 text-lg border border-gray-300 rounded-xl" placeholder="0712345678" />
              {errors.phone && <p className="text-red-600 mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label className="block text-lg mb-1">Role *</label>
              <select name="role" value={inviteData.role} onChange={handleInviteChange} className="w-full p-4 text-lg border border-gray-300 rounded-xl bg-white">
                <option value="Treasurer">Treasurer</option>
                <option value="Secretary">Secretary</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="w-full py-4 bg-button text-white font-bold text-lg rounded-xl">✅ Send Invitation</button>
            <button type="button" onClick={() => setView('dashboard')} className="w-full py-4 bg-gray-200 text-text font-bold text-lg rounded-xl">← Back</button>
          </form>
        </div>
      </div>
    );
  }

  if (view === 'add-member') {
    return (
      <div className="min-h-screen bg-background text-text p-4 font-sans">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-2">Add Member</h1>
          <form onSubmit={handleAddMember} className="space-y-5">
            <div>
              <label className="block text-lg mb-1">Full Name *</label>
              <input type="text" name="name" value={memberData.name} onChange={handleMemberChange} className="w-full p-4 text-lg border border-gray-300 rounded-xl" placeholder="e.g., Mary Akinyi" />
              {errors.name && <p className="text-red-600 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-lg mb-1">National ID *</label>
              <input type="text" name="idNumber" value={memberData.idNumber} onChange={handleMemberChange} className="w-full p-4 text-lg border border-gray-300 rounded-xl" placeholder="e.g., 12345678" />
              {errors.idNumber && <p className="text-red-600 mt-1">{errors.idNumber}</p>}
            </div>
            <div>
              <label className="block text-lg mb-1">Phone *</label>
              <input type="tel" name="phone" value={memberData.phone} onChange={handleMemberChange} className="w-full p-4 text-lg border border-gray-300 rounded-xl" placeholder="0712345678" />
              {errors.phone && <p className="text-red-600 mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label className="block text-lg mb-1">Email (Optional)</label>
              <input type="email" name="email" value={memberData.email} onChange={handleMemberChange} className="w-full p-4 text-lg border border-gray-300 rounded-xl" placeholder="mary@example.com" />
            </div>
            <button type="submit" className="w-full py-4 bg-green-600 text-white font-bold text-lg rounded-xl">✅ Add Member</button>
            <button type="button" onClick={() => setView('dashboard')} className="w-full py-4 bg-gray-200 text-text font-bold text-lg rounded-xl">← Back</button>
          </form>
        </div>
      </div>
    );
  }

  if (view === 'self-register') {
    return (
      <div className="min-h-screen bg-background text-text p-4 font-sans">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-2">Join This Chama</h1>
          <p className="mb-4">Request to become a member.</p>
          <form onSubmit={handleSelfRegSubmit} className="space-y-5">
            <div>
              <label className="block text-lg mb-1">Full Name *</label>
              <input type="text" name="name" value={selfRegData.name} onChange={handleSelfRegChange} className="w-full p-4 text-lg border border-gray-300 rounded-xl" placeholder="Your name" />
              {errors.name && <p className="text-red-600 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-lg mb-1">National ID *</label>
              <input type="text" name="idNumber" value={selfRegData.idNumber} onChange={handleSelfRegChange} className="w-full p-4 text-lg border border-gray-300 rounded-xl" placeholder="Your ID number" />
              {errors.idNumber && <p className="text-red-600 mt-1">{errors.idNumber}</p>}
            </div>
            <div>
              <label className="block text-lg mb-1">Email *</label>
              <input type="email" name="email" value={selfRegData.email} onChange={handleSelfRegChange} className="w-full p-4 text-lg border border-gray-300 rounded-xl" placeholder="you@example.com" />
              {errors.email && <p className="text-red-600 mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-lg mb-1">Phone *</label>
              <input type="tel" name="phone" value={selfRegData.phone} onChange={handleSelfRegChange} className="w-full p-4 text-lg border border-gray-300 rounded-xl" placeholder="0712345678" />
              {errors.phone && <p className="text-red-600 mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label className="block text-lg mb-1">Why join? (Optional)</label>
              <textarea name="reason" value={selfRegData.reason} onChange={handleSelfRegChange} className="w-full p-4 text-lg border border-gray-300 rounded-xl" rows="3" />
            </div>
            <button type="submit" className="w-full py-4 bg-purple-600 text-white font-bold text-lg rounded-xl">✅ Submit Request</button>
            <button type="button" onClick={() => setView('dashboard')} className="w-full py-4 bg-gray-200 text-text font-bold text-lg rounded-xl">← Back</button>
          </form>
        </div>
      </div>
    );
  }

  if (view === 'pending-approvals') {
    return (
      <div className="min-h-screen bg-background text-text p-4 font-sans">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4">⏳ Pending Approvals</h1>
          {pendingUsers.length === 0 ? (
            <p className="text-lg">No pending requests.</p>
          ) : (
            <div className="space-y-4">
              {pendingUsers.map((user, index) => (
                <div key={index} className="border border-gray-300 rounded-xl p-4">
                  <h3 className="font-bold text-lg">{user.name}</h3>
                  <p>{user.type}</p>
                  <p className="text-sm text-gray-600">{user.email || user.phone}</p>
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => handleApprove(index)} className="flex-1 py-2 bg-green-600 text-white rounded-lg">✅ Approve</button>
                    <button onClick={() => handleReject(index)} className="flex-1 py-2 bg-red-600 text-white rounded-lg">❌ Reject</button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <button onClick={() => setView('dashboard')} className="w-full py-4 bg-gray-200 text-text font-bold text-lg rounded-xl mt-6">
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (view === 'loan-view') {
    return (
      <div className="min-h-screen bg-background text-text p-4 font-sans">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-2">💸 Loan Summary</h1>
          <div className="bg-blue-50 p-4 rounded-xl mb-4">
            <p><strong>Borrower:</strong> David Mwangi</p>
            <p><strong>Loan Amount:</strong> KES 25,000</p>
            <p><strong>Repaid:</strong> KES 5,000</p>
            <p><strong>Balance:</strong> KES 20,000</p>
            <p><strong>Due Date:</strong> 30 Oct 2025</p>
            <p><strong>Days Left:</strong> 13</p>
          </div>
          <p className="mb-4">Make payment to: <strong>{formData.chamaName || 'Chama Mpya'}</strong></p>
          <button onClick={() => alert('📧 Request sent to Treasurer for new link')} className="w-full py-4 bg-button text-white font-bold text-lg rounded-xl">
            📤 Request New Access Link
          </button>
          <button onClick={() => setView('dashboard')} className="w-full py-4 bg-gray-200 text-text font-bold text-lg rounded-xl mt-3">
            ← Back
          </button>
        </div>
      </div>
    );
  }

  // Default: Chairperson form
  return (
    <div className="min-h-screen bg-background text-text p-4 font-sans">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-2">Create Your Chama</h1>
        <p className="mb-6 text-lg">Let’s set up your savings group together.</p>
        <form onSubmit={handleCreateChama} className="space-y-5">
          <div>
            <label className="block text-lg mb-1">Chama Name *</label>
            <input type="text" name="chamaName" value={formData.chamaName} onChange={handleChairpersonChange} className="w-full p-4 text-lg border border-gray-300 rounded-xl" placeholder="e.g., Mama Grace’s Circle" />
            {errors.chamaName && <p className="text-red-600 mt-1">{errors.chamaName}</p>}
          </div>
          <div>
            <label className="block text-lg mb-1">Chama Email *</label>
            <input type="email" name="chamaEmail" value={formData.chamaEmail} onChange={handleChairpersonChange} className="w-full p-4 text-lg border border-gray-300 rounded-xl" placeholder="chama@example.com" />
            {errors.chamaEmail && <p className="text-red-600 mt-1">{errors.chamaEmail}</p>}
          </div>
          <div>
            <label className="block text-lg mb-1">Your Full Name *</label>
            <input type="text" name="chairpersonName" value={formData.chairpersonName} onChange={handleChairpersonChange} className="w-full p-4 text-lg border border-gray-300 rounded-xl" placeholder="e.g., Grace Akinyi" />
            {errors.chairpersonName && <p className="text-red-600 mt-1">{errors.chairpersonName}</p>}
          </div>
          <div>
            <label className="block text-lg mb-1">Your Email *</label>
            <input type="email" name="chairpersonEmail" value={formData.chairpersonEmail} onChange={handleChairpersonChange} className="w-full p-4 text-lg border border-gray-300 rounded-xl" placeholder="you@example.com" />
            {errors.chairpersonEmail && <p className="text-red-600 mt-1">{errors.chairpersonEmail}</p>}
          </div>
          <div>
            <label className="block text-lg mb-1">Phone Number *</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChairpersonChange} className="w-full p-4 text-lg border border-gray-300 rounded-xl" placeholder="0712345678 or +254712345678" />
            {errors.phone && <p className="text-red-600 mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label className="block text-lg mb-1">Password *</label>
            <input type="password" name="password" value={formData.password} onChange={handleChairpersonChange} className="w-full p-4 text-lg border border-gray-300 rounded-xl" placeholder="At least 8 characters" />
            {errors.password && <p className="text-red-600 mt-1">{errors.password}</p>}
          </div>
          <button type="submit" className="w-full py-4 bg-button text-white font-bold text-lg rounded-xl mt-4">
            ✅ Create Chama
          </button>
        </form>
      </div>
    </div>
  );
}