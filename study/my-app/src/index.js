import React,{Component} from 'react';
import ReactDom from 'react-dom';
import Vendor from 'src/vendor'
import { prefetchFn } from './vendor/prefetch'
import './index.scss'

if (module.hot) {
    module.hot.accept();
  }
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
        this.vendor = prefetchFn()
    }
    render() {
        // 我是一个可爱的注释
        console.log('devTool test!')
        return (
            <div className="index-box">
                <p>Hello World by index page !</p>
                <p>{this.vendor}</p>
                <p className="image"></p>
                <img src="./layout/404.png"></img>
            </div>
        );
    }
}

export default App;

ReactDom.render(<App />,document.getElementById('root'));