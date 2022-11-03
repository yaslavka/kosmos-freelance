import React from 'react'

export default Component => class screenWidth extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            width: window.innerWidth
        }
    }

    componentWillMount() {
      window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

    handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
    };

    render() {
        const isMobile = this.state.width <= 700;
        return <Component {...this.props} handleWindowSizeChange = {this.handleWindowSizeChange} isMobile = {isMobile}/>
    }



}
