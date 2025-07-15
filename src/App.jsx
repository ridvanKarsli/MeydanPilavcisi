import { useEffect, useRef, useState } from 'react';
import './App.css';

const MENU_ITEMS = [
  {
    icon: '🍚',
    title: 'Klasik Pilav',
    desc: 'Geleneksel yöntemlerle pişirilen, tereyağı ve özel baharatlarla tatlandırılmış nefis pilav',
    price: '₺35',
  },
  {
    icon: '🥩',
    title: 'Premium Etli Pilav',
    desc: 'Seçkin kuzu etinin lezzetiyle buluşan, özenle hazırlanmış doyurucu pilav deneyimi',
    price: '₺65',
  },
  {
    icon: '🐔',
    title: 'Tavuklu Pilav',
    desc: 'Taze tavuk göğsü ve aromalı baharatlarla hazırlanan protein açısından zengin pilav',
    price: '₺45',
  },
  {
    icon: '🥕',
    title: 'Sebzeli Pilav',
    desc: 'Mevsim sebzeleriyle rengarenk, sağlıklı ve lezzetli vegetaryen pilav seçeneği',
    price: '₺40',
  },
  {
    icon: '🦐',
    title: 'Deniz Mahsullü Pilav',
    desc: 'Taze deniz ürünleriyle hazırlanan, denizin lezzetini sofralarınıza taşıyan özel pilav',
    price: '₺75',
  },
  {
    icon: '🌶️',
    title: 'Acılı Pilav',
    desc: 'Baharatlı ve acı seven damak tadları için özel olarak hazırlanmış pilav çeşidi',
    price: '₺38',
  },
];

const ABOUT_STATS = [
  { number: '50+', label: 'Yıllık Tecrübe' },
  { number: '10K+', label: 'Mutlu Müşteri' },
  { number: '15', label: 'Pilav Çeşidi' },
];

const CONTACT_CARDS = [
  {
    icon: '📍',
    title: 'Adresimiz',
    desc: (
      <>
        Merkez Mahallesi<br />Lezzet Sokak No: 15<br />Beyoğlu, İstanbul
      </>
    ),
  },
  {
    icon: '📞',
    title: 'Telefon',
    desc: (
      <>
        +90 212 555 0123<br />+90 532 555 0123
      </>
    ),
  },
  {
    icon: '🕒',
    title: 'Çalışma Saatleri',
    desc: (
      <>
        Pazartesi - Cumartesi: 09:00 - 22:00<br />Pazar: 10:00 - 21:00
      </>
    ),
  },
  {
    icon: '📧',
    title: 'E-posta',
    desc: (
      <>
        info@lezzetpilav.com<br />siparis@lezzetpilav.com
      </>
    ),
  },
];

function App() {
  const [loading, setLoading] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const headerRef = useRef(null);

  // Loading screen
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        if (window.scrollY > 100) {
          headerRef.current.classList.add('scrolled');
        } else {
          headerRef.current.classList.remove('scrolled');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scrolling for navigation links
  useEffect(() => {
    const handleClick = (e) => {
      if (
        e.target.classList.contains('nav-link') &&
        e.target.getAttribute('href')?.startsWith('#')
      ) {
        e.preventDefault();
        setNavOpen(false);
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target && headerRef.current) {
          const headerHeight = headerRef.current.offsetHeight;
          const targetPosition = target.offsetTop - headerHeight;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };
    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);
    document.querySelectorAll('.fade-in').forEach((el) => {
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, [loading]);

  // Parallax effect for hero section
  useEffect(() => {
    const handleScroll = () => {
      const hero = document.querySelector('.hero');
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Order button functionality
  useEffect(() => {
    const handleOrder = (e) => {
      if (e.target.classList.contains('order-btn')) {
        const card = e.target.closest('.menu-card');
        const menuItem = card.querySelector('h3').textContent;
        alert(`${menuItem} siparişiniz alındı! Teşekkür ederiz.`);
      }
    };
    document.addEventListener('click', handleOrder);
    return () => document.removeEventListener('click', handleOrder);
  }, []);

  // Interactive hover effects for menu cards (for mouse only)
  useEffect(() => {
    const cards = document.querySelectorAll('.menu-card');
    const handleEnter = function () {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    };
    const handleLeave = function () {
      this.style.transform = 'translateY(0) scale(1)';
    };
    cards.forEach((card) => {
      card.addEventListener('mouseenter', handleEnter);
      card.addEventListener('mouseleave', handleLeave);
    });
    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mouseenter', handleEnter);
        card.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, [loading]);

  return (
    <>
      {/* Loading Screen */}
      {loading && (
        <div className="loading">
          <div className="loader"></div>
        </div>
      )}
      {/* Header */}
      <header className="header" id="header" ref={headerRef}>
        <nav className="nav">
          <a href="#" className="logo">
            Küçükpark Meydan Pilavcısı
          </a>
          <div
            className={`nav-toggle${navOpen ? ' active' : ''}`}
            id="navToggle"
            onClick={() => setNavOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <ul className={`nav-menu${navOpen ? ' active' : ''}`} id="navMenu">
            <li>
              <a href="#home" className="nav-link">
                Ana Sayfa
              </a>
            </li>
            <li>
              <a href="#menu" className="nav-link">
                Menü
              </a>
            </li>
            <li>
              <a href="#about" className="nav-link">
                Hakkımızda
              </a>
            </li>
            <li>
              <a href="#contact" className="nav-link">
                İletişim
              </a>
            </li>
          </ul>
        </nav>
      </header>
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="floating-element">🍚</div>
        <div className="floating-element">🥄</div>
        <div className="floating-element">🌾</div>
        <div className="hero-content">
          <p className="hero-subtitle">Premium Pilav Deneyimi</p>
          <h1 className="hero-title heading-primary">
            Küçükpark Meydan Pilavcısı
          </h1>
          <p className="hero-description">
            50 yıllık tecrübeyle hazırlanan, en kaliteli malzemelerle üretilen pilav çeşitlerimizi keşfedin
          </p>
          <a href="#menu" className="cta-button">
            Menümüzü İnceleyin <span>→</span>
          </a>
        </div>
      </section>
      {/* Menu Section */}
      <section className="menu" id="menu">
        <div className="container">
          <div className="section-header fade-in">
            <p className="section-subtitle">Özel Menümüz</p>
            <h2 className="section-title heading-secondary">Premium Pilav Çeşitlerimiz</h2>
            <p className="section-description">
              Her biri özenle hazırlanmış, geleneksel tariflerle modern sunum anlayışının buluştuğu lezzet yolculuğu
            </p>
          </div>
          <div className="menu-grid">
            {MENU_ITEMS.map((item, i) => (
              <div className="menu-card fade-in" key={item.title}>
                <span className="menu-icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <div className="menu-price">
                  <span className="price">{item.price}</span>
                  <button className="order-btn">Sipariş Ver</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* About Section */}
      <section className="about" id="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text fade-in">
              <h2 className="heading-secondary">50 Yıllık Lezzet Geleneği</h2>
              <p>
                1973 yılından bu yana, üç nesil boyunca geleneksel Türk mutfağının en değerli lezzetlerinden biri olan pilavı, özenle ve sevgiyle hazırlıyoruz.
              </p>
              <p>
                Büyükannelerimizden öğrendiğimiz sırlarla, en kaliteli malzemeler kullanarak her gün taze pilav çeşitleri sunuyoruz. Modern mutfak teknikleriyle birleştirdiğimiz geleneksel tariflerimiz, her lokmada nostaljik tatları yaşatıyor.
              </p>
              <div className="about-stats">
                {ABOUT_STATS.map((stat) => (
                  <div className="stat" key={stat.label}>
                    <span className="stat-number">{stat.number}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="about-image fade-in"></div>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="container">
          <div className="section-header fade-in">
            <p className="section-subtitle">İletişim</p>
            <h2 className="section-title heading-secondary">Bize Ulaşın</h2>
            <p className="section-description">Sorularınız için bizimle iletişime geçin veya rezervasyon yapın</p>
          </div>
          <div className="contact-grid">
            {CONTACT_CARDS.map((card) => (
              <div className="contact-card fade-in" key={card.title}>
                <span className="contact-icon">{card.icon}</span>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <h3 className="footer-logo">Küçükpark Meydan Pilavcısı</h3>
          <p className="footer-text">Geleneksel lezzetler, modern hizmet anlayışıyla buluşuyor</p>
          <div className="footer-divider"></div>
          <p className="footer-bottom">&copy; 2024 Küçükpark Meydan Pilavcısı. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
