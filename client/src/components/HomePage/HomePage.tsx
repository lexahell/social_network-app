import styles from './HomePage.module.css';
import logo from '../../imges/Illustration-of-logo-design-template-on-transparent-background-PNG.png';
const HomePage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <div className={styles.logo}>
            <div className={styles.logoImg}>
              <img src={logo} alt='' />
            </div>
            <div className={styles.logoText}>Social network</div>
          </div>
          <nav>
            <h3>News</h3>
            <h3>Dialogs</h3>
            <h3>Friends</h3>
            <h3>Profile</h3>
          </nav>
          <div className={styles.buttonSignContainer}>
            <button className={styles.buttonSign}>Sign out</button>
          </div>
        </div>
      </header>
      <main>
        <h1>Новости</h1>
        <div className={styles.post}>
          <div className={styles.postTitle}>
            <div className={styles.imgContainer}>
              <img
                src='https://masterpiecer-images.s3.yandex.net/633ff90a78fd11ee90cb1e5d9776cfa6:upscaled'
                alt=''
              />
            </div>
            <div className={styles.authorNameContainer}>
              <div className={styles.authorName}>Travis Scot</div>
            </div>
          </div>
          <div className={styles.postBody}>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga iure
              autem dolorum doloremque, distinctio repellat esse error expedita!
              Dolore, cum?
            </div>
          </div>
        </div>
        <div className={styles.post}>
          <div className={styles.postTitle}>
            <div className={styles.imgContainer}>
              <img
                src='https://masterpiecer-images.s3.yandex.net/633ff90a78fd11ee90cb1e5d9776cfa6:upscaled'
                alt=''
              />
            </div>
            <div className={styles.authorNameContainer}>
              <div className={styles.authorName}>Travis Scot</div>
            </div>
          </div>
          <div className={styles.postBody}>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
              esse molestiae corrupti consequuntur quis commodi a, maxime error
              eos quae, perspiciatis et adipisci sunt voluptatem vero? Alias
              perferendis aliquid dolor! Quibusdam ipsum quae quam unde error
              praesentium voluptas placeat, atque, rerum culpa iste asperiores
              ea, dignissimos sequi earum dolore architecto nesciunt sunt hic
              reiciendis nisi. Facere nobis nam ut voluptas. Modi, accusamus!
              Natus doloribus consequuntur voluptates laborum quae cupiditate
              distinctio laboriosam unde, quisquam quaerat libero iure error
              architecto nostrum assumenda adipisci perspiciatis, nemo
              voluptatum consectetur omnis. Quibusdam, quos nemo voluptatibus
              necessitatibus, beatae eos fugit incidunt voluptatum voluptas
              animi earum hic.
            </div>
          </div>
        </div>
        <div className={styles.post}>
          <div className={styles.postTitle}>
            <div className={styles.imgContainer}>
              <img
                src='https://masterpiecer-images.s3.yandex.net/633ff90a78fd11ee90cb1e5d9776cfa6:upscaled'
                alt=''
              />
            </div>
            <div className={styles.authorNameContainer}>
              <div className={styles.authorName}>Travis Scot</div>
            </div>
          </div>
          <div className={styles.postBody}>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga iure
              autem dolorum doloremque, distinctio repellat esse error expedita!
              Dolore, cum?
            </div>
          </div>
        </div>
        <div className={styles.post}>
          <div className={styles.postTitle}>
            <div className={styles.imgContainer}>
              <img
                src='https://masterpiecer-images.s3.yandex.net/633ff90a78fd11ee90cb1e5d9776cfa6:upscaled'
                alt=''
              />
            </div>
            <div className={styles.authorNameContainer}>
              <div className={styles.authorName}>Travis Scot</div>
            </div>
          </div>
          <div className={styles.postBody}>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga iure
              autem dolorum doloremque, distinctio repellat esse error expedita!
              Dolore, cum?
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default HomePage;
