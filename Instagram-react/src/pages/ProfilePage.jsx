import { useState, useEffect } from 'react';

const ProfilePage = () => {
  const [userData, setUserData] = useState({ username: '', email: '', profilePicture: '' });
  const [newUsername, setNewUsername] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3001/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });

        if (!response.ok) {
          throw new Error('Error al cargar el perfil');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error al cargar el perfil', error);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    try {
      const response = await fetch('http://localhost:3001/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ username: newUsername }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el perfil');
      }

      setUserData((prevData) => ({ ...prevData, username: newUsername }));
    } catch (error) {
      console.error('Error al actualizar el perfil', error);
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      <img src={userData.profilePicture} alt="Profile" width="150" />
      <p>Email: {userData.email}</p>
      <input
        type="text"
        placeholder="New username"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
      />
      <button onClick={handleUpdate}>Update Username</button>
    </div>
  );
};

export default ProfilePage;
