import { useEffect, useRef, useState } from 'react';
import './App.css';
import { MdLocalDining, MdRestaurant, MdPhoneIphone, MdLocationOn, MdPhone } from 'react-icons/md';
import { FaInstagram } from 'react-icons/fa';

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

  // Header height -> CSS var
  useEffect(() => {
    const updateHeaderVar = () => {
      if (headerRef.current) {
        const h = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${h}px`);
      }
    };
    updateHeaderVar();
    window.addEventListener('resize', updateHeaderVar);
    return () => window.removeEventListener('resize', updateHeaderVar);
  }, []);

  // Smooth scrolling for navigation links
  useEffect(() => {
    const handleClick = (e) => {
      if (
        e.target.classList.contains('nav-link') &&
        e.target.getAttribute('href')?.startsWith('#')
      ) {
        // Varsayılan anchor davranışı kalsın, sadece menüyü kapat
        setNavOpen(false);
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
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.matchMedia('(min-width: 769px)').matches;
    if (prefersReduced || !isDesktop) return;

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

  // Interactive hover effects for menu cards (bind only for non-touch devices)
  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

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
          <p className="hero-subtitle">Küçükpark Meydan Pilavcısı – Ege’nin En Lezzetli Pilavı</p>
          <h1 className="hero-title heading-primary">
            Küçükpark Meydan Pilavcısı
          </h1>
          <p className="hero-description">
            İzmir Ege Üniversitesi yakınında, taptaze ve bol malzemeli pilavlarımızla hizmetinizdeyiz. Tavuklu, ciğerli, karışık ve daha birçok seçenek… Hem yerinde hem paket servis!
          </p>
          {/* Modern Vurgular - Profesyonel Kartlar */}
          <div className="hero-highlights-pro" style={{display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', margin: '2.5rem 0'}}>
            <div className="highlight-pro-card fade-in">
              <div className="highlight-pro-icon"><MdLocalDining size={44} color="#dc2626" /></div>
              <div className="highlight-pro-title">Günlük taze malzemeler</div>
            </div>
            <div className="highlight-pro-card fade-in">
              <div className="highlight-pro-icon"><MdRestaurant size={44} color="#dc2626" /></div>
              <div className="highlight-pro-title">Bol porsiyon, uygun fiyat</div>
            </div>
            <div className="highlight-pro-card fade-in">
              <div className="highlight-pro-icon"><MdPhoneIphone size={44} color="#dc2626" /></div>
              <div className="highlight-pro-title">Trendyol, Yemeksepeti ve Getir Yemek üzerinden sipariş</div>
            </div>
          </div>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center'}}>
            <a href="#order" className="cta-button" style={{minWidth: 180, textAlign: 'center', background: '#dc2626'}}>Online Sipariş Ver</a>
            <a href="#menu" className="cta-button" style={{minWidth: 180, textAlign: 'center', background: '#1a1a1a'}}>Menümüze Göz At</a>
          </div>
        </div>
      </section>
      {/* Menu Section */}
      <section className="menu" id="menu">
        <div className="container">
          <div className="section-header fade-in">
            <p className="section-subtitle">Lezzet Menümüz</p>
            <h2 className="section-title heading-secondary">Lezzet Menümüz</h2>
            <p className="section-description">
              Ana Yemekler, Ekstralar, İçecekler ve Çiğköfte çeşitlerimizle her damak tadına uygun seçenekler!
            </p>
          </div>
          <div className="menu-categories-modern" style={{display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', marginBottom: '2.5rem'}}>
            {/* Ana Yemekler */}
            <div className="menu-category-card fade-in" style={{background:'#fff', borderRadius:18, boxShadow:'0 4px 16px rgba(220,38,38,0.07)', padding:'2rem 1.5rem', minWidth:240, maxWidth:270}}>
              <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:12}}>
                <span style={{fontSize:'1.7rem'}}>🍚</span>
                <h3 style={{color: '#dc2626', fontWeight: 700, fontSize:'1.2rem', margin:0}}>Ana Yemekler</h3>
              </div>
              <div style={{display:'flex', flexWrap:'wrap', gap:'0.5rem'}}>
                <span className="menu-badge">Tavuklu Pilav</span>
                <span className="menu-badge">Ciğerli Pilav</span>
                <span className="menu-badge">Karışık Pilav</span>
                <span className="menu-badge">Sade Pilav</span>
                <span className="menu-badge">Mısırlı Pilav</span>
                <span className="menu-badge">Tavuk Soteli Pilav</span>
                <span className="menu-badge">Kavurmalı Pilav</span>
                <span className="menu-badge">Kuru Fasulyeli Pilav</span>
              </div>
            </div>
            {/* Ekstralar */}
            <div className="menu-category-card fade-in" style={{background:'#fff', borderRadius:18, boxShadow:'0 4px 16px rgba(220,38,38,0.07)', padding:'2rem 1.5rem', minWidth:180, maxWidth:220}}>
              <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:12}}>
                <span style={{fontSize:'1.7rem'}}>➕</span>
                <h3 style={{color: '#dc2626', fontWeight: 700, fontSize:'1.2rem', margin:0}}>Ekstralar</h3>
              </div>
              <div style={{display:'flex', flexWrap:'wrap', gap:'0.5rem'}}>
                <span className="menu-badge">Yoğurt</span>
                <span className="menu-badge">Garnitür</span>
                <span className="menu-badge">Mısır</span>
                <span className="menu-badge">Tavuk</span>
                <span className="menu-badge">Ciğer</span>
              </div>
            </div>
            {/* İçecekler */}
            <div className="menu-category-card fade-in" style={{background:'#fff', borderRadius:18, boxShadow:'0 4px 16px rgba(220,38,38,0.07)', padding:'2rem 1.5rem', minWidth:180, maxWidth:220}}>
              <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:12}}>
                <span style={{fontSize:'1.7rem'}}>🥤</span>
                <h3 style={{color: '#dc2626', fontWeight: 700, fontSize:'1.2rem', margin:0}}>İçecekler</h3>
              </div>
              <div style={{display:'flex', flexWrap:'wrap', gap:'0.5rem'}}>
                <span className="menu-badge">Ayran</span>
                <span className="menu-badge">Kola</span>
                <span className="menu-badge">Fanta</span>
                <span className="menu-badge">Su</span>
                <span className="menu-badge">Soda</span>
                <span className="menu-badge">Şalgam</span>
              </div>
            </div>
            {/* Çiğköfte */}
            <div className="menu-category-card fade-in" style={{background:'#fff', borderRadius:18, boxShadow:'0 4px 16px rgba(220,38,38,0.07)', padding:'2rem 1.5rem', minWidth:180, maxWidth:220}}>
              <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:12}}>
                <span style={{fontSize:'1.7rem'}}>🌯</span>
                <h3 style={{color: '#dc2626', fontWeight: 700, fontSize:'1.2rem', margin:0}}>Çiğköfte</h3>
                </div>
              <div style={{display:'flex', flexWrap:'wrap', gap:'0.5rem'}}>
                <span className="menu-badge">Çiğköfte Dürüm</span>
                <span className="menu-badge">Çiğköfte Porsiyon</span>
              </div>
            </div>
          </div>
          <div className="menu-note" style={{textAlign: 'center', color: '#ef4444', fontWeight: 600, marginBottom: '2rem'}}>
            * Fiyatlar güncel tutulacaktır.
          </div>
        </div>
      </section>
      {/* About Section */}
      <section className="about" id="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text fade-in">
              <h2 className="heading-secondary">Pilavda İzmir’in Yeni Lezzet Noktası</h2>
              <p>
                Küçükpark Meydan Pilavcısı olarak, pilav kültürünü modern ve hijyenik bir ortamda sizlere sunuyoruz. Her gün taze pişen baldo pirinçler, özenle seçilen tavuk ve ciğerle buluşuyor. Üniversite öğrencilerinden esnafa kadar herkesin uğrak noktası olmayı hedefliyoruz.
              </p>
              <div style={{margin: '2rem 0'}}>
                <div style={{marginBottom: '1rem'}}>
                  <strong>Misyonumuz:</strong>
                  <ul style={{margin: '0.5rem 0 0 1.5rem', color: '#ef4444', fontWeight: 500}}>
                    <li>Lezzeti ve kaliteyi herkese ulaştırmak</li>
                  </ul>
                </div>
                <div>
                  <strong>Vizyonumuz:</strong>
                  <ul style={{margin: '0.5rem 0 0 1.5rem', color: '#ef4444', fontWeight: 500}}>
                    <li>İzmir’in en bilinen pilav markası olmak</li>
                  </ul>
                  </div>
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
            <p className="section-description">Sorularınız için bizimle iletişime geçin veya sipariş verin</p>
          </div>
          <div className="contact-grid">
            <div className="contact-card fade-in">
              <span className="contact-icon"><MdLocationOn size={32} color="#dc2626" /></span>
              <h3>Adres</h3>
              <p>Doğanlar Mahallesi, Bornova / İzmir<br/>(Ege Üniversitesi Küçükpark Meydanı yakınında)</p>
            </div>
            <div className="contact-card fade-in">
              <span className="contact-icon"><MdPhone size={32} color="#dc2626" /></span>
              <h3>Telefon</h3>
              <p>(0XXX) XXX XX XX</p>
            </div>
            <div className="contact-card fade-in">
              <span className="contact-icon"><FaInstagram size={32} color="#dc2626" /></span>
              <h3>Sosyal Medya</h3>
              <p>
                Instagram: <a href="https://instagram.com/meydanpilavcisi35" target="_blank" rel="noopener noreferrer" style={{color:'#dc2626', textDecoration:'underline'}}>@meydanpilavcisi35</a>
              </p>
            </div>
          </div>
          <div className="contact-map fade-in" style={{marginTop: '2.5rem', textAlign: 'center'}}>
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3132.0000000000005!2d27.226000000000003!3d38.464000000000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbdfe000000001%3A0x0000000000000000!2sEge%20%C3%9Cniversitesi%20K%C3%BC%C3%A7%C3%BCkpark%20Meydan%C4%B1!5e0!3m2!1str!2str!4v0000000000000!5m2!1str!2str"
              width="100%"
              height="300"
              style={{border:0, borderRadius: '15px', maxWidth: 600}}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
      {/* Online Sipariş Section */}
      <section className="order" id="order">
        <div className="container">
          <div className="section-header fade-in">
            <p className="section-subtitle">Pilavınız Kapınızda</p>
            <h2 className="section-title heading-secondary">Pilavınız Kapınızda</h2>
            <p className="section-description">
              Dilediğiniz lezzeti anında sipariş verebilirsiniz. Trendyol, Yemeksepeti ve Getir Yemek üzerinden kolayca sipariş verin.
            </p>
              </div>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.7rem', justifyContent: 'center', marginTop: '2.5rem'}}>
            <a href="https://www.trendyol.com/sr?mid=XXXX" target="_blank" rel="noopener noreferrer" className="menu-badge order-badge trendyol-badge">
              <span style={{fontSize:'1.1em', marginRight:6}}>🛒</span> Trendyol
            </a>
            <a href="https://www.yemeksepeti.com/restaurant/XXXX" target="_blank" rel="noopener noreferrer" className="menu-badge order-badge yemeksepeti-badge">
              <span style={{fontSize:'1.1em', marginRight:6}}>🍽️</span> Yemeksepeti
            </a>
            <a href="https://getir.com/yemek/restoran/XXXX" target="_blank" rel="noopener noreferrer" className="menu-badge order-badge getir-badge">
              <span style={{fontSize:'1.1em', marginRight:6}}>🚗</span> Getir Yemek
            </a>
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