import React from 'react';
import EditName from './EditName';
import EditAvatar from './EditAvatar';
import EditCoverPhoto from './EditCoverPhoto';
import EditProfileInfo from './EditProfileInfo';

function ProfileEdit() {
  return (
    <div className='container-fluid'>
      <EditName />
      <EditAvatar />
      <EditCoverPhoto />
      <EditProfileInfo />
    </div>
  );
}

export default ProfileEdit;
