// Video Background Controls
class VideoController {
    constructor() {
        this.video = document.getElementById('hero-video');
        this.playPauseBtn = document.getElementById('play-pause-btn');
        this.muteBtn = document.getElementById('mute-btn');
        this.controls = document.querySelector('.video-controls');
        this.heroSection = document.querySelector('.hero');
        this.wasPlayingBeforeScroll = false;
        this.isScrollPaused = false;
        
        this.init();
    }
    
    init() {
        if (!this.video) return;
        
        // Set initial volume (muted for autoplay compliance)
        this.video.volume = 0.5;
        
        // Add event listeners
        this.addEventListeners();
        
        // Auto-hide controls
        this.setupAutoHide();
        
        // Handle video load errors
        this.handleVideoErrors();
        
        // Handle reduced motion preference
        this.handleReducedMotion();
    }
    
    addEventListeners() {
        // Play/Pause functionality
        this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        
        // Mute/Unmute functionality
        this.muteBtn.addEventListener('click', () => this.toggleMute());
        
        // Video events
        this.video.addEventListener('play', () => this.updatePlayButton(true));
        this.video.addEventListener('pause', () => this.updatePlayButton(false));
        this.video.addEventListener('volumechange', () => this.updateMuteButton());
        
        // Keyboard controls
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Click on video to toggle play/pause
        this.video.addEventListener('click', () => this.togglePlayPause());
        
        // Handle visibility change (pause when tab is not visible)
        document.addEventListener('visibilitychange', () => this.handleVisibilityChange());
        
        // Handle scroll-based video control
        this.setupScrollControl();
    }
    
    togglePlayPause() {
        if (this.video.paused) {
            this.video.play().catch(error => {
                console.log('Video play failed:', error);
            });
        } else {
            this.video.pause();
        }
    }
    
    updatePlayButton(isPlaying) {
        if (isPlaying) {
            this.playPauseBtn.classList.add('playing');
            this.playPauseBtn.setAttribute('aria-label', 'Pause background video');
        } else {
            this.playPauseBtn.classList.remove('playing');
            this.playPauseBtn.setAttribute('aria-label', 'Play background video');
        }
    }
    
    toggleMute() {
        this.video.muted = !this.video.muted;
    }
    
    updateMuteButton() {
        if (this.video.muted || this.video.volume === 0) {
            this.muteBtn.classList.add('muted');
            this.muteBtn.setAttribute('aria-label', 'Unmute background video');
        } else {
            this.muteBtn.classList.remove('muted');
            this.muteBtn.setAttribute('aria-label', 'Mute background video');
        }
    }
    
    // Volume control removed - keeping only mute/unmute functionality
    
    handleKeyboard(e) {
        // Only handle keyboard events when video is in focus or controls are visible
        if (!this.video || document.activeElement.tagName === 'INPUT') return;
        
        switch(e.code) {
            case 'Space':
                e.preventDefault();
                this.togglePlayPause();
                break;
            case 'KeyM':
                e.preventDefault();
                this.toggleMute();
                break;
        }
    }
    
    handleVisibilityChange() {
        // Pause video when tab becomes hidden to save resources
        if (document.hidden && !this.video.paused) {
            this.video.pause();
        }
    }
    
    handleReducedMotion() {
        // Respect user's motion preferences
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            this.video.pause();
            this.video.removeAttribute('autoplay');
        }
    }
    
    setupAutoHide() {
        let hideTimeout;
        const heroSection = document.querySelector('.hero');
        
        const showControls = () => {
            this.controls.style.opacity = '1';
            clearTimeout(hideTimeout);
            hideTimeout = setTimeout(() => {
                this.controls.style.opacity = '0.7';
            }, 3000);
        };
        
        const hideControls = () => {
            clearTimeout(hideTimeout);
            this.controls.style.opacity = '0.7';
        };
        
        // Show controls on mouse movement
        heroSection.addEventListener('mousemove', showControls);
        heroSection.addEventListener('mouseenter', showControls);
        heroSection.addEventListener('mouseleave', hideControls);
        
        // Show controls on touch
        heroSection.addEventListener('touchstart', showControls);
        
        // Keep controls visible when hovering over them
        this.controls.addEventListener('mouseenter', () => {
            clearTimeout(hideTimeout);
            this.controls.style.opacity = '1';
        });
        
        this.controls.addEventListener('mouseleave', () => {
            hideTimeout = setTimeout(() => {
                this.controls.style.opacity = '0.7';
            }, 1000);
        });
        
        // Initial hide
        hideControls();
    }
    
    setupScrollControl() {
        if (!this.heroSection) return;
        
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const heroRect = this.heroSection.getBoundingClientRect();
                    const heroBottom = heroRect.bottom;
                    const scrollThreshold = window.innerHeight * 0.3; // 30% of viewport
                    
                    // Check if user has scrolled past the hero section
                    if (heroBottom < scrollThreshold) {
                        // User scrolled away from hero - pause video
                        if (!this.video.paused && !this.isScrollPaused) {
                            this.wasPlayingBeforeScroll = true;
                            this.isScrollPaused = true;
                            this.video.pause();
                        }
                    } else {
                        // User is back in hero section - resume if it was playing
                        if (this.isScrollPaused && this.wasPlayingBeforeScroll) {
                            this.isScrollPaused = false;
                            this.wasPlayingBeforeScroll = false;
                            this.video.play().catch(error => {
                                console.log('Video resume failed:', error);
                            });
                        }
                    }
                    
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        // Add scroll listener with throttling
        window.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    handleVideoErrors() {
        this.video.addEventListener('error', (e) => {
            console.log('Video error:', e);
            // Hide video controls if video fails to load
            this.controls.style.display = 'none';
            // Show fallback background
            const fallback = document.querySelector('.video-fallback');
            if (fallback) {
                fallback.style.display = 'block';
            }
        });
        
        this.video.addEventListener('loadstart', () => {
            // Show controls when video starts loading
            this.controls.style.display = 'flex';
        });
    }
}

// Initialize video controller when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VideoController();
});

// Handle reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const video = document.getElementById('hero-video');
    if (video) {
        video.pause();
        video.removeAttribute('autoplay');
    }
}