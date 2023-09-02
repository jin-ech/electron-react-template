/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-02 11:30:02
 * @LastEditors: JC96821 13478707150@163.com
 * @LastEditTime: 2023-09-02 17:02:09
 * @FilePath: \app\src\App.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState } from 'react';


const isNode = !!window?.electron;
console.log('isNode: ', isNode);
function App() {
  const [res, updateRes] = useState('<div></div>');

  const handleLinkClick = () => {
    axios.get('http://localhost:3001/api/123', {params: {url: 'https://juejin.cn/search?query=electron-builder%E6%89%93%E5%8C%85create-react-app&fromSeo=0&fromHistory=0&enterFrom=home_page&type=0'}}).then(res => {
      updateRes(res.data);
    }).catch(err => {
      console.log('err: ', err);
    });
    if (isNode) {
      const { ipcRenderer } = window.electron;
      ipcRenderer.send('btnClick', {
        name: '张三',
        age: 30
      });
    }
    else {
      console.log('on btn click');
    }
  };

  return (
    <div className="App">
      <div dangerouslySetInnerHTML={{__html: res}}></div>
      <header className="App-header">
        <h1>这是一个标题</h1>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          // href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          style={{cursor: 'pointer'}}
          onClick={handleLinkClick}
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
