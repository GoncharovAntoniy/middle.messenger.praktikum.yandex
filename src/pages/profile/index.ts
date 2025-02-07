import { connect } from '../../store/store';
import { Profile } from './profile';

const mapStateToProps = (state: any) => ({
  props: {
    modalProfileInfo: { ...state.modalProfileInfo },
    contextProfile: { ...state.contextProfile },
    fieldsPass: [...state.fieldsPass],
    fields: [...state.fields],
    currentPage: { ...state.currentPage },
  },
});

const ConnectedProfile = connect(mapStateToProps)(Profile);
export default ConnectedProfile;
