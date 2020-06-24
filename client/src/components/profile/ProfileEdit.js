import React from 'react';
import EditName from './EditName';
import EditAvatar from './EditAvatar';
import EditCoverPhoto from './EditCoverPhoto';
import EditProfileInfo from './EditProfileInfo';
import VerifyProfile from './VerifyProfile';

import withContext from '../../Context';
const EditNameWithContext = withContext(EditName);
const EditAvatarWithContext = withContext(EditAvatar);
const EditCoverPhotoWithContext = withContext(EditCoverPhoto);
const EditProfileInfoWithContext = withContext(EditProfileInfo);

function ProfileEdit() {
  return (
    <div className='container-fluid'>
      <EditNameWithContext />
      <EditAvatarWithContext />
      <EditCoverPhotoWithContext />
      <EditProfileInfoWithContext />
      <VerifyProfile />
    </div>
  );
}

export default ProfileEdit;
