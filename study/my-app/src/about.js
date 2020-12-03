import React,{Component} from 'react';
import ReactDom from 'react-dom';
import Vendor from 'src/vendor'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
        this.vendor = Vendor()
    }
    render() {
        return (
            <div>
                <p>Little About page ~</p>
        <p>{this.vendor}</p>
            </div>
        );
    }
}

export default App;

ReactDom.render(<App />,document.getElementById('about'));