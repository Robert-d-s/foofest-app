import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
/**
 * To Do: make this into component or leave it as a separate page
 */

import styles from "./about.module.css";

export default function About() {
  return (
    <>
      <Navbar />
      <div className={styles.sectionBox}>
        <section>
          <h2>About</h2>
          <p>
            ColorFOOFest is the ultimate summer music festival that invites you to embrace your inner colourful fool and immerse yourself in a vibrant celebration of individuality. We believe in celebrating diversity and cherishing what makes each of
            us one-of-a-kind.
          </p>

          <p>
            ColorFOOL fest is a playground of interactive installations and activities designed to let your creative spirit run wild. Roam the festival grounds and discover our incredible graffiti wall, where you can leave your mark and be part of a
            living work of art. Channel your imagination at our DIY tie-dye station, where you can transform plain fabrics into eye-catching expressions of your personal style.
          </p>
          <p>
            ColorFOOFest is not just about visual delights. It is a sonic adventure that brings together a kaleidoscope of music genres and styles. Our eclectic lineup of performers reflects the diverse tapestry of sounds within the realm of music.
            Get ready to groove to a mix of established and up-and-coming artists who will ignite your passion for music and take your senses on an unforgettable journey.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
}
