import React from 'react'
import 'react-calendar-heatmap/dist/styles.css';

class ConfirmationScreen extends React.Component {

  render() {
    return (
      <div>
        <h3 style={{ fontFamily: "Montserrat, sans-serif", color: "white", fontSize: "2em" }}>Thank you for choosing us !</h3>
        <h4 style={{ fontFamily: "Montserrat, sans-serif", color: "white", fontSize: "1.5em" }}>The Confirmation email has been sent to {this.props.email}<br /> We look forward to Seeing you!!</h4>
      </div>
    );
  }
}

export default ConfirmationScreen
