import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

class App extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <Body />
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default App;