import React from 'react';

class ScrollPane extends React.Component {
  render() {
    const scrollPaneStyle = {
      position:'relative',
      width: '78vw', // Adjust width as needed
      height: '85vh', // Adjust height as needed
      overflow: 'auto', // This enables scrolling
      border: '1px solid #ccc', // Optional border for visual clarity
    };

    return (
      <div style={scrollPaneStyle}>
        {/* Your content goes here */}
        {this.props.children}
      </div>
    );
  }
}

export default ScrollPane;
