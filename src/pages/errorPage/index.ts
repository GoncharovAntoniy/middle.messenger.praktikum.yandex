// import { connect } from '../../framework/HOC';
import { connect } from '../../store/store';
import { ErrorPage } from './errorPage';

const mapStateToProps = (state: any) => ({ props: state.errorPageContext });

const ConnectedErrorPage = connect(mapStateToProps)(ErrorPage);
export default ConnectedErrorPage;
