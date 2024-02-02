import React, { useState, useEffect } from 'react';

const MyForm = ({setBooked,booked}) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  // Load data from local storage when the component mounts
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('formData')) || {};
    setFormData(storedData);
  
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);

    // Save data to local storage
    localStorage.setItem('formData', JSON.stringify(formData));
    setBooked(true)

    // Clear the form fields after submission
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
    });
    // Hide the form after submission
    setShowForm(false);
  };
  

  const handleClose = () => {
    // Hide the form when close button is clicked
    setShowForm(false);
  };
  
  return (
    <div>
        
      <button style={styles.button} onClick={() => setShowForm(true)}>Book Ticket</button>
      {showForm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <span onClick={handleClose} style={styles.closeIcon}>
              &times;
            </span>
            <form onSubmit={handleSubmit} style={styles.form}>
              <label style={styles.label}>
                First Name:
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  style={styles.input}
                />
              </label>
              <br />
              <label style={styles.label}>
                Last Name:
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  style={styles.input}
                />
              </label>
              <br />
              <label style={styles.label}>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={styles.input}
                />
              </label>
              <br />
              <button type="submit" style={styles.button}>
                Book
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  modalContent: {
    background: '#fff',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '20px',
    cursor: 'pointer',
  },
  form: {
    maxWidth: '800px',
    margin: 'auto',
    color:'black'
  },
  label: {
    display: 'block',
    margin: '10px 0',
  },
  input: {
    width: '100%',
    padding: '8px',
    margin: '5px 0',
    boxSizing: 'border-box',
  },
  button: {
    background: '#4CAF50',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default MyForm;
