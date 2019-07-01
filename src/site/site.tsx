import { render } from 'react-dom';
import React = require('react');

const e = React.createElement;

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<div>
      <button>Hey</button>
    </div>);  
  }
}

const domContainer = document.querySelector('#root');
render(e(App), domContainer);