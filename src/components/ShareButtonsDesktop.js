import React, { Component } from 'react';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
} from 'react-share';

class ShareButtons extends Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false, url: '' };
  }

  componentDidMount() {
    window.addEventListener('scroll', () => {
      this.setState({
        isVisible: window.innerHeight < document.documentElement.scrollTop,
        url: window.location.href,
      });
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', () => {
      this.setState({
        isVisible: window.innerHeight < document.documentElement.scrollTop,
        url: window.location.href,
      });
    });
  }

  render() {
    return (
      <section
        className={`share-buttons ${
          this.state.isVisible ? 'visible' : 'hidden'
        }`}
      >
        <div className="post-icons post-icons--desktop">
          <FacebookShareButton url={this.state.url}>
            <FacebookIcon size={52} round={true} />
          </FacebookShareButton>
          <TwitterShareButton url={this.state.url}>
            <TwitterIcon size={52} round={true} />
          </TwitterShareButton>
          <EmailShareButton url={this.state.url}>
            <EmailIcon size={52} round={true} />
          </EmailShareButton>
        </div>
      </section>
    );
  }
}

export default ShareButtons;
