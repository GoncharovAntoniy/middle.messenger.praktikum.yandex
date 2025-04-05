import { connect } from '../../store/store';
import { Login } from './login';

// const mapStateToProps = (state: any) => ({ props: state });

function mapLoginToProps(state: any) {
  return {
    props: {
      ...state.contextLogin,
    },
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ConnectedLogin = connect(mapLoginToProps)(Login as any);
export default ConnectedLogin;
