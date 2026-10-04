# Thinking Machine background

The supplied Flow video is used as a fixed, decorative background across the page. The existing site copy, navigation, projects and CV are preserved.

- Source: 6,592,415 bytes; 1920 × 1080; 8 seconds; 24 fps; H.264 + AAC.
- `thinking-machine.mp4`: 1,607,771 bytes (75.6% smaller); 1600 × 900; 7.5 seconds; 24 fps; H.264 High / yuv420p; CRF 25, slow preset; no audio; fast-start metadata.
- `thinking-machine-poster.webp`: 190,650 bytes; first frame of the optimized loop; quality 85.
- The last 0.5 seconds blend into the first 0.5 seconds; playback begins at source time 0.5 seconds. This joins the motion without a runtime JavaScript crossfade.

The poster loads eagerly with high fetch priority. Video uses `preload="none"` and receives its source after the page load during idle time. Mobile widths up to 760 px, reduced-motion and data-saver preferences keep the poster and do not attach a video source. Preference changes unload the video. Background tabs pause playback; scrolling within the page does not. Missing media retains the navy background. Without JavaScript, the poster and all original links remain usable.

The fixed overlay has the same brightness across sections. Local translucent text surfaces, brighter paragraph color and medium font weight improve reading contrast without switching off the figure's lights while scrolling. Video and poster ignore pointer input and are excluded from the accessibility tree.
