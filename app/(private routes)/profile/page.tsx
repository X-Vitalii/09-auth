import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import css from './ProfilePage.module.css';
import { getServerMe } from '@/lib/api/serverApi';

export async function generateMetadata(): Promise<Metadata> {
  const user = await getServerMe();

  return {
    title: `Profile of ${user.username}`,
    description: `Personal user data: ${user.username}`,
  };
}

const Profile = async () => {
  const user = await getServerMe();

  const avatarSrc = user.avatar || '/default-avatar.png';

  return (
    <>
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <div className={css.header}>
            <h1 className={css.formTitle}>My Profile</h1>

            {/* <a src="/profile/edit" className={css.editProfileButton}>
              Edit Profile
            </a> */}

            <Link href="/profile/edit" className={css.editProfileButton}>
              Edit Profile
            </Link>
          </div>
          <div className={css.avatarWrapper}>
            <Image
              src={avatarSrc}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
              priority
            />
          </div>
          <div className={css.profileInfo}>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
