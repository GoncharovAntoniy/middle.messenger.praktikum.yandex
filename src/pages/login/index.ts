// import { connect } from '../../framework/HOC';
// import { storeLogin } from '../../store/store';
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

const ConnectedLogin = connect(mapLoginToProps)(Login);
export default ConnectedLogin;
