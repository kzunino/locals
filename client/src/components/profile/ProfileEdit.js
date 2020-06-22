import React from 'react';
import EditName from './EditName';
import EditAvatar from './EditAvatar';
import EditCoverPhoto from './EditCoverPhoto';
import EditProfileInfo from './EditProfileInfo';
import VerifyProfile from './VerifyProfile';

import withContext from '../../Context';
const EditNameWithContext = withContext(EditName);

function ProfileEdit() {
  return (
    <div className='container-fluid'>
      <EditNameWithContext />
      <EditAvatar />
      <EditCoverPhoto />
      <EditProfileInfo />
      <VerifyProfile />
    </div>
  );
}

export default ProfileEdit;
