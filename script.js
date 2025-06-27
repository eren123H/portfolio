 document.addEventListener('DOMContentLoaded', () => {
     // Navigasyon linkleri için yumuşak kaydırma
     document.querySelectorAll('nav a').forEach(anchor => {
         anchor.addEventListener('click', function (e) {
             e.preventDefault();

             document.querySelector(this.getAttribute('href')).scrollIntoView({
                 behavior: 'smooth'
             });
         });
     });

     // Kaydırma sırasında animasyonlar (Intersection Observer API)
     const observer = new IntersectionObserver((entries, observer) => {
         entries.forEach(entry => {
             if (entry.isIntersecting) {
                 // Öğeler görünür hale geldiğinde 'visible' sınıfını ekle
                 entry.target.classList.add('visible');
                 // Animasyon bir kez çalıştıktan sonra gözlemlemeyi bırak
                 observer.unobserve(entry.target);
             }
         });
     }, {
         threshold: 0.1 // Öğenin %10'u görünür olduğunda tetikle
     });

     // Animasyon uygulanacak öğeleri seç (anasayfa hariç tüm section'lar ve proje kartları)
     document.querySelectorAll('section:not(#home), .project-card').forEach(element => {
         element.classList.add('hidden'); // Başlangıçta 'hidden' sınıfını ekle
         observer.observe(element); // Gözlemlemeye başla
     });

     // Header'a scroll efekti ekleme
     const header = document.querySelector('header');
     window.addEventListener('scroll', () => {
         if (window.scrollY > 50) { // 50px aşağı kaydırınca
             header.classList.add('scrolled');
         } else {
             header.classList.remove('scrolled');
         }
     });
 });