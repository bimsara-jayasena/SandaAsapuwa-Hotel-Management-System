import React from 'react';

class ScrollPane extends React.Component {
  render() {
    const {height}=this.props 
    const scrollPaneStyle = {
      position:'relative',
      padding:'0',
      width: '100%', // Adjust width as needed
      height: height, // Adjust height as needed
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
