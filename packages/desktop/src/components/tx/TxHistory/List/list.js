// @flow
import React from 'react';
import withStyles from 'react-jss';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Transaction from './transaction';

const styles2 = {
  columnName: {
    textTransform: 'uppercase',
    fontSize: '11px !important',
    fontWeight: '500 !important',
    letterSpacing: '1px',
    lineHeight: '16px',
  },
  columnFrom: {
    paddingLeft: '5px',
  },
  columnTo: {
    paddingLeft: '5px',
  },
  amountColumn: {
    paddingLeft: '0 !important',
    width: '100px',
  },
  statusColumn: {
    width: '60',
    paddingLeft: '0px',
    paddingRight: 'inherit',
  },
  columnArrow: {
    paddingLeft: '0px !important',
    paddingRight: '0px !important',
    width: '24px',
  },
};

type Props = {
    transactions: Array<any>,
    accountId: string,
};

const TransactionsList = (props: Props) => {
  const {
    transactions, accountId, muiTheme, classes,
  } = props;
  if (!transactions) {
    return (<div>Loading...</div>);
  }
  if (transactions.size === 0) {
    return (<div style={{paddingTop: '20px', color: muiTheme.palette.secondaryTextColor}}> There are no transactions. </div>);
  }
  return (
    <div>
      <Table selectable={ false } fixedHeader={ true } style={{background: muiTheme.palette.alternateTextColor}}>
        <TableHead displaySelectAll={ false } adjustForCheckbox={ false }>
          <TableRow>
            <TableCell className={ cx(classes.columnName, classes.amountColumn) }>
                            Amount
            </TableCell>
            <TableCell className={ cx(classes.columnName, classes.statusColumn)}>
                            Status
            </TableCell>
            <TableCell className={ cx(classes.columnFrom, classes.columnName) }>From</TableCell>
            <TableCell className={classes.columnArrow}>&nbsp;</TableCell>
            <TableCell className={ cx(classes.columnTo, classes.columnName) }>To</TableCell>
          </TableRow>
        </TableHead>
        <TableBody displayRowCheckbox={ false }>
          { transactions.map((tx) => <Transaction key={tx.get('hash')} tx={tx} accountId={ accountId } />) }
        </TableBody>
      </Table>
    </div>
  );
};

TransactionsList.propTypes = {
  transactions: PropTypes.object.isRequired,
};

const StyledTransactionsList = withStyles(styles2)(TransactionsList);
export default muiThemeable()(StyledTransactionsList);
