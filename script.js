window.addEventListener('DOMContentLoaded', function(event) {
  /* OPEN IMAGES INTO MODAL WINDOW */
  try {
      const popupImages = (trigger) => {
          const imgPopup = document.createElement('div'),
                div = document.createElement('div'),
                workSection = document.querySelector(trigger),
                bigImage = document.createElement('img'),
                leftArrow = document.createElement('a'),
                rightArrow = document.createElement('a'),
                spanL = document.createElement('span'),
                spanR = document.createElement('span'),
                images = workSection.querySelectorAll('.preview');

          imgPopup.classList.add('popup');
          workSection.appendChild(imgPopup);
          imgPopup.appendChild(div);

          imgPopup.style.justifyContent = 'center';
          imgPopup.style.alignItems = 'center';
          imgPopup.style.display = 'none';

          div.appendChild(bigImage);

          if(images.length > 1) {
              div.appendChild(leftArrow);
              leftArrow.classList.add('speasyimagegallery-prev');
              leftArrow.appendChild(spanL);
              div.appendChild(rightArrow);
              rightArrow.classList.add('speasyimagegallery-next');
              rightArrow.appendChild(spanR);
          }

          workSection.addEventListener('click', (e) => {
              e.preventDefault();

              let target = e.target;

              if (target && (target.classList.contains('preview') || target.parentNode.classList.contains('preview'))) {
                  imgPopup.style.display = 'flex';
                  const path = target.closest('a').getAttribute('href');
                  bigImage.setAttribute('src', path);
                  bigImage.classList.remove('animate__animated', 'animate__fadeIn');
                  bigImage.classList.add('animate__animated', 'animate__fadeIn');
              }

              if (target && target.matches('div.popup')) {
                  imgPopup.style.display = 'none';
              }
          });

          leftArrow.addEventListener('click', (e) => {
              let target = e.target;
              let src = target.parentNode.previousSibling.getAttribute('src');
              images.forEach((item, key) => {
                  if (item.parentNode.getAttribute('href') === src) {
                      if (key === 0) {
                          key = images.length;
                      }
                      bigImage.setAttribute('src', images[key-1].parentNode.getAttribute('href'));
                  }
              });
          });

          rightArrow.addEventListener('click', (e) => {
              let target = e.target;
              let src = target.parentNode.previousSibling.previousSibling.getAttribute('src');
              images.forEach((item, key) => {
                  if (item.parentNode.getAttribute('href') === src) {
                      if (key == images.length - 1) {
                          key = -1;
                      }
                      bigImage.setAttribute('src', images[key+1].parentNode.getAttribute('href'));
                  }
              });
          });
      };

      popupImages('.mod-speasyimagegallery');
  } catch(e) {}
});
