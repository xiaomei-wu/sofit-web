'use client';
import { useGetMe } from '@/hooks';
import { logoutUser } from '@/networks';
import { removeAccessTokenCookie } from '@/utils/cookies';
import { Button, Drawer } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './RandomAvatar.module.css';

const RandomAvatar = () => {
  const [open, setOpen] = useState(false);
  const { data: me, isLoading } = useGetMe();
  const router = useRouter();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const logout = async () => {
    await logoutUser();
    removeAccessTokenCookie();
    router.push('/');
  };

  if (isLoading) return null;

  return (
    <div>
      <Image
        alt="avatar"
        className={styles.avatar}
        height={40}
        src="/og"
        width={40}
        onClick={showDrawer}
      />
      <Drawer title={me?.email} placement="right" onClose={onClose} open={open}>
        <Button className={styles.logout} onClick={logout} type="text">
          <Image src={'/logout.png'} width={28} height={28} />
          <div>Logout</div>
        </Button>
      </Drawer>
    </div>
  );
};

export default RandomAvatar;
