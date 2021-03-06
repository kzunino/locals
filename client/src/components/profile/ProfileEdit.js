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
const VerifyProfileWithContext = withContext(VerifyProfile);

function ProfileEdit({context: {verified}}) {
  let verifiedString;
  if (verified === 'false') {
    verifiedString = false;
  } else verifiedString = true;
  return (
    <div className='container-fluid'>
      <EditNameWithContext />
      <EditAvatarWithContext />
      <EditCoverPhotoWithContext />
      <EditProfileInfoWithContext />
      {!verifiedString ? <VerifyProfileWithContext /> : null}
    </div>
  );
}

export default ProfileEdit;
