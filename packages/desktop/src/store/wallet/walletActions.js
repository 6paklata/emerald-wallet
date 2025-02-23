// @flow
import accounts from '../vault/accounts';
import screen from './screen';
import history from './history';
import network from '../network';
import tokens from '../vault/tokens';

/**
 * Shows account details page if address in the vault or notification otherwise.
 */
export const showAccountDetails = (address: string) => {
  return (dispatch, getState) => {
    const state = getState();
    const acc = accounts.selectors.selectAccount(state, address);
    if (!acc) {
      dispatch(screen.actions.showNotification(`Account ${address} not found in the vault`, 'warning', 3000));
    } else {
      dispatch(screen.actions.gotoScreen('account', acc));
    }
  };
};

export const onOpenWallet = () => {
  return (dispatch, getState) => {
    const numberOfAccounts = getState().accounts.get('accounts').size;
    dispatch(screen.actions.gotoScreen(numberOfAccounts === 0 ? 'landing' : 'home'));
  };
};

export const switchEndpoint = (chain: {chainId: number, chain: string}) => {
  return (dispatch, getState) => {
    dispatch(history.actions.init(chain.chainId));
    dispatch(network.actions.switchChain(chain));
    dispatch(accounts.actions.loadAccountsList());
    dispatch(tokens.actions.reset());
    dispatch(tokens.actions.addDefault(chain.chainId));
    dispatch(tokens.actions.loadTokenList());
  };
};
