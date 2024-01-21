import React from 'react';

import styles from '../RegisterForm.module.css'; // Import your styles

const ScrollingContent = () => {
  return (
    <div className={styles.scrollingContent}>
      <div className={styles.section}>
      <h2 className={styles.heading2}>Feature Head Line</h2><br></br>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa sed elementum tempus egestas sed sed risus pretium. Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant. Est lorem ipsum dolor sit amet consectetur. Lacus vestibulum sed arcu non odio. Diam in arcu cursus euismod. Scelerisque fermentum dui faucibus in ornare quam viverra. Turpis egestas pretium aenean pharetra magna ac placerat vestibulum lectus. Quis blandit turpis cursus in hac habitasse platea dictumst quisque. Arcu bibendum at varius vel pharetra vel turpis nunc. Suspendisse faucibus interdum posuere lorem. Viverra nam libero justo laoreet sit amet. Venenatis a condimentum vitae sapien pellentesque habitant. Non tellus orci ac auctor augue mauris augue neque gravida. Accumsan tortor posuere ac ut consequat semper viverra nam libero. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Lectus nulla at volutpat diam ut venenatis tellus in.
        </p>
        {/* Add more sections as needed */}
      </div>

      {/* Scrolling Images */}
      <h2 className={styles.heading2}>jobs</h2>
      <br></br>
      <div className={styles.scrollImages}>
        <img src="/assets/img/download.jpeg" alt="Image 1" />
        <img src="/assets/img/download.jpeg" alt="Image 2" />
        <img src="/assets/img/download.jpeg" alt="Image 3" />
        {/* Add more images as needed */}
      </div>

      {/* Horizontal Boxes */}
      <div className={styles.horizontalBoxes}>
        <div className={styles.box}>
          <h3>Box 1</h3>
          <p>Content for Box 1</p>
        </div>
        <div className={styles.box}>
          <h3>Box 2</h3>
          <p>Content for Box 2</p>
        </div>
        <div className={styles.box}>
          <h3>Box 3</h3>
          <p>Content for Box 3</p>
        </div>
        <div className={styles.box}>
          <h3>Box 4</h3>
          <p>Content for Box 4</p>
        </div>
      </div>
    </div>
  );
};

export default ScrollingContent;
