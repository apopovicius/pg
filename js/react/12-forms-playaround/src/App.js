import React from 'react';
import './App.css';

function App() {
    const [formData, setFormData] = React.useState({
        email: '',
        password: '',
        confirmPassword: '',
        okToEmail: false,
    });

    function handleSubmit(event) {
        event.preventDefault();
        console.log(formData);
        const { password, confirmPassword, okToEmail } = formData;
        if (password === confirmPassword) {
            console.log('Successfully signed up');
            if (okToEmail)
                console.log('Thanks for signing up for our newsletter!');
        } else console.log('Password does not match');
        //api call
    }

    function handleChange(event) {
        const { name, value, type, checked } = event.target;
        setFormData((prevData) => {
            return {
                ...prevData,
                [name]: type === 'checkbox' ? checked : value,
            };
        });
    }

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email address"
                    className="form--input"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                />
                <input
                    type="password"
                    placeholder="Password"
                    autoComplete="Insert new password"
                    className="form--input"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                />
                <input
                    type="password"
                    placeholder="Confirm password"
                    autoComplete="Insert new password"
                    className="form--input"
                    name="confirmPassword"
                    onChange={handleChange}
                    value={formData.confirmPassword}
                />

                <div className="form--marketing">
                    <input
                        id="okayToEmail"
                        type="checkbox"
                        name="okToEmail"
                        checked={formData.okToEmail}
                        onChange={handleChange}
                    />
                    <label htmlFor="okayToEmail">
                        I want to join the newsletter
                    </label>
                </div>
                <button className="form--submit">Sign up</button>
            </form>
        </div>
    );
}

export default App;
