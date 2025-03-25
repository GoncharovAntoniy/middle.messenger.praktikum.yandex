// import { connect } from '../../framework/HOC';
import { connect } from '../../store/store';
import { ErrorPage } from './errorPage';

const mapStateToProps = (state: any) => ({ props: state.errorPageContext });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ConnectedErrorPage = connect(mapStateToProps)(ErrorPage as any);
export default ConnectedErrorPage;
