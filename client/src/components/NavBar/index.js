import React, { useState } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button } from 'antd';
import { MenuFoldOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';

const NavBar = () => {
  const [visible, setvisible] = useState(false);

  const showDrawer = () => {
    setvisible(true);
  };

  const onClose = () => {
    setvisible(false);
  };

  return (
    <nav className={styles.menuContainer}>
      <div className={styles.menuLogo}>
        <a href="/" >Logo</a>
      </div>
      <div className={styles.menuLeft}>
        <LeftMenu mode="horizontal" />
      </div>
      <div className={styles.menuRight}>
        <RightMenu mode="horizontal" />
      </div>
      <Button
        type="primary"
        onClick={showDrawer}
        className={styles.menuMobileButton}
      >
        <MenuFoldOutlined />
      </Button>
      <Drawer
        title="Basic Drawer"
        placement="right"
        className={styles.menuDrawer}
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <LeftMenu mode="inline" />
        <RightMenu mode="inline"/>
      </Drawer>
    </nav>
  );
}

export default NavBar;
