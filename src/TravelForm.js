import React from 'react';
import './TravelForm.css'; // Import CSS file
import bobsi from './bobsi.png'; // Import the image

const TravelForm = () => {
  return (
    <div className="flex-container">
      <div className="left-content">
        <img src={bobsi} alt="Travel" />
      </div>
      <div className="right-content">
        <div className='right-content-layout'>
          <div className='continue-with-google'>
            <svg width="25" height="25" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M28.9862 11.7691H27.8073V11.7083H14.6354V17.5625H22.9066C21.6999 20.9703 18.4574 23.4167 14.6354 23.4167C9.78596 23.4167 5.85416 19.4848 5.85416 14.6354C5.85416 9.78596 9.78596 5.85416 14.6354 5.85416C16.8739 5.85416 18.9104 6.69863 20.461 8.07801L24.6007 3.93839C21.9868 1.50232 18.4904 0 14.6354 0C6.553 0 0 6.553 0 14.6354C0 22.7178 6.553 29.2708 14.6354 29.2708C22.7178 29.2708 29.2708 22.7178 29.2708 14.6354C29.2708 13.6541 29.1698 12.6962 28.9862 11.7691Z" fill="#FFC107" />
              <path d="M1.68652 7.82336L6.49499 11.3498C7.79607 8.1285 10.9471 5.85416 14.6345 5.85416C16.873 5.85416 18.9095 6.69862 20.4601 8.07801L24.5997 3.93839C21.9858 1.50232 18.4894 0 14.6345 0C9.01301 0 4.13795 3.17369 1.68652 7.82336Z" fill="#FF3D00" />
              <path d="M14.6356 29.2714C18.4159 29.2714 21.8509 27.8246 24.4479 25.472L19.9183 21.639C18.3995 22.794 16.5437 23.4187 14.6356 23.4172C10.8289 23.4172 7.59672 20.9899 6.37905 17.6025L1.60645 21.2797C4.0286 26.0194 8.94756 29.2714 14.6356 29.2714Z" fill="#4CAF50" />
              <path d="M28.9861 11.7692H27.8072V11.7085H14.6354V17.5627H22.9066C22.3294 19.1846 21.2896 20.6018 19.9158 21.6394L19.918 21.6379L24.4477 25.4709C24.1272 25.7621 29.2708 21.9533 29.2708 14.6356C29.2708 13.6543 29.1698 12.6964 28.9861 11.7692Z" fill="#1976D2" />
            </svg>
            <p>Continue with Google</p>
          </div>
          <h4>or</h4>
          <div className="first-2-inputs">
            <div className="input-container">
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" className="firstNameInput" placeholder="   John" />
            </div>

            <div className="input-container">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" className="lastNameInput" placeholder="   Doe" />
            </div>



          </div>
          <div className='emailRow'>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" className="email" placeholder="   Email" />
          </div>
          <div className='passwordRow'>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" className="password" placeholder="   Pass••••••" />
            <div className='passwordParametters'>
              <h5>8+ Characters,</h5><h5>Special Character (!@#$%^&*),</h5><h5>Numbers (0-9)</h5>
            </div>


            <div className="last-four">
              <div className="lastfour">
                <label htmlFor="lastfour">Nationality</label>
                <input type="text" id="nationality" className="nationality" placeholder="   Nationalities" />

                <div className="input-container1">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <select id="phoneNumber" className="phoneNumberSelect">
                    <option value="">Select Phone Number</option>
                    <option value="1234567890">123-456-7890</option>
                    <option value="0987654321">098-765-4321</option>
                  </select>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TravelForm;
