import React, { useState } from 'react';
import { registerCompany, getAuthorizationToken } from './apiService'; // Import relevant functions from your apiService

function RegistrationForm() {
  const [companyName, setCompanyName] = useState('Train center');
  const [ownerName, setOwnerName] = useState('Yashaswini');
  const [ownerEmail, setOwnerEmail] = useState('204g1a05c5@srit.ac.in');
  const [rollNo, setRollNo] = useState('204G1A05C5');
  const [accessCode, setAccessCode] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState('');

  const handleRegistration = async () => {
    try {
      const registrationData = {
        companyName,
        ownerName,
        ownerEmail,
        rollNo,
        accessCode
      };

      const registrationResponse = await registerCompany(registrationData);
      setRegistrationStatus('Registration successful');

      const authData = {
        companyName,
        ownerName,
        clientID: registrationResponse.clientID,
        ownerEmail,
        rollNo,
        clientSecret: registrationResponse.clientSecret
      };

      const authToken = await getAuthorizationToken(authData);
      // Store the authToken securely for future API calls
    } catch (error) {
      setRegistrationStatus('Registration or authorization failed');
    }
  };

  return (
    <div className="registration-form">
      <h2>Company Registration</h2>
      <form>
        <div className="form-group">
          <label>Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        {/* Other form fields */}
        <button type="button" onClick={handleRegistration}>
          Register
        </button>
        <p>{registrationStatus}</p>
      </form>
    </div>
  );
}

export default RegistrationForm;