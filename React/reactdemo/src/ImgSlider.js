import React , {useState} from 'react'
import { Carousel, Radio } from 'antd';

const contentStyle = {
  height: '140px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
const divStyle = {
  background: '#364d79',
}
const imgStyle = {
  height:'500px',
  margin:'0 auto'
}
class PositionCarouselDemo extends React.Component {
  state = {
    dotPosition: 'top',
  };

  handlePositionChange = ({ target: { value: dotPosition } }) => this.setState({ dotPosition });

  render() {
    const { dotPosition } = this.state;
    return (
      <>
        <Radio.Group
          onChange={this.handlePositionChange}
          value={dotPosition}
          style={{ marginBottom: 8 }}
        >
          <Radio.Button value="top">Top</Radio.Button>
          <Radio.Button value="bottom">Bottom</Radio.Button>
          <Radio.Button value="left">Left</Radio.Button>
          <Radio.Button value="right">Right</Radio.Button>
        </Radio.Group>
        <Carousel dotPosition={dotPosition}>
          <div>
            {/* <h3 style={contentStyle}>1</h3> */}
            <div style={ divStyle }><img style={imgStyle} src='https://images.alphacoders.com/494/thumb-1920-494303.jpg' /></div>
          </div>
          <div>
            {/* <h3 style={contentStyle}>2</h3> */}
            <div style={ divStyle }><img style={imgStyle} src='https://images4.alphacoders.com/582/thumb-1920-582769.jpg' /></div>
          </div>
          <div>
            {/* <h3 style={contentStyle}>3</h3> */}
            <div style={ divStyle }><img style={imgStyle} src='https://images.alphacoders.com/809/thumb-1920-809674.jpg' /></div>
          </div>
          <div>
            {/* <h3 style={contentStyle}>4</h3> */}
            <div style={ divStyle }><img style={imgStyle} src='https://images5.alphacoders.com/103/thumb-1920-1031412.jpg' /></div>
          </div>
        </Carousel>
      </>
    );
  }
}

// ReactDOM.render(<PositionCarouselDemo />, mountNode);

export default PositionCarouselDemo
