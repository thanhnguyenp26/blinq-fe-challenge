import './styles.css'
import brocolli from './brocolli.png'

function Header() {
    return (
      <header className='header'>
        <div>
          <span>Brocolli &amp; Co. </span>
          <img src={brocolli} alt='brocolli' />
        </div>
      </header>
    );
}

export default Header;