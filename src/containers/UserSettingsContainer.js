import { connect } from 'react-redux';
import UserSettings from 'components/settings/UserSettings';
import { userSettingsSelector } from 'selectors/';

export default connect(
  userSettingsSelector,
)(UserSettings);
