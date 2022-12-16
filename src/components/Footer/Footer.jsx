import s from './Footer.module.css';
import github from '../../assets/image/github.png';
import rsLogo from '../../assets/image/rs_logo.svg';

export const Footer = () => {
  return (
    <footer className={s.footer}>    
      <a href="https://rs.school/" className=''>
          <img src={rsLogo} alt="rs-logo" className={s.rsLogo} />
      </a>
      <div className={s.footerYear}>
          <p className=''>2022</p>
      </div>
      <div>
        <a href="https://github.com/AnyaPolischuk" className={s.footerGithub}>
            <img src={github} alt="github-logo" className={s.footerGithub} />
        </a>
        <a href="https://github.com/HKudria?tab=overview&from=2022-12-01&to=2022-12-16" className=''>
            <img src={github} alt="github-logo" className={s.footerGithub} />
        </a>
      </div>
</footer>
  )
}