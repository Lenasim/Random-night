import React, { Component } from 'react';

class ScrollToTop extends Component {
  state = {
    is_visible: false
  };

  componentDidMount() {
    let scrollComponent = this;
    document.addEventListener("scroll", (e) => {
      scrollComponent.toggleVisibility();
    });
  }

  toggleVisibility() {
    if (window.pageYOffset > 300) {
      this.setState({
        is_visible: true
      });
    } else {
      this.setState({
        is_visible: false
      });
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  render() {
    const { is_visible } = this.state;
    return (
      <div className="scroll-to-top">
        {is_visible && (
          <div onClick={() => this.scrollToTop()}>
            <i className="fas fa-arrow-alt-circle-up"></i>
          </div>
        )}
      </div>
    );
  }
}

export default ScrollToTop