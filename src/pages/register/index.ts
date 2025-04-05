import { connect } from '../../store/store';
import { Register } from './register';

const mapRegisterToProps = (state: any) => ({ props: state.contextRegister });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ConnectedRegister = connect(mapRegisterToProps)(Register as any);
export default ConnectedRegister;
