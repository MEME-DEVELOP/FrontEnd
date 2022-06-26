import React from 'react';
import axios from 'axios';

class PutRequestErrorHandling extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            updatedAt: null,
            errorMessage: null
        };
    }

    componentDidMount() {
        // PUT request using axios with error handling
        const article = { title: 'React PUT Request Example' };
        axios.put('https://reqres.in/invalid-url', article)
            .then(response => this.setState({ updatedAt: response.data.updatedAt }))
            .catch(error => {
                this.setState({ errorMessage: error.message });
                console.error('There was an error!', error);
            });
    }

    render() {
        const { errorMessage } = this.state;
        return (
            <div className="card text-center m-3">
                <h5 className="card-header">PUT Request with Error Handling</h5>
                <div className="card-body">
                    Error: {errorMessage}
                </div>
            </div>
        );
    }
}

export { PutRequestErrorHandling }; 