import React from 'react';
import ReactDOM from 'react-dom';
import Footer from './Footer';
import Header from './Header';
import MainContent from './MainContent';

function Page() {
    return (
        <div>
            <Header />
            <MainContent />
            <Footer />
        </div>
    );
}

ReactDOM.render(<Page />, document.getElementById('root'));
