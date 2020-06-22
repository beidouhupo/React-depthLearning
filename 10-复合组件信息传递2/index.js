import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

import Vote from './component/Vote/Vote';

ReactDOM.render(<main>
  {/* title: 标题  count: 初始支持反对人数*/}
  <Vote title={'北斗VS琥珀'} 
        count={{
          n: 100,
          m: 78
        }}/>
</main>, document.getElementById('root'));