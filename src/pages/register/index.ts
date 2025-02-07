// import { connect } from '../../framework/HOC';
import { connect } from '../../store/store';
import { Register } from './register';

const mapRegisterToProps = (state: any) => ({ props: state.contextRegister });

const ConnectedRegister = connect(mapRegisterToProps)(Register);
export default ConnectedRegister;
