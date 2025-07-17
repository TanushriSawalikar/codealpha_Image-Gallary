document.addEventListener('DOMContentLoaded', function() {
    // Image data with categories
    const images = [
        { src: 'images/waterfall1.jpg', caption: 'Beautiful Waterfall', category: 'nature' },
        { src: 'images/mountains.jpg', caption: 'Snowy Mountains', category: 'nature' },
        { src: 'images/forest1.jpg', caption: 'Dense Forest', category: 'nature' },
        { src: 'images/lion.jpg', caption: 'Lion in the Wild', category: 'animals' },
        { src: 'images/elephant.jpg', caption: 'Elephant Family', category: 'animals' },
        { src: 'images/bird.jpg', caption: 'Colorful Bird', category: 'animals' },
        { src: 'images/Modern Skyscraper.jpg', caption: 'Modern Skyscraper', category: 'architecture' },
        { src: 'images/golden gate bridge.jpg', caption: 'Golden Gate Bridge', category: 'architecture' },
        { src: 'images/cathedral.jpg', caption: 'Historic Cathedral', category: 'architecture' },
        { src: 'images/ocean sunset1.jpg', caption: 'Ocean Sunset', category: 'nature' },
        { src: 'images/wolf1.jpg', caption: 'Arctic Wolf', category: 'animals' },
        { src: 'images/medieval Castle.jpg', caption: 'Medieval Castle', category: 'architecture' },
        { src: 'images/snow leapord2.jpg', caption: 'Snow Leopard', category: 'animals' },
        { src: 'images/red panda1.jpg', caption: 'Red Panda', category: 'animals' },
        { src: 'images/hummingbird1.jpg', caption: 'Humming Bird', category: 'animals' },
        { src: 'images/bengal tiger1.jpg', caption: 'Bengal Tiger', category: 'animals' },
        { src: 'images/great horned owl 1.jpg', caption: 'Great Horned owl', category: 'animals' },
        { src: 'images/sea turtle.jpg', caption: 'Sea turtle', category: 'animals' },
        { src: 'images/macaw2.jpg', caption: 'macaw', category: 'animals' },
        { src: 'images/wild flowers 1.jpg', caption: 'Wild Flowers', category: 'nature' },
        { src: 'images/deserts1.jpg', caption: 'Desert', category: 'nature' },
        { src: 'images/starry skies1.jpg', caption: 'Starry Skies', category: 'nature' },
        { src: 'images/Autumn foliage1.jpg', caption: 'Autumn Foliage', category: 'nature' },
        { src: 'images/wildlife in habitat.jpg', caption: 'wildlife Habitat', category: 'nature' },
        { src: 'images/resential architecture.jpg', caption: 'Residential Architecture', category: 'architecture' },
        { src: 'images/interior spaces1.jpg', caption: 'Interior Spaces', category: 'architecture' },
        { src: 'images/religious structure1.png', caption: 'Religious structure', category: 'architecture' },
        { src: 'images/rooftop views.jpg', caption: 'Rooftop Views', category: 'architecture' },
        { src: 'images/transportation.jpg', caption: 'Transportation', category: 'travel' },
        { src: 'images/travelling.jpg', caption: 'Travelling', category: 'travel' },
        { src: 'images/harshil valley.jpg', caption: 'Hidden Gem', category: 'travel' },
        { src: 'images/diwali.jpg', caption: 'Diwali', category: 'festivals' },
        { src: 'images/holi.jpg', caption: 'Holi', category: 'festivals' },
        { src: 'images/durga puja.jpg', caption: 'Durga Puja', category: 'festivals' },
        { src: 'images/pongal.jpg', caption: 'Pongal', category: 'festivals' },
        { src: 'images/navratri.jpg', caption: 'Navratri', category: 'festivals' },
        { src: 'images/baisakhi.jpg', caption: 'baisakhi', category: 'festivals' },
        { src: 'images/janmashtami1.jpg', caption: 'Janmashtami', category: 'festivals' },
        { src: 'images/ganesh chaturthi1.jpg', caption: 'Ganesh Chaturthi', category: 'festivals' },
        { src: 'images/mountain trekking.jpg', caption: 'Mountain Trekking', category: 'travel' },
        { src: 'images/desert safari1.jpg', caption: 'Desert Safari', category: 'travel' },
        { src: 'images/jungle expedition1.jpg', caption: 'Jungle expedition', category: 'travel' },
        { src: 'images/street performance.jpg', caption: 'Street Performance', category: 'travel' },
        { src: 'images/underwater world.jpg', caption: 'Underwater World', category: 'travel' },
        { src: 'images/neon streets.jpg', caption: 'Neon Streets', category: 'travel' },
        { src: 'images/cherry blossoms.jpg', caption: 'Cherry Blossoms', category: 'travel' },




    ];

    const galleryGrid = document.querySelector('.gallery-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('close-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const imageInfo = document.getElementById('image-info');

    let currentImageIndex = 0;
    let filteredImages = [];

    // Initialize gallery
    function initGallery() {
        galleryGrid.innerHTML = '';
        filteredImages = images;
        
        images.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = `gallery-item ${image.category}`;
            galleryItem.setAttribute('data-index', index);
            
            galleryItem.innerHTML = `
                <img src="${image.src}" alt="${image.caption}" class="gallery-img">
                <div class="image-caption">${image.caption}</div>
                <div class="category-tag">${image.category}</div>
            `;
            
            galleryItem.addEventListener('click', () => openLightbox(index));
            galleryGrid.appendChild(galleryItem);
        });
    }

    // Filter images by category
    function filterImages(category) {
        if (category === 'all') {
            filteredImages = images;
            document.querySelectorAll('.gallery-item').forEach(item => {
                item.style.display = 'block';
            });
        } else {
            filteredImages = images.filter(image => image.category === category);
            document.querySelectorAll('.gallery-item').forEach(item => {
                if (item.classList.contains(category)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }
    }

    // Open lightbox with selected image
    function openLightbox(index) {
        currentImageIndex = filteredImages.findIndex(img => img === images[index]);
        if (currentImageIndex === -1) {
            // If image not in filtered results, show all images starting from this one
            filteredImages = images;
            currentImageIndex = index;
        }
        
        updateLightbox();
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    // Update lightbox content
    function updateLightbox() {
        const image = filteredImages[currentImageIndex];
        lightboxImg.src = image.src;
        lightboxImg.alt = image.caption;
        imageInfo.textContent = image.caption;
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    // Navigate to previous image
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
        updateLightbox();
    }

    // Navigate to next image
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
        updateLightbox();
    }

    // Event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterImages(button.dataset.filter);
        });
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('show')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        }
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
            
    // Initialize the gallery
    initGallery();
});


// Dark Mode Toggle
const darkToggle = document.getElementById("darkModeToggle");
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

// Load theme on refresh
window.onload = () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
};
