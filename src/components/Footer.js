import styles from "./Footer.module.css";

// export default function Footer() {
//   const links = [
//     "Privacy Policy",
//     "Terms & Conditions",
//     "Rules & Regulations",
//     "Installments rules",
//     "Press",
//     "Contacts",
//     "Careers",
//     "Volunteers",
//     "Partners & Sponsors",
//     "Food Vendors",
//     "Fashion & Fair Vendors",
//     "Ambassadors",
//     "Tickets Info",
//     "Request Invoice",
//     "Goodies",
//   ];

//   return (
//     <footer className={styles.footer}>
//       <div className={styles.footerContent}>
//         {links.map((link, index) => (
//           <a key={index} href="#" className={styles.footerLink}>
//             {link}
//           </a>
//         ))}
//       </div>
//     </footer>
//   );
// }

export default function Footer() {
  const links = [
    "Privacy Policy",
    "Terms & Conditions",
    "Rules & Regulations",
    "Installments rules",
    "Press",
    "Contacts",
    "Careers",
    "Volunteers",
    "Partners & Sponsors",
    "Food Vendors",
    "Fashion & Fair Vendors",
    "Ambassadors",
    "Tickets Info",
    "Request Invoice",
    "Goodies",
  ];

  const columns = [];
  for (let i = 0; i < links.length; i += 3) {
    columns.push(links.slice(i, i + 3));
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.columns}>
        {columns.map((column, index) => (
          <div key={index} className={styles.column}>
            {column.map((link, index) => (
              <a key={index} href="#" className={styles.link}>
                {link}
              </a>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
}
