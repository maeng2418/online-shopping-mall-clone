import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userActionCreators from 'redux/actions/user_action';
import Container from './container';

const mapStateToProps = (state) => {
  return {
      user: state.user,
  }
};

const mapDispatchToProps = dispatch => bindActionCreators(Object.assign({}, userActionCreators), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Container); //안쓰는거 null 처리