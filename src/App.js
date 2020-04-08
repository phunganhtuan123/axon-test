import React, { Component } from 'react';

class App extends Component {

  componentWillMount(){

  }

  componetDidMount(){



  }

  render() {
    return (
      <main id="main-container">
        {this.props.children}
        <div id="main-loading" className="obLoading"></div>
      </main>
    );
  }
}

export default App;
