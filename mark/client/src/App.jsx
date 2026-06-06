import { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    // Placeholder for behaviors (swiper, isotope, etc.) to wire up later
  }, []);

  return (
    <div className="home light-skin">
      <div className="container-page">
        <header className="header">
          <div className="header__builder">
            <div className="row">
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <div className="logo">
                  <a href="/">
                    <img id="hero-logo" width="360" height="60" src="/assets/images/logo.png" alt="MarkitUp logo" />
                  </a>
                </div>
              </div>
              <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 align-right">
                <a href="#" className="switcher-btn" aria-label="Theme switch" />
              </div>
            </div>
          </div>
        </header>

        <main className="wrapper">
          <section className="lui-section lui-section-hero lui-gradient-top" id="started-section">
            <div className="container">
              <div className="lui-started v-line v-line-left">
                <div className="section hero-started">
                  <div className="content">
                    <div className="titles">
                      <div className="lui-subtitle"><span>Hello world, <b> we are </b></span></div>
                      <h1 className="title"><span><b>MarkitUp</b></span></h1>
                      <div className="label lui-subtitle"> a <strong>Content Marketing Agency</strong></div>
                    </div>
                    <div className="description">
                      <p>We are a team of enthusiastic individuals who help brands grow by unleashing the potential of social media</p>
                      <div className="social-links">
                        <a target="_blank" rel="nofollow" href="https://instagram.com/markitup_in" aria-label="Instagram"><i className="fab fa-instagram" /></a>
                        <a target="_blank" rel="nofollow" href="https://www.linkedin.com/company/markitupin" aria-label="LinkedIn"><i className="fab fa-linkedin" /></a>
                        <a target="_blank" rel="nofollow" href="https://twitter.com/markitup_in" aria-label="Twitter"><i className="fab fa-twitter" /></a>
                      </div>
                    </div>
                    <div className="bts">
                      <a target="_blank" href="https://bit.ly/contactmarkitup" className="btn"><span>Contact Us</span></a>
                      <a href="https://drive.google.com/file/d/1Sc--LpkSRmWgGzp2uQhi78h9062630GG/view?usp=sharing" target="_blank" className="btn-lnk" rel="noreferrer">Download Brochure</a>
                    </div>
                  </div>
                  <div className="slide">
                    <img decoding="async" src="/assets/images/profile2.png" alt="Index banner graphic" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Services */}
          <section className="lui-section lui-gradient-bottom" id="services-section">
            <div className="lui-heading">
              <div className="container">
                <div className="m-titles align-center">
                  <h2 className="m-title"><span> Our Services </span></h2>
                </div>
              </div>
            </div>
            <div className="v-line v-line-right">
              <div className="container">
                <div className="swiper-container js-services">
                  <div className="swiper-wrapper">
                    {[{title:'Social Media Management', sub:'Instagram, LinkedIn and more', text:'Amplify your social media impact through expert management services. We devise captivating strategies for heightened engagement, follower growth, and extensive reach.'},
                      {title:'360° Youtube Management', sub:'For Brands and Influencers', text:'All-encompassing support for strategy, post-production, operations, and analytics, driving channel growth and success.'},
                      {title:'Graphic Designing', sub:'Multipurpose Designing', text:'Elevate your brand with versatile, tailored multipurpose graphic design services: stunning visuals for marketing, branding, and social media.'},
                      {title:'Video Editing', sub:'Vlogs, Tutorials, Educational etc.', text:'Transform your raw footage into stunning, engaging videos with our professional video editing services. From concept to delivery, we bring your story to life.'},
                      {title:'Advertising', sub:'Facebook, Instagram and Google', text:'Empower your brand with Facebook, Instagram, Google, and YouTube advertising. Reach millions, boost sales, and maximize visibility.'},
                      {title:'Social Media Consulting', sub:'Calls for building strategy', text:'Maximize YouTube success with expert consulting: channel analysis, video ideas, editing/thumbnail feedback, and optimization.'}
                    ].map((s, i) => (
                      <div className="swiper-slide" key={i}>
                        <div className="services-item">
                          <div className="lui-subtitle"><h5 className="lui-title-small"><span>{s.title}</span></h5></div>
                          <br />
                          <h5 className="lui-title"><span>{s.sub}</span></h5>
                          <br />
                          <div className="lui-text"><div>{s.text}</div></div>
                          <div className="image" style={{backgroundImage:'url(/assets/images/pat-2.png)'}} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="swiper-pagination" />
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="lui-section lui-gradient-center" id="testimonials-section">
            <div className="lui-heading">
              <div className="container">
                <div className="m-titles align-center">
                  <h2 className="m-title"><span> Testimonials </span></h2>
                  <div className="m-subtitle"><span> what <b>Customers Say</b></span></div>
                </div>
              </div>
            </div>
            <div className="v-line v-line-right">
              <div className="container">
                <div className="swiper-container js-testimonials">
                  <div className="swiper-wrapper">
                    {[{img:'/assets/images/testimonial/kushal.jpg', name:'Kushal Lodha', text:"MarkitUp's exceptional Social Media Management saved me so much time and made my experience smooth."},
                      {img:'/assets/images/testimonial/mehulmohan.jpeg', name:'Mehul Mohan', text:'Markitup helped us get organised with publishing that boosted our views from 250k/month to 1.1M/month.'},
                      {img:'/assets/images/testimonial/sahithkrishna.jpeg', name:'Sahith Krishna', text:'Team MarkitUp is young, energetic and creative. The quality of work is impeccable!'}
                    ].map((t, i) => (
                      <div className="swiper-slide" key={i}>
                        <div className="testimonials-item">
                          <div className="image"><img decoding="async" src={t.img} alt={t.name} /></div>
                          <div className="text lui-text"><div><p>{t.text}</p></div></div>
                          <div className="info"><h6 className="name"><span>{t.name}</span></h6></div>
                          <div className="bg-img" style={{backgroundImage:'url(/assets/images/pat-2.png)'}} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="swiper-pagination" />
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="footer">
          <div className="footer__builder">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                  <div className="social-links">
                    <a target="_blank" rel="nofollow" href="https://instagram.com/markitup_in"><i className="fab fa-instagram" /></a>
                    <a target="_blank" rel="nofollow" href="https://www.linkedin.com/company/markitupin"><i className="fab fa-linkedin" /></a>
                    <a target="_blank" rel="nofollow" href="https://twitter.com/markitup_in"><i className="fab fa-twitter" /></a>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                  <div className="copyright-text align-center">
                    <div>© 2025 <strong>MarkitUp Media Private Limited</strong></div>
                    <div>All Rights Reserved</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <div className="cursor" />
    </div>
  );
}

export default App
