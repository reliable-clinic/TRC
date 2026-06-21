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
                                      src={`${import.meta.env.BASE_URL}assets/treatment.mp4`} 
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
            opacity: 0.55,
            filter: 'contrast(1.05) brightness(0.9)',
      },
      overlay: {
                      position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to right, rgba(7, 7, 8, 0.6) 10%, rgba(7, 7, 8, 0.2) 50%, rgba(7, 7, 8, 0.65) 100%), linear-gradient(to bottom, rgba(7, 7, 8, 0.3) 0%, rgba(7, 7, 8, 0) 60%, rgba(7, 7, 8, 0.7) 100%)',
      }
  }
  export default VideoBackground
