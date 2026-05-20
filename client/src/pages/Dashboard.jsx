import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('events');
  const role = localStorage.getItem('role');

  // Form States
  const [eventData, setEventData] = useState({ title: '', date: '', status: 'Upcoming', type: 'Workshop', mode: 'Offline' });
  const [execomData, setExecomData] = useState({ name: '', position: '', department: '', year: '2026', email: '', linkedin: '', ieee: '' });
  const [userData, setUserData] = useState({ email: '', password: '', role: 'ExeCom' });
  const [contactData, setContactData] = useState({ email: '', phone: '', address: '', instagram: '', linkedin: '' });
  
  
  // NEW: Password Change State
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
  
  // Data Lists
  const [eventsList, setEventsList] = useState([]);
  const [execomList, setExecomList] = useState([]);
  const [usersList, setUsersList] = useState([]);

  // Editing Trackers
  const [editEventId, setEditEventId] = useState(null);
  const [editExecomId, setEditExecomId] = useState(null);
  const [editUserId, setEditUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { alert('Access Denied.'); navigate('/auth'); }
  }, [navigate]);

  useEffect(() => {
    if (activeTab === 'events') fetchEvents();
    if (activeTab === 'execom' && role === 'Admin') fetchExecom();
    if (activeTab === 'users' && role === 'Admin') fetchUsers();
    if (activeTab === 'settings' && role === 'Admin') fetchContactInfo();
  }, [activeTab, role]);

  // --- FETCHING ---
  const fetchEvents = async () => { try { const res = await axios.get('http://localhost:5000/api/events'); setEventsList(res.data); } catch (err) { console.error('Failed'); } };
  const fetchExecom = async () => { try { const res = await axios.get('http://localhost:5000/api/execom'); setExecomList(res.data); } catch (err) { console.error('Failed'); } };
  const fetchUsers = async () => { try { const token = localStorage.getItem('token'); const res = await axios.get('http://localhost:5000/api/auth/users', { headers: { Authorization: `Bearer ${token}` } }); setUsersList(res.data); } catch (err) { console.error('Failed'); } };
  const fetchContactInfo = async () => { try { const res = await axios.get('http://localhost:5000/api/contact'); setContactData(res.data); } catch (err) { console.error('Failed'); } };

  // --- EVENT HANDLERS ---
  const handleEventSubmit = async (e) => {
    e.preventDefault(); setMessage(''); setError('');
    const token = localStorage.getItem('token');
    
    // Create FormData wrapper
    const formData = new FormData();
    formData.append('title', eventData.title);
    formData.append('date', eventData.date);
    formData.append('status', eventData.status);
    formData.append('mode', eventData.mode);
    formData.append('type', eventData.type);
    
    // Append the physical file object if it exists
    if (eventData.image) {
      formData.append('image', eventData.image); 
    }

    try {
      if (editEventId) {
        // UPDATED: Now sending formData and including the multipart header!
        await axios.put(`http://localhost:5000/api/events/${editEventId}`, formData, { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data' 
          } 
        });
        setMessage('✅ Event updated!');
      } else {
        // Send the FormData for new creations
        await axios.post('http://localhost:5000/api/events', formData, { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data' // Tells your backend a file payload is coming
          } 
        });
        setMessage('✅ Event published with image!');
      }
      setEventData({ title: '', date: '', status: 'Upcoming', type: 'Workshop', mode: 'Offline', image: null }); 
      setEditEventId(null); fetchEvents();
    } catch (err) { 
      // This will pop up an alert box with the EXACT error coming from the backend
      const errorMessage = err.response?.data?.message || err.message;
      alert(`Backend Error: ${errorMessage}`);
      setError('❌ Failed to save event.'); }
  };
  const handleEditEvent = (event) => { setEventData({ ...event, date: new Date(event.date).toISOString().split('T')[0] }); setEditEventId(event._id); window.scrollTo(0, 0); };
  const handleDeleteEvent = async (id) => { if (!window.confirm("Delete event?")) return; try { const token = localStorage.getItem('token'); await axios.delete(`http://localhost:5000/api/events/${id}`, { headers: { Authorization: `Bearer ${token}` } }); setMessage('✅ Event deleted!'); fetchEvents(); } catch (err) { setError('❌ Failed.'); } };

  // --- EXECOM HANDLERS ---
  const handleExecomSubmit = async (e) => {
    e.preventDefault(); setMessage(''); setError('');
    const token = localStorage.getItem('token');
    try {
      if (editExecomId) await axios.put(`http://localhost:5000/api/execom/${editExecomId}`, execomData, { headers: { Authorization: `Bearer ${token}` } });
      else await axios.post('http://localhost:5000/api/execom', execomData, { headers: { Authorization: `Bearer ${token}` } });
      setMessage('✅ Member saved!'); setExecomData({ name: '', position: '', department: '', year: '2026', email: '', linkedin: '', ieee: '' }); setEditExecomId(null); fetchExecom();
    } catch (err) { setError('❌ Failed to save member.'); }
  };
  const handleEditExecom = (member) => { setExecomData(member); setEditExecomId(member._id); window.scrollTo(0, 0); };
  const handleDeleteExecom = async (id) => { if (!window.confirm("Delete member?")) return; try { const token = localStorage.getItem('token'); await axios.delete(`http://localhost:5000/api/execom/${id}`, { headers: { Authorization: `Bearer ${token}` } }); setMessage('✅ Member deleted!'); fetchExecom(); } catch (err) { setError('❌ Failed.'); } };

  // --- USER HANDLERS ---
  const handleUserSubmit = async (e) => {
    e.preventDefault(); setMessage(''); setError('');
    const token = localStorage.getItem('token');
    try {
      if (editUserId) {
        await axios.put(`http://localhost:5000/api/auth/users/${editUserId}`, userData, { headers: { Authorization: `Bearer ${token}` } });
        setMessage('✅ User updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/auth/users', userData, { headers: { Authorization: `Bearer ${token}` } });
        setMessage('✅ New user created successfully!');
      }
      setUserData({ email: '', password: '', role: 'ExeCom' }); setEditUserId(null); fetchUsers();
    } catch (err) { setError(err.response?.data?.message || err.response?.data?.error || '❌ Failed to save user.'); }
  };
  const handleEditUser = (user) => { setUserData({ email: user.email, password: '', role: user.role }); setEditUserId(user._id); window.scrollTo(0, 0); };
  const handleDeleteUser = async (id) => { if (!window.confirm("Delete this user forever? This cannot be undone.")) return; try { const token = localStorage.getItem('token'); await axios.delete(`http://localhost:5000/api/auth/users/${id}`, { headers: { Authorization: `Bearer ${token}` } }); setMessage('✅ User deleted!'); fetchUsers(); } catch (err) { setError('❌ Failed.'); } };

  // --- CONTACT HANDLERS ---
  const handleContactSubmit = async (e) => {
    e.preventDefault(); setMessage(''); setError('');
    try { const token = localStorage.getItem('token'); await axios.put('http://localhost:5000/api/contact', contactData, { headers: { Authorization: `Bearer ${token}` } }); setMessage('✅ Contact info updated!'); } catch (err) { setError('❌ Failed.'); }
  };

  // --- NEW: PASSWORD CHANGE HANDLER ---
  const handlePasswordChange = async (e) => {
    e.preventDefault(); setMessage(''); setError('');
    if (passwordData.new !== passwordData.confirm) {
      return setError('New passwords do not match.');
    }
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/auth/change-password', 
        { currentPassword: passwordData.current, newPassword: passwordData.new },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('✅ Password changed successfully!');
      setPasswordData({ current: '', new: '', confirm: '' });
    } catch (err) {
      setError(err.response?.data?.message || '❌ Failed to change password.');
    }
  };

  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2 style={{color: 'white', marginBottom: '0.5rem'}}>Portal</h2>
        <p style={{color: '#a0b2c6', marginBottom: '2rem', fontSize: '0.9rem'}}>Logged in as: {role}</p>
        
        <ul style={styles.sidebarList}>
          {/* Tabs visible to ALL logged-in users */}
          <li onClick={() => {setActiveTab('events'); setMessage(''); setError(''); setEditEventId(null);}} style={activeTab === 'events' ? styles.activeSidebarItem : styles.sidebarItem}>Manage Events</li>
          <li onClick={() => {setActiveTab('account'); setMessage(''); setError('');}} style={activeTab === 'account' ? styles.activeSidebarItem : styles.sidebarItem}>Account Settings</li>
          
          {/* Tabs visible ONLY to Admins */}
          {role === 'Admin' && (
            <>
              <li onClick={() => {setActiveTab('execom'); setMessage(''); setError(''); setEditExecomId(null);}} style={activeTab === 'execom' ? styles.activeSidebarItem : styles.sidebarItem}>Manage ExeCom</li>
              <li onClick={() => {setActiveTab('users'); setMessage(''); setError(''); setEditUserId(null);}} style={activeTab === 'users' ? styles.activeSidebarItem : styles.sidebarItem}>Manage Users</li>
              <li onClick={() => {setActiveTab('settings'); setMessage(''); setError('');}} style={activeTab === 'settings' ? styles.activeSidebarItem : styles.sidebarItem}>Site Settings</li>
            </>
          )}
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div style={styles.mainContent}>
        <h1 style={styles.header}>
          {activeTab === 'events' && (editEventId ? 'Edit Event' : 'Add New Event')}
          {activeTab === 'execom' && role === 'Admin' && (editExecomId ? 'Edit ExeCom Member' : 'Add ExeCom Member')}
          {activeTab === 'users' && role === 'Admin' && (editUserId ? 'Edit Account' : 'Register Authorized User')}
          {activeTab === 'settings' && role === 'Admin' && 'Site Settings'}
          {activeTab === 'account' && 'Account Settings'}
        </h1>
        
        {message && <div style={styles.successBox}>{message}</div>}
        {error && <div style={styles.errorBox}>{error}</div>}

        {/* ACCOUNT TAB (Visible to Everyone) */}
        {activeTab === 'account' && (
          <form onSubmit={handlePasswordChange} style={styles.form}>
            <h3 style={{margin: '0 0 1rem 0', color: '#002855'}}>Change Password</h3>
            <input 
              type="password" 
              placeholder="Current Password" 
              value={passwordData.current} 
              onChange={e => setPasswordData({...passwordData, current: e.target.value})} 
              style={styles.input} 
              required 
            />
            <div style={styles.row}>
              <input 
                type="password" 
                placeholder="New Password" 
                value={passwordData.new} 
                onChange={e => setPasswordData({...passwordData, new: e.target.value})} 
                style={{...styles.input, flex: 1}} 
                required 
              />
              <input 
                type="password" 
                placeholder="Confirm New Password" 
                value={passwordData.confirm} 
                onChange={e => setPasswordData({...passwordData, confirm: e.target.value})} 
                style={{...styles.input, flex: 1}} 
                required 
              />
            </div>
            <button type="submit" style={styles.button}>Update Password</button>
          </form>
        )}

        {/* EVENTS TAB */}
        {activeTab === 'events' && ( 
           <>
            <form onSubmit={handleEventSubmit} style={styles.form}>
              <div style={styles.row}>
                <input type="text" placeholder="Event Title" value={eventData.title} onChange={e => setEventData({...eventData, title: e.target.value})} style={{...styles.input, flex: 1}} required />
                <input type="date" value={eventData.date} onChange={e => setEventData({...eventData, date: e.target.value})} style={styles.input} required />
              </div>
              <div style={styles.row}>
                <select value={eventData.status} onChange={e => setEventData({...eventData, status: e.target.value})} style={{...styles.input, flex: 1}}>
                  <option value="Upcoming">Upcoming</option><option value="Ongoing">Ongoing</option><option value="Past">Past</option>
                </select>
                <select value={eventData.mode} onChange={e => setEventData({...eventData, mode: e.target.value})} style={{...styles.input, flex: 1}}>
                  <option value="Online">Online</option><option value="Offline">Offline</option>
                </select>
              </div>
              <input type="text" placeholder="Event Type" value={eventData.type} onChange={e => setEventData({...eventData, type: e.target.value})} style={styles.input} required />
              <div style={styles.row}>
                <label style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#333', display: 'flex', alignItems: 'center' }}>
                 Event Cover Image:
                </label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={e => setEventData({...eventData, image: e.target.files[0]})} 
                  style={{...styles.input, flex: 1}} 
                />
              </div>
              <div style={styles.row}>
                <button type="submit" style={{...styles.button, flex: 1}}>{editEventId ? 'Update Event' : 'Publish Event'}</button>
                {editEventId && <button type="button" onClick={() => {setEditEventId(null); setEventData({ title: '', date: '', status: 'Upcoming', type: 'Workshop', mode: 'Offline' })}} style={{...styles.button, backgroundColor: '#666', flex: 1}}>Cancel Edit</button>}
              </div>
            </form>

            <h3 style={{marginTop: '3rem', color: '#002855'}}>Existing Events</h3>
            <div style={styles.listContainer}>
              {eventsList.map(ev => (
                <div key={ev._id} style={styles.listItem}>
                  <div><strong>{ev.title}</strong> - {new Date(ev.date).toLocaleDateString()}</div>
                  <div style={styles.actionButtons}>
                    <button onClick={() => handleEditEvent(ev)} style={styles.editBtn}>Edit</button>
                    <button onClick={() => handleDeleteEvent(ev._id)} style={styles.deleteBtn}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
           </>
        )}

        {/* EXECOM TAB */}
        {activeTab === 'execom' && role === 'Admin' && ( 
           <>
            <form onSubmit={handleExecomSubmit} style={styles.form}>
              <div style={styles.row}>
                <input type="text" placeholder="Full Name" value={execomData.name} onChange={e => setExecomData({...execomData, name: e.target.value})} style={{...styles.input, flex: 1}} required />
                <input type="text" placeholder="Position" value={execomData.position} onChange={e => setExecomData({...execomData, position: e.target.value})} style={{...styles.input, flex: 1}} required />
              </div>
              <div style={styles.row}>
                <input type="text" placeholder="Department" value={execomData.department} onChange={e => setExecomData({...execomData, department: e.target.value})} style={{...styles.input, flex: 2}} required />
                <select value={execomData.year} onChange={e => setExecomData({...execomData, year: e.target.value})} style={{...styles.input, flex: 1}}>
                  <option value="2026">2026</option><option value="2025">2025</option>
                </select>
              </div>
              <input type="email" placeholder="Email Address" value={execomData.email} onChange={e => setExecomData({...execomData, email: e.target.value})} style={styles.input} required />
              <input type="url" placeholder="LinkedIn URL" value={execomData.linkedin} onChange={e => setExecomData({...execomData, linkedin: e.target.value})} style={styles.input} />
              
              <div style={styles.row}>
                <button type="submit" style={{...styles.button, flex: 1}}>{editExecomId ? 'Update Member' : 'Add Member'}</button>
                {editExecomId && <button type="button" onClick={() => {setEditExecomId(null); setExecomData({ name: '', position: '', department: '', year: '2026', email: '', linkedin: '', ieee: '' })}} style={{...styles.button, backgroundColor: '#666', flex: 1}}>Cancel Edit</button>}
              </div>
            </form>

            <h3 style={{marginTop: '3rem', color: '#002855'}}>Existing Members</h3>
            <div style={styles.listContainer}>
              {execomList.map(member => (
                <div key={member._id} style={styles.listItem}>
                  <div><strong>{member.name}</strong> - {member.position} ({member.year})</div>
                  <div style={styles.actionButtons}>
                    <button onClick={() => handleEditExecom(member)} style={styles.editBtn}>Edit</button>
                    <button onClick={() => handleDeleteExecom(member._id)} style={styles.deleteBtn}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
           </>
        )}

        {/* USERS TAB */}
        {activeTab === 'users' && role === 'Admin' && (
          <>
            <form onSubmit={handleUserSubmit} style={styles.form}>
              <div style={styles.row}>
                <input type="email" placeholder="Account Email" value={userData.email} onChange={e => setUserData({...userData, email: e.target.value})} style={{...styles.input, flex: 2}} required />
                <select value={userData.role} onChange={e => setUserData({...userData, role: e.target.value})} style={{...styles.input, flex: 1}}>
                  <option value="ExeCom">ExeCom</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <input 
                type="text" 
                placeholder={editUserId ? "New Password (leave blank to keep current)" : "Temporary Password"} 
                value={userData.password} 
                onChange={e => setUserData({...userData, password: e.target.value})} 
                style={styles.input} 
                required={!editUserId} 
              />
              <div style={styles.row}>
                <button type="submit" style={{...styles.button, flex: 1}}>{editUserId ? 'Update User' : 'Register User'}</button>
                {editUserId && <button type="button" onClick={() => {setEditUserId(null); setUserData({ email: '', password: '', role: 'ExeCom' })}} style={{...styles.button, backgroundColor: '#666', flex: 1}}>Cancel Edit</button>}
              </div>
            </form>

            <h3 style={{marginTop: '3rem', color: '#002855'}}>Registered Users</h3>
            <div style={styles.listContainer}>
              {usersList.map((user) => (
                <div key={user._id} style={styles.listItem}>
                  <div><strong>{user.email}</strong> - <span style={{color: user.role === 'Admin' ? '#047481' : '#00629B', fontWeight: 'bold'}}>{user.role}</span></div>
                  <div style={styles.actionButtons}>
                    <button onClick={() => handleEditUser(user)} style={styles.editBtn}>Edit</button>
                    <button onClick={() => handleDeleteUser(user._id)} style={styles.deleteBtn}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && role === 'Admin' && (
          <form onSubmit={handleContactSubmit} style={styles.form}>
            <input type="email" placeholder="Branch Email" value={contactData.email} onChange={e => setContactData({...contactData, email: e.target.value})} style={styles.input} required />
            <input type="text" placeholder="Phone Number" value={contactData.phone} onChange={e => setContactData({...contactData, phone: e.target.value})} style={styles.input} required />
            <input type="text" placeholder="Physical Address" value={contactData.address} onChange={e => setContactData({...contactData, address: e.target.value})} style={styles.input} required />
            <input type="url" placeholder="LinkedIn URL" value={contactData.linkedin} onChange={e => setContactData({...contactData, linkedin: e.target.value})} style={styles.input} />
            <input type="url" placeholder="Instagram URL" value={contactData.instagram} onChange={e => setContactData({...contactData, instagram: e.target.value})} style={styles.input} />
            <button type="submit" style={styles.button}>Save Contact Changes</button>
          </form>
        )}
      </div>
    </div>
  );
}

// Exactly the same clean styling as before
const styles = {
  container: { display: 'flex', minHeight: '80vh', backgroundColor: '#f4f7f6', borderRadius: '8px', overflow: 'hidden' },
  sidebar: { width: '250px', backgroundColor: '#002855', padding: '2rem', color: 'white' },
  sidebarList: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' },
  sidebarItem: { padding: '0.8rem', borderRadius: '4px', cursor: 'pointer', color: '#a0b2c6', fontWeight: 'bold' },
  activeSidebarItem: { padding: '0.8rem', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#00629B', color: 'white', fontWeight: 'bold' },
  mainContent: { flex: 1, padding: '3rem' },
  header: { color: '#002855', margin: '0 0 1.5rem 0' },
  successBox: { backgroundColor: '#e6fffa', color: '#047481', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem', fontWeight: 'bold' },
  errorBox: { backgroundColor: '#ffeef0', color: '#e63946', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem', fontWeight: 'bold' },
  form: { backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '1.2rem' },
  row: { display: 'flex', gap: '1rem' },
  input: { padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem', fontFamily: 'inherit' },
  button: { backgroundColor: '#00629B', color: 'white', padding: '1rem', border: 'none', borderRadius: '4px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' },
  listContainer: { display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' },
  listItem: { backgroundColor: 'white', padding: '1rem 1.5rem', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #eaeaea', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' },
  actionButtons: { display: 'flex', gap: '0.5rem' },
  editBtn: { backgroundColor: '#fca311', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' },
  deleteBtn: { backgroundColor: '#e63946', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }
};