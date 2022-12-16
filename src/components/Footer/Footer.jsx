import s from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={s.footer}>    
      <a href="https://rs.school/" className=''>
          <img src='https://images.opencollective.com/rsschool/c60db11/background.png' alt="rs-logo" className={s.rsLogo} />
      </a>
      <div className={s.footerYear}>
          <p className=''>2022</p>
      </div>
      <div>
        <a href="https://github.com/AnyaPolischuk" className={s.footerGithub}>
            <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="github-logo" className={s.footerGithub} />
        </a>
        <a href="https://github.com/HKudria?tab=overview&from=2022-12-01&to=2022-12-16" className=''>
            <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="github-logo" className={s.footerGithub} />
        </a>
      </div>
</footer>
  )
}