import React,{Component} from 'react';
import ReactDom from 'react-dom';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          code: 1
         };
    }
    render() {
      return <p>1213</p>;
    }
}

// export default App;

ReactDom.render(<App />,document.getElementById('root'));