import React from 'react'

export const VideoBackground: React.FC = () => {
  return (
    <div style={styles.container}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={styles.video}
      >
        <source 
          src="https://assets.mixkit.co/videos/preview/mixkit-woman-receiving-facial-treatment-at-a-beauty-salon-40242-large.mp4" 
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </video>

      {/* Dark luxury overlay gradient for text readability and cinematic look */}
      <div style={styles.overlay}></div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
  },
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: 0.22, // Muted opacity for premium cinematic look
    filter: 'contrast(1.1) brightness(0.7) grayscale(0.25)', // Clinical tech styling
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    // Gold/dark gradient matching TRC guidelines
    background: 'linear-gradient(to right, rgba(7, 7, 8, 0.9) 20%, rgba(7, 7, 8, 0.6) 60%, rgba(7, 7, 8, 0.95) 100%), linear-gradient(to bottom, rgba(7, 7, 8, 0.4) 0%, rgba(7, 7, 8, 0) 50%, rgba(7, 7, 8, 0.9) 100%)',
  }
}
export default VideoBackground
