import * as esbuild from 'esbuild-wasm';
import ReactDOM from 'react-dom';
import { useState, useEffect, useRef } from 'react';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const ref = useRef<any>();

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm'
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const handleClick = async () => {
    if(!ref.current) {
      return;
    }
    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin()],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window'
      }
    });

    // console.log(result);

    setCode(result.outputFiles[0].text);
  };

  return (
    <div>
      <textarea 
        onChange={(e) => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={handleClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  )
};

ReactDOM.render(
  <App />,
  document.querySelector('#root')
);