/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Calendar, Users, Briefcase, Settings, UserCircle, LogOut, X, Key } from 'lucide-react';

import AnimatedCard from '../components/AnimatedCard';
import TiltCard from '../components/TiltCard';

export default function Dashboard() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('events');
  const role = localStorage.getItem('role');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form States
  const [eventData, setEventData] = useState({ title: '', date: '', status: 'Upcoming', type: 'Workshop', mode: 'Offline', image: null });
  const [execomData, setExecomData] = useState({ name: '', position: '', department: '', year: '2026', email: '', linkedin: '', ieee: '' });
  const [execomPhotoFile, setExecomPhotoFile] = useState(null);
  const [execomPhotoPreview, setExecomPhotoPreview] = useState(null);
  const [userData, setUserData] = useState({ email: '', password: '', role: 'ExeCom' });
  const [contactData, setContactData] = useState({ email: '', phone: '', address: '', instagram: '', linkedin: '' });
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });

  // Data Lists
  const [eventsList, setEventsList] = useState([]);
  const [execomList, setExecomList] = useState([]);
  const [usersList, setUsersList] = useState([]);

  // Editing Trackers
  const [editEventId, setEditEventId] = useState(null);
  const [editExecomId, setEditExecomId] = useState(null);
  const [editUserId, setEditUserId] = useState(null);

  // --- FETCHING --- 
  const fetchEvents = async () => { try { const res = await axios.get('http://localhost:5000/api/events'); setEventsList(res.data); } catch (err) { console.error('Failed', err); } };
  const fetchExecom = async () => { try { const res = await axios.get('http://localhost:5000/api/execom'); setExecomList(res.data); } catch (err) { console.error('Failed', err); } };
  const fetchUsers = async () => { try { const token = localStorage.getItem('token'); const res = await axios.get('http://localhost:5000/api/auth/users', { headers: { Authorization: `Bearer ${token}` } }); setUsersList(res.data); } catch (err) { console.error('Failed', err); } };
  const fetchContactInfo = async () => { try { const res = await axios.get('http://localhost:5000/api/contact'); setContactData(res.data); } catch (err) { console.error('Failed', err); } };

  // --- USE EFFECTS ---
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { alert('Access Denied.'); navigate('/auth'); }
  }, [navigate]);

  useEffect(() => {
    if (activeTab === 'events') fetchEvents();
    if (activeTab === 'execom' && role === 'Admin') fetchExecom();
    if (activeTab === 'users' && role === 'Admin') fetchUsers();
    if (activeTab === 'settings' && role === 'Admin') fetchContactInfo();
    
    // Clear messages when switching tabs
    setMessage(''); setError('');
  }, [activeTab, role]);

  // --- LOGOUT ---
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/auth');
  };

  // --- MODAL UTILS ---
  const closeModal = () => {
    setIsModalOpen(false);
    setEditEventId(null); setEditExecomId(null); setEditUserId(null);
    setEventData({ title: '', date: '', status: 'Upcoming', type: 'Workshop', mode: 'Offline', image: null });
    setExecomData({ name: '', position: '', department: '', year: '2026', email: '', linkedin: '', ieee: '' });
    setExecomPhotoFile(null); setExecomPhotoPreview(null);
    setUserData({ email: '', password: '', role: 'ExeCom' });
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  const openAddModal = () => {
    setMessage(''); setError('');
    setIsModalOpen(true);
  };

  // --- EVENT HANDLERS ---
  const handleEventSubmit = async (e) => {
    e.preventDefault(); setMessage(''); setError('');
    const token = localStorage.getItem('token');
    
    const formData = new FormData();
    formData.append('title', eventData.title);
    formData.append('date', eventData.date);
    formData.append('status', eventData.status);
    formData.append('mode', eventData.mode);
    formData.append('type', eventData.type);
    if (eventData.image) formData.append('image', eventData.image); 

    try {
      if (editEventId) {
        await axios.put(`http://localhost:5000/api/events/${editEventId}`, formData, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } });
        setMessage('✅ Event updated!');
      } else {
        await axios.post('http://localhost:5000/api/events', formData, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } });
        setMessage('✅ Event published!');
      }
      closeModal(); fetchEvents();
    } catch (err) { setError(`❌ Failed to save event: ${err.response?.data?.message || err.message}`); }
  };
  const handleEditEvent = (event) => { setEventData({ ...event, date: new Date(event.date).toISOString().split('T')[0] }); setEditEventId(event.id); setIsModalOpen(true); };
  const handleDeleteEvent = async (id) => { if (!window.confirm("Delete event?")) return; try { const token = localStorage.getItem('token'); await axios.delete(`http://localhost:5000/api/events/${id}`, { headers: { Authorization: `Bearer ${token}` } }); setMessage('✅ Event deleted!'); fetchEvents(); } catch (err) { setError('❌ Failed.'); } };

  // --- EXECOM HANDLERS ---
  const handleExecomSubmit = async (e) => {
    e.preventDefault(); setMessage(''); setError('');
    const token = localStorage.getItem('token');
    try {
      const formData = new FormData();
      formData.append('name', execomData.name);
      formData.append('position', execomData.position);
      formData.append('department', execomData.department);
      formData.append('year', execomData.year);
      formData.append('email', execomData.email);
      formData.append('linkedin', execomData.linkedin || '');
      formData.append('ieee', execomData.ieee || '');
      // Send existing photo URL if no new file was picked (so it is not cleared on update)
      if (!execomPhotoFile && execomData.photo) formData.append('photo', execomData.photo);
      if (execomPhotoFile) formData.append('photo', execomPhotoFile);

      const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' };
      if (editExecomId) await axios.put(`http://localhost:5000/api/execom/${editExecomId}`, formData, { headers });
      else await axios.post('http://localhost:5000/api/execom', formData, { headers });
      setMessage('✅ Member saved!'); closeModal(); fetchExecom();
    } catch (err) { setError('❌ Failed to save member.'); }
  };
  const handleEditExecom = (member) => {
    setExecomData(member);
    setExecomPhotoFile(null);
    setExecomPhotoPreview(member.photo || null);
    setEditExecomId(member.id);
    setIsModalOpen(true);
  };
  const handleDeleteExecom = async (id) => { if (!window.confirm("Delete member?")) return; try { const token = localStorage.getItem('token'); await axios.delete(`http://localhost:5000/api/execom/${id}`, { headers: { Authorization: `Bearer ${token}` } }); setMessage('✅ Member deleted!'); fetchExecom(); } catch (err) { setError('❌ Failed.'); } };

  // --- USER HANDLERS ---
  const handleUserSubmit = async (e) => {
    e.preventDefault(); setMessage(''); setError('');
    const token = localStorage.getItem('token');
    try {
      if (editUserId) await axios.put(`http://localhost:5000/api/auth/users/${editUserId}`, userData, { headers: { Authorization: `Bearer ${token}` } });
      else await axios.post('http://localhost:5000/api/auth/users', userData, { headers: { Authorization: `Bearer ${token}` } });
      setMessage('✅ User saved successfully!'); closeModal(); fetchUsers();
    } catch (err) { setError(err.response?.data?.message || err.response?.data?.error || '❌ Failed to save user.'); }
  };
  const handleEditUser = (user) => { setUserData({ email: user.email, password: '', role: user.role }); setEditUserId(user.id); setIsModalOpen(true); };
  const handleDeleteUser = async (id) => { if (!window.confirm("Delete this user forever?")) return; try { const token = localStorage.getItem('token'); await axios.delete(`http://localhost:5000/api/auth/users/${id}`, { headers: { Authorization: `Bearer ${token}` } }); setMessage('✅ User deleted!'); fetchUsers(); } catch (err) { setError('❌ Failed.'); } };

  // --- CONTACT HANDLERS ---
  const handleContactSubmit = async (e) => {
    e.preventDefault(); setMessage(''); setError('');
    try { const token = localStorage.getItem('token'); await axios.put('http://localhost:5000/api/contact', contactData, { headers: { Authorization: `Bearer ${token}` } }); setMessage('✅ Contact info updated!'); } catch (err) { setError('❌ Failed.'); }
  };

  // --- PASSWORD HANDLER ---
  const handlePasswordChange = async (e) => {
    e.preventDefault(); setMessage(''); setError('');
    if (passwordData.new !== passwordData.confirm) return setError('New passwords do not match.');
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/auth/change-password', { currentPassword: passwordData.current, newPassword: passwordData.new }, { headers: { Authorization: `Bearer ${token}` } });
      setMessage('✅ Password changed successfully!'); closeModal();
    } catch (err) { setError(err.response?.data?.message || '❌ Failed to change password.'); }
  };

  // --- UI CONSTANTS ---
  const tabs = [
    { id: 'events', label: 'Events', icon: Calendar, adminOnly: false },
    { id: 'execom', label: 'ExeCom', icon: Briefcase, adminOnly: true },
    { id: 'users', label: 'Users', icon: Users, adminOnly: true },
    { id: 'settings', label: 'Settings', icon: Settings, adminOnly: true },
    { id: 'account', label: 'Account', icon: UserCircle, adminOnly: false },
  ].filter(tab => !tab.adminOnly || role === 'Admin');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-dark)', paddingTop: '100px', paddingBottom: '4rem', position: 'relative' }}>
      
      {/* BACKGROUND ORBS */}
      <div style={{ position: 'fixed', top: '10%', left: '5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '10%', right: '5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(0,243,255,0.1) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }} />

      <div className="page-container" style={{ maxWidth: '1400px', zIndex: 1, position: 'relative', paddingTop: '0' }}>
        
        {/* FLOATING PILL NAVIGATION */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
          <div className="glass-panel" style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem', borderRadius: '50px', alignItems: 'center' }}>
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    position: 'relative',
                    background: 'transparent',
                    border: 'none',
                    color: isActive ? 'white' : 'var(--text-secondary)',
                    padding: '0.8rem 1.5rem',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.95rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'color 0.3s ease',
                    outline: 'none'
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(139, 92, 246, 0.25)',
                        border: '1px solid rgba(139, 92, 246, 0.5)',
                        borderRadius: '50px',
                        boxShadow: '0 0 15px rgba(139, 92, 246, 0.3)',
                        zIndex: 0
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon size={18} style={{ zIndex: 1, position: 'relative' }} />
                  <span style={{ zIndex: 1, position: 'relative' }}>{tab.label}</span>
                </button>
              );
            })}
            
            <div style={{ width: '1px', height: '30px', background: 'var(--card-border)', margin: '0 0.5rem' }} />
            
            <button
              onClick={handleLogout}
              style={{
                background: 'transparent', border: 'none', color: '#ef4444',
                padding: '0.8rem 1.5rem', borderRadius: '50px', cursor: 'pointer',
                fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem',
                transition: 'background 0.3s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        {/* HEADER AREA */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div>
            <h1 className="text-gradient" style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0' }}>
              {activeTab === 'events' && 'Event Command Center'}
              {activeTab === 'execom' && 'Executive Committee'}
              {activeTab === 'users' && 'Authorized Access'}
              {activeTab === 'settings' && 'System Configuration'}
              {activeTab === 'account' && 'My Profile'}
            </h1>
            <p className="subtitle" style={{ margin: 0 }}>
              Manage your branch data seamlessly.
            </p>
          </div>

          {/* DYNAMIC FLOATING ACTION BUTTON */}
          {['events', 'execom', 'users'].includes(activeTab) && (
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(0, 243, 255, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={openAddModal}
              className="btn-primary"
              style={{
                background: 'linear-gradient(135deg, var(--neon-blue), #0284c7)',
                display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.5rem',
                borderRadius: '50px', border: '1px solid rgba(0,243,255,0.4)',
                boxShadow: '0 0 15px rgba(0,243,255,0.2)'
              }}
            >
              <Plus size={20} />
              <span>Add {activeTab === 'events' ? 'Event' : activeTab === 'execom' ? 'Member' : 'User'}</span>
            </motion.button>
          )}

          {activeTab === 'account' && (
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '50px' }}
            >
              <Key size={20} /> Change Password
            </motion.button>
          )}
        </div>

        {/* GLOBAL MESSAGES */}
        <AnimatePresence>
          {message && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', color: '#10b981', borderRadius: '8px', marginBottom: '2rem', fontWeight: 'bold' }}>
              {message}
            </motion.div>
          )}
          {error && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '8px', marginBottom: '2rem', fontWeight: 'bold' }}>
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- TAB CONTENTS (GRID LAYOUTS) --- */}
        
        {activeTab === 'events' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {eventsList.map((ev, i) => (
              <TiltCard key={ev.id} delay={i * 0.05} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0, color: 'white', fontSize: '1.2rem', paddingRight: '1rem' }}>{ev.title}</h3>
                  <span style={{ background: ev.status === 'Upcoming' ? 'rgba(0, 243, 255, 0.2)' : 'rgba(139, 92, 246, 0.2)', color: ev.status === 'Upcoming' ? 'var(--neon-blue)' : 'var(--neon-purple)', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>{ev.status}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', margin: '0 0 1rem 0', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Calendar size={14} /> {new Date(ev.date).toLocaleDateString()}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--card-border)' }}>
                  <span style={{ fontSize: '0.8rem', color: '#aaa', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>{ev.type}</span>
                  <span style={{ fontSize: '0.8rem', color: '#aaa', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>{ev.mode}</span>
                </div>
                
                {/* Hover Action Overlay */}
                <div className="card-actions" style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem', opacity: 0, transition: 'opacity 0.3s ease' }}>
                   <button onClick={() => handleEditEvent(ev)} style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', border: '1px solid #f59e0b', padding: '0.4rem', borderRadius: '6px', cursor: 'pointer' }}><Edit2 size={16} /></button>
                   <button onClick={() => handleDeleteEvent(ev.id)} style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid #ef4444', padding: '0.4rem', borderRadius: '6px', cursor: 'pointer' }}><Trash2 size={16} /></button>
                </div>
              </TiltCard>
            ))}
          </div>
        )}

        {activeTab === 'execom' && role === 'Admin' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {execomList.map((member, i) => (
              <TiltCard key={member.id} delay={i * 0.05} className="glass-panel" style={{ padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  {/* Avatar: real photo or initial fallback */}
                  {member.photo ? (
                    <img src={member.photo} alt={member.name}
                      style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover',
                        border: '2px solid rgba(139, 92, 246, 0.6)',
                        boxShadow: '0 0 10px rgba(139, 92, 246, 0.4)' }}
                    />
                  ) : (
                    <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--neon-purple), #6d28d9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', flexShrink: 0 }}>
                      {member.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 style={{ margin: 0, color: 'white', fontSize: '1.1rem' }}>{member.name}</h3>
                    <p style={{ margin: 0, color: 'var(--neon-blue)', fontSize: '0.85rem' }}>{member.position}</p>
                  </div>
                </div>
                <p style={{ color: 'var(--text-secondary)', margin: '0 0 0.5rem 0', fontSize: '0.85rem' }}>{member.department}</p>
                <span style={{ fontSize: '0.75rem', color: '#ccc', background: 'rgba(255,255,255,0.1)', padding: '0.1rem 0.5rem', borderRadius: '12px' }}>Class of {member.year}</span>

                <div className="card-actions" style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem', opacity: 0, transition: 'opacity 0.3s ease' }}>
                   <button onClick={() => handleEditExecom(member)} style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', border: '1px solid #f59e0b', padding: '0.4rem', borderRadius: '6px', cursor: 'pointer' }}><Edit2 size={16} /></button>
                   <button onClick={() => handleDeleteExecom(member.id)} style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid #ef4444', padding: '0.4rem', borderRadius: '6px', cursor: 'pointer' }}><Trash2 size={16} /></button>
                </div>
              </TiltCard>
            ))}
          </div>
        )}

        {activeTab === 'users' && role === 'Admin' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {usersList.map((user, i) => (
              <AnimatedCard key={user.id} delay={i * 0.05} className="glass-panel" style={{ padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(0, 243, 255, 0.1)', border: '1px solid rgba(0, 243, 255, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--neon-blue)' }}>
                    <Users size={20} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, color: 'white', fontSize: '1rem', wordBreak: 'break-all' }}>{user.email}</h3>
                    <p style={{ margin: '0.2rem 0 0 0', color: user.role === 'Admin' ? 'var(--neon-purple)' : 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 'bold' }}>{user.role}</p>
                  </div>
                </div>
                
                <div className="card-actions" style={{ position: 'absolute', top: '1.5rem', right: '1rem', display: 'flex', gap: '0.5rem', opacity: 0, transition: 'opacity 0.3s ease' }}>
                   <button onClick={() => handleEditUser(user)} style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', border: '1px solid #f59e0b', padding: '0.4rem', borderRadius: '6px', cursor: 'pointer' }}><Edit2 size={16} /></button>
                   <button onClick={() => handleDeleteUser(user.id)} style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid #ef4444', padding: '0.4rem', borderRadius: '6px', cursor: 'pointer' }}><Trash2 size={16} /></button>
                </div>
              </AnimatedCard>
            ))}
          </div>
        )}

        {/* SETTINGS CONTENT (Embedded, no modal) */}
        {activeTab === 'settings' && role === 'Admin' && (
          <AnimatedCard className="glass-panel" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ color: 'white', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Settings size={24} color="var(--neon-purple)" /> Contact Information Setup
            </h2>
            <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input type="email" placeholder="Branch Email" value={contactData.email} onChange={e => setContactData({...contactData, email: e.target.value})} className="glass-input" style={{flex: 1}} required />
                <input type="text" placeholder="Phone Number" value={contactData.phone} onChange={e => setContactData({...contactData, phone: e.target.value})} className="glass-input" style={{flex: 1}} required />
              </div>
              <input type="text" placeholder="Physical Address" value={contactData.address} onChange={e => setContactData({...contactData, address: e.target.value})} className="glass-input" required />
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input type="url" placeholder="LinkedIn URL" value={contactData.linkedin} onChange={e => setContactData({...contactData, linkedin: e.target.value})} className="glass-input" style={{flex: 1}} />
                <input type="url" placeholder="Instagram URL" value={contactData.instagram} onChange={e => setContactData({...contactData, instagram: e.target.value})} className="glass-input" style={{flex: 1}} />
              </div>
              <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', padding: '1rem 2.5rem' }}>Save Configuration</button>
            </form>
          </AnimatedCard>
        )}

        {/* ACCOUNT TAB CONTENT (Embedded) */}
        {activeTab === 'account' && (
          <AnimatedCard className="glass-panel" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.3)', margin: '0 auto 1.5rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserCircle size={40} color="var(--neon-purple)" />
            </div>
            <h2 style={{ color: 'white', margin: '0 0 0.5rem 0' }}>Profile Details</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>You are logged in with {role} privileges.</p>
            <p style={{ color: '#aaa', fontSize: '0.9rem', maxWidth: '500px', margin: '0 auto' }}>
              To update your password, use the "Change Password" button in the top right. 
              If you need to change your email or role, please contact an Administrator.
            </p>
          </AnimatedCard>
        )}

      </div>

      {/* --- FLOATING FROSTED GLASS MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeModal}
              style={{ position: 'absolute', inset: 0, background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(8px)' }}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="glass-panel"
              style={{ position: 'relative', width: '100%', maxWidth: '600px', padding: '2.5rem', background: 'rgba(20, 20, 35, 0.85)', boxShadow: '0 0 50px rgba(0,0,0,0.8), 0 0 0 1px rgba(139, 92, 246, 0.3)' }}
            >
              <button onClick={closeModal} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <X size={24} />
              </button>

              <h2 style={{ color: 'white', marginTop: 0, marginBottom: '2rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '1rem' }}>
                {activeTab === 'events' ? (editEventId ? 'Edit Event' : 'Add New Event') : null}
                {activeTab === 'execom' ? (editExecomId ? 'Edit Member' : 'Add Member') : null}
                {activeTab === 'users' ? (editUserId ? 'Edit Account' : 'Register User') : null}
                {activeTab === 'account' ? 'Change Password' : null}
              </h2>

              {/* EVENT FORM */}
              {activeTab === 'events' && (
                <form onSubmit={handleEventSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <input type="text" placeholder="Event Title" value={eventData.title} onChange={e => setEventData({...eventData, title: e.target.value})} className="glass-input" style={{flex: 2}} required />
                    <input type="date" value={eventData.date} onChange={e => setEventData({...eventData, date: e.target.value})} className="glass-input" style={{flex: 1}} required />
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <select value={eventData.status} onChange={e => setEventData({...eventData, status: e.target.value})} className="glass-input" style={{flex: 1}}>
                      <option value="Upcoming">Upcoming</option><option value="Ongoing">Ongoing</option><option value="Past">Past</option>
                    </select>
                    <select value={eventData.mode} onChange={e => setEventData({...eventData, mode: e.target.value})} className="glass-input" style={{flex: 1}}>
                      <option value="Online">Online</option><option value="Offline">Offline</option>
                    </select>
                    <input type="text" placeholder="Type (e.g. Workshop)" value={eventData.type} onChange={e => setEventData({...eventData, type: e.target.value})} className="glass-input" style={{flex: 1}} required />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Event Cover Image (Optional)</label>
                    <input type="file" accept="image/*" onChange={e => setEventData({...eventData, image: e.target.files[0]})} className="glass-input" />
                  </div>
                  <button type="submit" className="btn-primary" style={{ marginTop: '1rem', padding: '1rem' }}>{editEventId ? 'Save Changes' : 'Publish Event'}</button>
                </form>
              )}

              {/* EXECOM FORM */}
              {activeTab === 'execom' && (
                <form onSubmit={handleExecomSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                  {/* --- PHOTO UPLOADER --- */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    {/* Preview circle */}
                    <div style={{
                      width: '80px', height: '80px', borderRadius: '50%', flexShrink: 0,
                      background: execomPhotoPreview ? 'transparent' : 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(0,243,255,0.1))',
                      border: '2px dashed rgba(139, 92, 246, 0.5)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      overflow: 'hidden', cursor: 'pointer',
                      boxShadow: execomPhotoPreview ? '0 0 15px rgba(139,92,246,0.4)' : 'none',
                      transition: 'box-shadow 0.3s ease'
                    }}
                      onClick={() => document.getElementById('execomPhotoInput').click()}
                    >
                      {execomPhotoPreview
                        ? <img src={execomPhotoPreview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        : <span style={{ fontSize: '1.8rem' }}>📷</span>
                      }
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: '0 0 0.5rem 0', color: 'white', fontWeight: '600', fontSize: '0.95rem' }}>Member Photo</p>
                      <p style={{ margin: '0 0 0.8rem 0', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Click the circle or the button to upload. JPG, PNG, WEBP.</p>
                      <label htmlFor="execomPhotoInput" style={{
                        display: 'inline-block', padding: '0.4rem 1rem',
                        background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139,92,246,0.4)',
                        color: 'var(--neon-purple)', borderRadius: '6px', cursor: 'pointer',
                        fontSize: '0.85rem', fontWeight: '600', transition: 'all 0.2s'
                      }}>
                        {execomPhotoPreview ? 'Change Photo' : 'Upload Photo'}
                      </label>
                      {execomPhotoPreview && (
                        <button type="button" onClick={() => { setExecomPhotoFile(null); setExecomPhotoPreview(null); }}
                          style={{ marginLeft: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', padding: '0.4rem 1rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}
                        >Remove</button>
                      )}
                      <input id="execomPhotoInput" type="file" accept="image/*" style={{ display: 'none' }}
                        onChange={e => {
                          const file = e.target.files[0];
                          if (!file) return;
                          setExecomPhotoFile(file);
                          setExecomPhotoPreview(URL.createObjectURL(file));
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <input type="text" placeholder="Full Name" value={execomData.name} onChange={e => setExecomData({...execomData, name: e.target.value})} className="glass-input" style={{flex: 1}} required />
                    <input type="text" placeholder="Position" value={execomData.position} onChange={e => setExecomData({...execomData, position: e.target.value})} className="glass-input" style={{flex: 1}} required />
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <input type="text" placeholder="Department" value={execomData.department} onChange={e => setExecomData({...execomData, department: e.target.value})} className="glass-input" style={{flex: 2}} required />
                    <select value={execomData.year} onChange={e => setExecomData({...execomData, year: e.target.value})} className="glass-input" style={{flex: 1}}>
                      <option value="2026">2026</option><option value="2025">2025</option><option value="2024">2024</option>
                    </select>
                  </div>
                  <input type="email" placeholder="Email Address" value={execomData.email} onChange={e => setExecomData({...execomData, email: e.target.value})} className="glass-input" required />
                  <input type="url" placeholder="LinkedIn URL" value={execomData.linkedin} onChange={e => setExecomData({...execomData, linkedin: e.target.value})} className="glass-input" />
                  <button type="submit" className="btn-primary" style={{ marginTop: '1rem', padding: '1rem' }}>{editExecomId ? 'Save Changes' : 'Add Member'}</button>
                </form>
              )}

              {/* USER FORM */}
              {activeTab === 'users' && (
                <form onSubmit={handleUserSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <input type="email" placeholder="Account Email" value={userData.email} onChange={e => setUserData({...userData, email: e.target.value})} className="glass-input" style={{flex: 2}} required />
                    <select value={userData.role} onChange={e => setUserData({...userData, role: e.target.value})} className="glass-input" style={{flex: 1}}>
                      <option value="ExeCom">ExeCom</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  <input type="text" placeholder={editUserId ? "New Password (optional)" : "Temporary Password"} value={userData.password} onChange={e => setUserData({...userData, password: e.target.value})} className="glass-input" required={!editUserId} />
                  <button type="submit" className="btn-primary" style={{ marginTop: '1rem', padding: '1rem' }}>{editUserId ? 'Save Changes' : 'Create User'}</button>
                </form>
              )}

              {/* PASSWORD FORM */}
              {activeTab === 'account' && (
                <form onSubmit={handlePasswordChange} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <input type="password" placeholder="Current Password" value={passwordData.current} onChange={e => setPasswordData({...passwordData, current: e.target.value})} className="glass-input" required />
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <input type="password" placeholder="New Password" value={passwordData.new} onChange={e => setPasswordData({...passwordData, new: e.target.value})} className="glass-input" style={{flex: 1}} required />
                    <input type="password" placeholder="Confirm New Password" value={passwordData.confirm} onChange={e => setPasswordData({...passwordData, confirm: e.target.value})} className="glass-input" style={{flex: 1}} required />
                  </div>
                  <button type="submit" className="btn-primary" style={{ marginTop: '1rem', padding: '1rem' }}>Update Password</button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}