/* =========================================================
   NAVBAR AND MOBILE MENU
========================================================= */

const navbar = document.querySelector(".navbar");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

function setNavbar(){
    navbar?.classList.toggle("scrolled", window.scrollY > 20);
}

setNavbar();
window.addEventListener("scroll", setNavbar);

menuBtn?.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    mobileMenu?.classList.toggle("active");
});

document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
        menuBtn?.classList.remove("active");
        mobileMenu?.classList.remove("active");
    });
});

/* =========================================================
   HERO SLIDER
========================================================= */

const heroSlides = document.querySelectorAll(".kd-hero .kd-slide");
const heroThumbs = document.querySelectorAll(".kd-thumb");
const heroNext = document.querySelector(".kd-hero .kd-next");
const heroPrev = document.querySelector(".kd-hero .kd-prev");

let heroIndex = 0;
let heroTimer;

function showHeroSlide(index){
    if (!heroSlides.length || !heroThumbs.length) return;

    heroSlides.forEach(slide => slide.classList.remove("active"));
    heroThumbs.forEach(thumb => thumb.classList.remove("active"));

    heroSlides[index].classList.add("active");
    heroThumbs[index].classList.add("active");
}

function changeHeroSlide(step){
    if (!heroSlides.length) return;
    heroIndex = (heroIndex + step + heroSlides.length) % heroSlides.length;
    showHeroSlide(heroIndex);
}

function startHeroSlider(){
    if (!heroSlides.length) return;
    heroTimer = setInterval(() => changeHeroSlide(1), 4500);
}

function resetHeroSlider(){
    clearInterval(heroTimer);
    startHeroSlider();
}

heroNext?.addEventListener("click", () => {
    changeHeroSlide(1);
    resetHeroSlider();
});

heroPrev?.addEventListener("click", () => {
    changeHeroSlide(-1);
    resetHeroSlider();
});

heroThumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
        heroIndex = index;
        showHeroSlide(heroIndex);
        resetHeroSlider();
    });
});

startHeroSlider();

/* =========================================================
   SEAMLESS REELS SLIDER
========================================================= */

document.querySelectorAll(".reels-track").forEach(track => {
    if (track.dataset.cloned === "true") return;

    const cards = [...track.children].filter(child => child.classList.contains("reel-card"));
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        track.appendChild(clone);
    });

    track.dataset.cloned = "true";
});

/* =========================================================
   REVIEW SLIDER
========================================================= */

const reviewSlider = document.getElementById("kdSlider");
const reviewSlides = document.querySelectorAll(".kd-review-slide");
const reviewNext = document.querySelector(".kd-review-next");
const reviewPrev = document.querySelector(".kd-review-prev");
const reviewDots = document.querySelectorAll(".kd-dot");

let reviewIndex = 0;

function getReviewSlidesPerView(){
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 992) return 2;
    return 3;
}

function updateReviewSlider(){
    if (!reviewSlider || !reviewSlides.length) return;

    const slidesPerView = getReviewSlidesPerView();
    const maxIndex = Math.max(reviewSlides.length - slidesPerView, 0);
    const slideWidth = 100 / slidesPerView;

    reviewIndex = Math.min(reviewIndex, maxIndex);
    reviewSlider.style.transform = `translateX(-${reviewIndex * slideWidth}%)`;

    reviewDots.forEach(dot => dot.classList.remove("active"));
    reviewDots[reviewIndex]?.classList.add("active");
}

reviewNext?.addEventListener("click", () => {
    const maxIndex = Math.max(reviewSlides.length - getReviewSlidesPerView(), 0);
    reviewIndex = reviewIndex < maxIndex ? reviewIndex + 1 : 0;
    updateReviewSlider();
});

reviewPrev?.addEventListener("click", () => {
    const maxIndex = Math.max(reviewSlides.length - getReviewSlidesPerView(), 0);
    reviewIndex = reviewIndex > 0 ? reviewIndex - 1 : maxIndex;
    updateReviewSlider();
});

reviewDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        reviewIndex = index;
        updateReviewSlider();
    });
});

if (reviewSlider && reviewSlides.length) {
    setInterval(() => {
        const maxIndex = Math.max(reviewSlides.length - getReviewSlidesPerView(), 0);
        reviewIndex = reviewIndex < maxIndex ? reviewIndex + 1 : 0;
        updateReviewSlider();
    }, 3000);

    window.addEventListener("resize", updateReviewSlider);
    updateReviewSlider();
}

/* =========================================================
   GALLERY FILTER
========================================================= */

const filterButtons = document.querySelectorAll(".kd-filter-btn");
const galleryItems = document.querySelectorAll(".kd-gallery-item");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const filterValue = button.getAttribute("data-filter");

        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        galleryItems.forEach(item => {
            const shouldShow = filterValue === "all" || item.classList.contains(filterValue);
            item.classList.toggle("kd-hide", !shouldShow);
        });
    });
});

/* =========================================================
   GALLERY IMAGE POPUP
========================================================= */

const popup = document.querySelector(".kd-popup");
const popupImage = document.getElementById("kd-popup-image");
const closePopup = document.querySelector(".kd-close-popup");

galleryItems.forEach(item => {
    item.addEventListener("click", () => {
        const image = item.querySelector("img");

        if (!popup || !popupImage || !image) return;

        popup.classList.add("active");
        popupImage.src = image.src;
        popupImage.alt = image.alt || "KD Tent House gallery image";
    });
});

closePopup?.addEventListener("click", () => {
    popup?.classList.remove("active");
});

popup?.addEventListener("click", event => {
    if (event.target === popup) {
        popup.classList.remove("active");
    }
});


/* =========================================================CONTACT FORM ========================================================= */

const contactForm = document.getElementById("contactForm");
const thankyouPopup = document.getElementById("thankyouPopup");
const thankyouClose = document.getElementById("thankyouClose");
const thankyouOk = document.getElementById("thankyouOk");

function closeThankyouPopup(){
    thankyouPopup?.classList.remove("active");
}

if (thankyouClose) {
    thankyouClose.addEventListener("click", closeThankyouPopup);
}

if (thankyouOk) {
    thankyouOk.addEventListener("click", closeThankyouPopup);
}

if (thankyouPopup) {
    thankyouPopup.addEventListener("click", event => {
        if (event.target === thankyouPopup) {
            closeThankyouPopup();
        }
    });
}

if (contactForm) {
    if (window.emailjs) {
        emailjs.init("YOUR_PUBLIC_KEY");
    }

    contactForm.addEventListener("submit", function(e){
        e.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const showPopup = () => {
            thankyouPopup?.classList.add("active");
            contactForm.reset();
        };

        if (!window.emailjs) {
            showPopup();
            return;
        }

        emailjs.sendForm(
            "YOUR_SERVICE_ID",
            "YOUR_TEMPLATE_ID",
            this
        )
        .then(() => {
            showPopup();
        })
        .catch(err => {
            console.log(err);
            showPopup();
        });
    });
}

/* =========================================================
   BLOG DETAIL POSTS DATA
========================================================= */

const blogPosts = {
    "venue-decor": {
        title: "How to Transform Any Venue with the Right Decor",
        category: "Wedding Decor",
        date: "April 21, 2026",
        read: "6 min read",
        image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1400&auto=format&fit=crop",
        alt: "Elegant wedding venue with floral decoration and candles",
        content: `
            <p>A beautiful event venue is rarely about one expensive item. It is about the way every detail works together: the entrance, guest movement, seating comfort, stage focus, lighting warmth and finishing decor. At KD Tent House, we start by reading the space first, then build a design that suits the family, guest count and celebration style.</p>
            <h2>Start With the Guest Journey</h2>
            <p>The first impression begins at the gate. A floral arch, clean pathway lighting, welcome signage and a well-dressed entry canopy make guests feel guided before they even reach the main setup. For weddings, this also creates a natural photo point without blocking the flow of people.</p>
            <h2>Use Tenting to Shape the Venue</h2>
            <p>Tents are not only for shade. They define zones for dining, ceremonies, lounges and stage viewing. A German hanger or royal canopy can make an open ground feel structured, while soft drapes can reduce the harshness of a simple banquet hall.</p>
            <blockquote>Good decor should make the venue feel intentional, comfortable and easy to enjoy.</blockquote>
            <h2>Balance Flowers, Fabric and Light</h2>
            <p>Heavy flowers look rich, but only when supported by the right fabric and lighting. Warm LED wash lights, chandeliers, fairy lights and focused stage lights bring depth to the decor after sunset. For daytime events, pastel flowers and breathable fabrics keep the space fresh and elegant.</p>
            <h2>Keep Comfort in the Plan</h2>
            <p>Realistic event design also includes walking space, fan or cooler placement, rain protection, buffet access and senior-friendly seating. The most memorable setups are the ones that look grand and still feel effortless for the guests.</p>
        `
    },
    "cocktail-party-decor": {
        title: "Creating Vibes: Decor Essentials for an Unforgettable Cocktail Party",
        category: "Standard, Wedding",
        date: "September 28, 2025",
        read: "5 min read",
        image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1400&auto=format&fit=crop",
        alt: "Outdoor cocktail party setup with lights and dining decor",
        content: `
            <p>A cocktail party works best when the space feels energetic without becoming crowded. Unlike a traditional ceremony, guests move constantly between music, drinks, snacks, photographs and conversation. The decor should support that movement.</p>
            <h2>Create Lounge Pockets</h2>
            <p>Mix high tables, sofa lounges and standing counters so guests can choose how they want to enjoy the evening. Small decor pieces, candles, planters and textured table linen make each pocket feel finished.</p>
            <h2>Make Lighting the Main Character</h2>
            <p>For cocktail nights, lighting creates the mood. Use warm string lights for softness, moving lights near the dance floor, and focused uplights around key decor elements. A dark corner can make even good decor disappear, so lighting must be planned before installation.</p>
            <blockquote>The best cocktail setup feels relaxed, social and ready for photographs from every angle.</blockquote>
            <h2>Keep the Bar and DJ Visible</h2>
            <p>The bar counter and DJ console are natural gathering points. Give them clean backdrops, floral highlights or branded panels so they look designed instead of temporary. Keep enough open floor area for dancing and guest movement.</p>
            <h2>Add Personal Details</h2>
            <p>Neon initials, couple photographs, custom menu boards and theme colors can make the party feel personal without overloading the space. The trick is to repeat a few strong elements, not decorate every inch.</p>
        `
    },
    "wedding-themes-2026": {
        title: "Best Wedding Themes for 2026",
        category: "Wedding",
        date: "May 12, 2026",
        read: "7 min read",
        image: "https://images.unsplash.com/photo-1519167758481-83f29c7c3f6d?q=80&w=1400&auto=format&fit=crop",
        alt: "Luxury wedding table decoration with chandeliers",
        content: `
            <p>Wedding themes in 2026 are moving toward warm, personal and highly usable spaces. Families want decor that looks premium in photos, but they also want guests to sit comfortably, move easily and enjoy every function without stress.</p>
            <h2>Royal Heritage</h2>
            <p>Deep maroons, antique golds, carved stage panels and traditional mandap details create a grand Indian wedding atmosphere. This theme works beautifully for evening pheras and large receptions.</p>
            <h2>Pastel Garden</h2>
            <p>Soft pink, ivory, lavender and fresh greens are ideal for day weddings. Pair floral mandaps with open seating, light fabric canopies and natural pathways for a destination-style feel.</p>
            <h2>Modern Minimal Luxury</h2>
            <p>Clean stage lines, premium chairs, limited color palettes and statement lighting make this theme perfect for receptions and engagements. It looks refined and avoids visual clutter.</p>
            <blockquote>A good theme should guide every choice, from the entrance gate to the last dining table.</blockquote>
            <h2>Himachali Touches</h2>
            <p>For local weddings, adding regional textiles, mountain-inspired florals or traditional welcome corners can make the event feel rooted and memorable. These details work best when blended with modern lighting and clean tent structures.</p>
        `
    },
    "stage-lighting-ideas": {
        title: "Stage Lighting Ideas for a Grand Celebration",
        category: "Lighting",
        date: "March 18, 2026",
        read: "4 min read",
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1400&auto=format&fit=crop",
        alt: "Event stage with professional lighting setup",
        content: `
            <p>The stage is usually the most photographed part of a wedding or event. Good lighting makes the couple, family and decor look clear and warm, while poor lighting can flatten even an expensive setup.</p>
            <h2>Use Warm Front Lighting</h2>
            <p>Front lights should be soft and flattering. Warm white tones are best for skin, outfits and floral decor. Avoid harsh colored light directly on faces during photography moments.</p>
            <h2>Add Depth With Backlights</h2>
            <p>Backlights and side lights separate people from the backdrop. This gives the stage a richer, more professional look in photos and videos.</p>
            <h2>Highlight Decor Features</h2>
            <p>Use focused lights for floral frames, name initials, cake tables, mandap pillars and entry arches. This helps guests notice the design work and creates strong camera angles.</p>
            <blockquote>Lighting is not decoration afterthought. It is what makes decoration visible.</blockquote>
            <h2>Plan for Power and Safety</h2>
            <p>Real event lighting also needs proper wiring, backup power and safe cable routes. KD Tent House plans these technical details early so the final setup feels clean and reliable.</p>
        `
    },
    "budget-wedding-decoration": {
        title: "Budget Wedding Decoration Tips That Still Look Premium",
        category: "Budget Decor",
        date: "February 9, 2026",
        read: "5 min read",
        image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1400&auto=format&fit=crop",
        alt: "Outdoor wedding decoration with simple elegant seating",
        content: `
            <p>Budget-friendly decoration does not mean plain decoration. It means spending carefully on the areas guests see and use the most. With the right planning, a simple venue can still look polished and festive.</p>
            <h2>Choose One Main Focus</h2>
            <p>Put the strongest decor on the stage or mandap, then keep the surrounding details clean. This creates a premium visual center without spreading the budget too thin.</p>
            <h2>Use Fabric Creatively</h2>
            <p>Drapes, ceiling fabric and table linen can change the mood of a venue quickly. They are often more economical than heavy floral installations and work well in both indoor and tent setups.</p>
            <h2>Invest in Lighting</h2>
            <p>Warm lighting makes simple decor look richer. Fairy lights, uplights and chandeliers can lift the entire space, especially for evening events.</p>
            <blockquote>Spend where photos happen, where guests enter and where people spend the most time.</blockquote>
            <h2>Reuse Decor Across Functions</h2>
            <p>Some floral stands, backdrop panels, seating pieces and lights can be reused across mehendi, engagement and reception functions with small styling changes. This keeps the look fresh while controlling cost.</p>
        `
    }
};

/* =========================================================
   BLOG DETAIL PAGE
========================================================= */

const blogDetailContent = document.getElementById("postContent");

if (blogDetailContent) {
    const params = new URLSearchParams(window.location.search);
    const currentSlug = blogPosts[params.get("post")] ? params.get("post") : "venue-decor";
    const currentPost = blogPosts[currentSlug];
    const postEntries = Object.entries(blogPosts);

    document.title = `KD Tent House | ${currentPost.title}`;
    document.getElementById("postCategory").textContent = currentPost.category;
    document.getElementById("postTitle").textContent = currentPost.title;
    document.getElementById("postDate").textContent = currentPost.date;
    document.getElementById("postRead").textContent = currentPost.read;
    document.getElementById("postImage").src = currentPost.image;
    document.getElementById("postImage").alt = currentPost.alt;
    document.getElementById("detailHero").style.backgroundImage = `url('${currentPost.image}')`;
    blogDetailContent.innerHTML = currentPost.content;

    const pageUrl = encodeURIComponent(window.location.href);
    const pageTitle = encodeURIComponent(currentPost.title);

    document.getElementById("shareFacebook").href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
    document.getElementById("shareWhatsapp").href = `https://wa.me/?text=${pageTitle}%20${pageUrl}`;
    document.getElementById("shareTwitter").href = `https://twitter.com/intent/tweet?text=${pageTitle}&url=${pageUrl}`;
    document.getElementById("shareLinkedin").href = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;

    const recentPosts = document.getElementById("recentPosts");
    const relatedPosts = document.getElementById("relatedPosts");
    const blogSearch = document.getElementById("blogSearch");

    function renderPostLinks(filter = "") {
        const filtered = postEntries.filter(([, post]) =>
            post.title.toLowerCase().includes(filter.toLowerCase()) ||
            post.category.toLowerCase().includes(filter.toLowerCase())
        );

        recentPosts.innerHTML = filtered.map(([slug, post]) =>
            `<li><a href="blog-detail.html?post=${slug}">${post.title}</a></li>`
        ).join("") || "<li>No matching posts found</li>";
    }

    renderPostLinks();

    blogSearch.addEventListener("input", event => {
        renderPostLinks(event.target.value);
    });

    relatedPosts.innerHTML = postEntries
        .filter(([slug]) => slug !== currentSlug)
        .slice(0, 3)
        .map(([slug, post]) => `
            <article class="blog-card">
                <div class="img-container">
                    <a href="blog-detail.html?post=${slug}" aria-label="Read ${post.title}">
                        <img src="${post.image}" alt="${post.alt}">
                    </a>
                </div>
                <div class="card-content">
                    <span class="category">${post.category}</span>
                    <h3 class="post-title"><a href="blog-detail.html?post=${slug}">${post.title}</a></h3>
                    <div class="post-meta"><span>${post.date}</span></div>
                </div>
            </article>
        `).join("");
}


// before after slider
const slider = document.getElementById("slider");
const afterLayer = document.getElementById("afterLayer");
const divider = document.getElementById("divider");
const handle = document.getElementById("handle");

const beforeLabel = document.getElementById("beforeLabel");
const afterLabel = document.getElementById("afterLabel");

let dragging = false;

function updateSlider(clientX){
    if (!slider || !afterLayer || !divider || !handle) return;

    const rect = slider.getBoundingClientRect();

    let position =
    ((clientX - rect.left) / rect.width) * 100;

    position = Math.max(0, Math.min(100, position));

    afterLayer.style.clipPath =
    `inset(0 ${100-position}% 0 0)`;

    divider.style.left = position + "%";
    handle.style.left = position + "%";

    if(position < 15){
        beforeLabel?.classList.add("hide");
    }else{
        beforeLabel?.classList.remove("hide");
    }

    if(position > 85){
        afterLabel?.classList.add("hide");
    }else{
        afterLabel?.classList.remove("hide");
    }
}

/* Mouse */

slider?.addEventListener("mousedown", () => {
    dragging = true;
});

window.addEventListener("mouseup", () => {
    dragging = false;
});

window.addEventListener("mousemove", (e) => {

    if(!dragging) return;

    updateSlider(e.clientX);
});

/* Touch */

slider?.addEventListener("touchstart", (e) => {
    updateSlider(e.touches[0].clientX);
});

slider?.addEventListener("touchmove", (e) => {
    updateSlider(e.touches[0].clientX);
});

/* Click */

slider?.addEventListener("click", (e) => {
    updateSlider(e.clientX);
});

/* Initial Position */

window.addEventListener("load", () => {
    if (!slider) return;

    const rect = slider.getBoundingClientRect();

    updateSlider(
        rect.left + rect.width / 2
    );

});

// faq script
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const answer = item.querySelector(".faq-answer");

    if(item.classList.contains("active")){
        answer.style.maxHeight = answer.scrollHeight + "px";
    }

    item.querySelector(".faq-question").addEventListener("click", () => {

        faqItems.forEach(faq => {

            const faqAnswer = faq.querySelector(".faq-answer");
            const faqIcon = faq.querySelector(".faq-icon");

            if(faq !== item){
                faq.classList.remove("active");
                faqAnswer.style.maxHeight = null;
                faqIcon.textContent = "+";
            }

        });

        const icon = item.querySelector(".faq-icon");

        item.classList.toggle("active");

        if(item.classList.contains("active")){
            answer.style.maxHeight = answer.scrollHeight + "px";
            icon.textContent = "−";
        }
        else{
            answer.style.maxHeight = null;
            icon.textContent = "+";
        }

    });

});