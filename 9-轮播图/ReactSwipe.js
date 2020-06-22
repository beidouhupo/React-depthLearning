import React from 'react';
import ReactDOM from 'react-dom';
import ReactSwipe from 'react-swipe';

import './static/css/reset.min.css';
import './static/css/index.css';
// import Banner from './component/Banner';

let IMG_DATA = [];
for (let i = 1; i <= 5; i++) {
  IMG_DATA.push({
    id: 1,
    title: '',
    pic: require(`./static/images/${i}.jpg`)
  });
}

ReactDOM.render(<main>
  {/* 基于组件实现轮播图 */}
  <ReactSwipe className='container' 
              swipeOptions={{
                auto: 2000
              }}>
    {IMG_DATA.map((item, index) => {
      let {pic, title} = item;
      return <div key={index}>
        <img src={pic} alt={title}/>
      </div>
    })}
  </ReactSwipe>

</main>, document.getElementById('root'));