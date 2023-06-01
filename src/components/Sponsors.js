import styles from "./Sponsors.module.css";
import Image from "next/image";

export default function Sponsors() {
  return (
    <div className={styles.marqueeWrapper}>
      <div className={styles.marquee}>
        <div className={styles.marqueeContent}>
          <Image src="/sponsors/butts.jpg" alt="one" width={100} height={68} />
          <Image
            src="/sponsors/cupcakes.png"
            alt="one"
            width={100}
            height={68}
          />
          <Image src="/sponsors/lostit.png" alt="one" width={100} height={68} />
          <Image src="/sponsors/meh.jpg" alt="one" width={100} height={68} />
          <Image src="/sponsors/nsfw.png" alt="one" width={100} height={68} />
          <Image src="/sponsors/pb.jpg" alt="one" width={100} height={68} />
          <Image src="/sponsors/quack.png" alt="one" width={100} height={68} />
          <Image src="/sponsors/spoti.png" alt="one" width={100} height={68} />
          <Image src="/sponsors/toyoda.jpg" alt="one" width={100} height={68} />
          <Image src="/sponsors/uup.jpg" alt="one" width={100} height={68} />
        </div>
        <div aria-hidden="true" className={styles.marqueeContent}>
          <Image src="/sponsors/butts.jpg" alt="one" width={100} height={68} />
          <Image
            src="/sponsors/cupcakes.png"
            alt="one"
            width={100}
            height={68}
          />
          <Image src="/sponsors/lostit.png" alt="one" width={100} height={68} />
          <Image src="/sponsors/meh.jpg" alt="one" width={100} height={68} />
          <Image src="/sponsors/nsfw.png" alt="one" width={100} height={68} />
          <Image src="/sponsors/pb.jpg" alt="one" width={100} height={68} />
          <Image src="/sponsors/quack.png" alt="one" width={100} height={68} />
          <Image src="/sponsors/spoti.png" alt="one" width={100} height={68} />
          <Image src="/sponsors/toyoda.jpg" alt="one" width={100} height={68} />
          <Image src="/sponsors/uup.jpg" alt="one" width={100} height={68} />
        </div>
      </div>
    </div>
  );
}
