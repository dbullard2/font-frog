import React, { Fragment } from 'react';
import Index from './Todo-List/Index';
import logo from '../img/logo.svg';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const refresh = e => {
    window.location.reload();
  };

  /* context menu ########################################################### */

  var menuState = 0;

  document.addEventListener('contextmenu', function(e) {
    const nav = document.getElementById('logo');
    if (e.target === nav) {
      e.preventDefault();
      toggleMenuOn();
    } else {
      toggleMenuOff();
    }
  });

  const toggleMenuOn = e => {
    var menu = document.querySelector('.context-menu');
    var active = 'context-menu--active';

    if (menuState !== 1) {
      menuState = 1;
      menu.classList.add(active);
    }
  };

  const toggleMenuOff = e => {
    var menu = document.querySelector('.context-menu');
    var activeClassName = 'context-menu--active';
    if (menuState !== 0) {
      menuState = 0;
      menu.classList.remove(activeClassName);
    }
  };

  /* login modal########################################################## */

  const toggleModal = e => {
    var modal = document.getElementById('myModal');
    modal.style.display = 'block';
  };

  const closeModal = e => {
    var modal = document.getElementById('myModal');
    var login = document.getElementById('login');
    modal.style.display = 'none';
    login.style.display = 'none';
  };

  const combo = e => {
    toggleModal();
    toggleMenuOff();
  };

  const temp = e => {
    document.getElementById('riddle').setAttribute('style', 'display: none !important;');
    var content = document.getElementsByClassName('modal-content')[0];
    content.innerHTML =
      '<a href="/gif/monty-python-and-the-holy-grail-the-bridge-of-death-6tzcHH" title="Monty Python and the Holy Grail - The Bridge of Death"><img src="https://i.makeagif.com/media/8-06-2015/6tzcHH.gif" alt="Monty Python and the Holy Grail - The Bridge of Death"></a>';
  };

  /* review modal #########################################################*/

  const showReviews = e => {
    document.getElementById('reviews').style.display = 'block';
  };

  const hideReviews = e => {
    var reviews = document.getElementById('reviews');
    reviews.style.display = 'none';
    //get the date var d = new Date().toString().split(' ').splice(1, 3).join(' ');
  };

  const charCount = e => {
    var maxLength = 280;
    var currentLength = document.getElementById('review-text');
    currentLength = currentLength.value.length;
    document.getElementById('char').innerText = currentLength + '/280';
    if (currentLength == maxLength) {
      document.getElementById('char').style.color = 'red';
    } else {
      document.getElementById('char').style.color = 'black';
    }
  };

  /* Feedback Modal ###################################################### */

  const showFeedback = e => {
    document.getElementById('feedback').style.display = 'block';
  };

  const hideFeedback = e => {
    document.getElementById('feedback').style.display = 'none';
  };

  return (
    <Fragment>
      <header>
        <div className='nav-left' id='nav' onClick={refresh}>
          <img src={logo} id='logo' alt='Font Frog Logo' width='150' />
          <h1 className='logo'>Font Frog</h1>
        </div>
        <div className='nav-right'>
          <p onClick={showFeedback}>Feature Request</p>
          <p onClick={showReviews}>Reviews</p>
        </div>
      </header>

      <div id='myModal' className='modal'>
        <div className='modal-content'>
          <span className='close' onClick={closeModal}>
            &times;
          </span>
          <form className='riddle-form' id='riddle'>
            <p>
              Stop! Who would cross the Bridge of Death must answer me these questions three,
              'ere the other side he see.
            </p>
            <div className='riddle'>
              <label htmlFor='name'>What is your name?</label>
              <input type='text' id='name' />
            </div>
            <br />
            <div className='riddle'>
              <label htmlFor='quest'>What is your quest?</label>
              <input type='text' id='quest' />
            </div>
            <br />
            <div className='riddle'>
              <label htmlFor='colour'>What is your favourite colour?</label>
              <input type='text' id='colour' />
            </div>
            <button type='submit' className='riddle-submit' onClick={temp}>
              Submit
            </button>
          </form>
        </div>
      </div>

      <div id='reviews' className='modal'>
        <div className='review-content'>
          <span className='close' onClick={hideReviews}>
            &times;
          </span>
          <h1>Reviews</h1>
          <div className='reviews'>
            <div className='review'>
              <div className='review-inner'>
                <div className='top'>
                  <input
                    type='text'
                    placeholder="What's your name?"
                    maxLength='15'
                    id='name'
                  />
                  <div className='star-rating'>
                    <label htmlFor='one'>
                      <FontAwesomeIcon icon={faStar} />
                    </label>
                    <input type='radio' name='one-star' id='one' className='star-input' />
                    <label htmlFor='two'>
                      <FontAwesomeIcon icon={faStar} />
                    </label>
                    <input type='radio' name='two-star' id='two' className='star-input' />
                    <label htmlFor='three'>
                      <FontAwesomeIcon icon={faStar} />
                    </label>
                    <input type='radio' name='three-star' id='three' className='star-input' />
                    <label htmlFor='four'>
                      <FontAwesomeIcon icon={faStar} />
                    </label>
                    <input type='radio' name='four-star' id='four' className='star-input' />
                    <label htmlFor='five'>
                      <FontAwesomeIcon icon={faStar} />
                    </label>
                    <input type='radio' name='five-star' id='five' className='star-input' />
                  </div>
                </div>
                <textarea
                  id='review-text'
                  cols='30'
                  rows='10'
                  placeholder='What do you think?'
                  maxLength='280'
                  spellCheck='false'
                  onKeyUp={charCount}
                ></textarea>
                <div className='bottom'>
                  <p id='char'>0/280</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id='feedback' className='modal'>
        <div className='feedback-content'>
          <span className='close' onClick={hideFeedback}>
            &times;
          </span>
          <h1>Feature Requests</h1>
          <Index />
        </div>
      </div>

      <nav className='context-menu'>
        <ul className='context-menu-items'>
          <li className='context-menu-item'>
            <p id='login' onClick={combo}>
              Log In
            </p>
          </li>
          <hr />
          <li className='context-menu-item'>
            <p>
              <a href={logo} target='_blank' rel='noopener noreferrer'>
                Open image in new tab
              </a>
            </p>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default Header;
