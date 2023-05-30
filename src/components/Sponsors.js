import styles from "./Sponsors.module.css";
import Image from "next/image";

// Footer with infinite marquee (sponsors)
// when ready, add the images or svg

export default function Sponsors() {
  return (
    <div className={styles.marqueeWrapper}>
      <div className={styles.marquee}>
        <div className={styles.marqueeContent}>
          <Image src="/sponsors/butts.jpg" alt="one" width={100} height={68} />
          <Image src="/sponsors/cupcakes.png" alt="one" width={100} height={68} />
          <Image src="/sponsors/lostit.png" alt="one" width={100} height={68} />
          <Image src="/sponsors/meh.jpg" alt="one" width={100} height={68} />
          <Image src="/sponsors/nsfw.png" alt="one" width={100} height={68} />
          <Image src="/sponsors/pb.jpg" alt="one" width={100} height={68} />
          <Image src="/sponsors/quack.png" alt="one" width={100} height={68} />
          <Image src="/sponsors/spoti.png" alt="one" width={100} height={68} />
          <Image src="/sponsors/toyoda.jpg" alt="one" width={100} height={68} />
          <Image src="/sponsors/uup.jpg" alt="one" width={100} height={68} />
          {/* <p>one1</p>
          <p>two 2</p>
          <p>three 3</p>
          <p>four 4</p>
          <p>five 5</p>
          <p>six 6</p>
          <p>seven 7</p>
          <p>eight 8</p>
          <p>nine 9</p>
          <p>ten 10</p> */}
        </div>
        <div aria-hidden="true" className={styles.marqueeContent}>
          <Image src="/sponsors/butts.jpg" alt="one" width={100} height={68} />
          <Image src="/sponsors/cupcakes.png" alt="one" width={100} height={68} />
          <Image src="/sponsors/lostit.png" alt="one" width={100} height={68} />
          <Image src="/sponsors/meh.jpg" alt="one" width={100} height={68} />
          <Image src="/sponsors/nsfw.png" alt="one" width={100} height={68} />
          <Image src="/sponsors/pb.jpg" alt="one" width={100} height={68} />
          <Image src="/sponsors/quack.png" alt="one" width={100} height={68} />
          <Image src="/sponsors/spoti.png" alt="one" width={100} height={68} />
          <Image src="/sponsors/toyoda.jpg" alt="one" width={100} height={68} />
          <Image src="/sponsors/uup.jpg" alt="one" width={100} height={68} />
          {/* <p>one1</p>
          <p>two 2</p>
          <p>three 3</p>
          <p>four 4</p>
          <p>five 5</p>
          <p>six 6</p>
          <p>seven 7</p>
          <p>eight 8</p>
          <p>nine 9</p>
          <p>ten 10</p> */}
        </div>
      </div>
    </div>
  );
}
