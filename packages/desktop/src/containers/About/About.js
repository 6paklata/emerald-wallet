import React from 'react';
import {ipcRenderer, shell} from 'electron'; // eslint-disable-line import/no-extraneous-dependencies
import {MuiThemeProvider} from '@material-ui/core/styles';
import theme from '@emeraldplatform/ui/lib/theme';
import {About} from '@emeraldwallet/ui';
import {version} from '../../../package.json';
import gitversion from '../../../gitversion.json';

class AboutContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    ipcRenderer.send('get-version');
    ipcRenderer.once('get-version-result', (event, result) => {
      this.setState({
        connector: result.connector,
      });
    });
  }

  helpClick = () => {
    const url = 'https://emeraldwallet.io/support';
    shell.openExternal(url);
  };

  licenseClick = () => {
    const url = 'https://github.com/ETCDEVTeam/emerald-wallet/blob/master/LICENSE';
    shell.openExternal(url);
  };

  onButtonClick = () => {
    const url = 'https://emeraldwallet.io';
    shell.openExternal(url);
  };

  render() {
    const {connector} = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <About
          appVersion={version}
          vaultVersion={connector}
          gitVersion={gitversion}
          onButtonClick={this.onButtonClick}
          onHelpClick={this.onHelpClick}
          onLicenseClick={this.onLicenseClick}
        />
      </MuiThemeProvider>);
  }
}

export default AboutContainer;
