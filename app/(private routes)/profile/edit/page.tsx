'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import { AvatarPicker } from '@/components/AvatarPicker/AvatarPicker';
import { getMe, updateMe } from '@/lib/api/clientApi';
import css from '@/app/(private routes)/profile/edit/EditProfilePage.module.css';

export const EditProfile = () => {
  const router = useRouter();

  const [username, setUserName] = useState('');
  //   const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    getMe().then((user) => {
      setUserName(user.username ?? '');
      //   setPhotoUrl(user.photoUrl ?? '');
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateMe({ username });
    router.push('/profile');
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <img
          src="avatar"
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form onSubmit={handleSaveUser} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              value={username}
              onChange={handleChange}
              type="text"
              className={css.input}
            />
          </div>

          <p>Email: user_email@example.com</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;
