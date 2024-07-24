import './banner.css'

const LandingBanner = () => {
  return (
    <section className="landing-banner-section">
        <div className="landing-banner-section-text">
            <h1 className="landing-banner-section-super-text">
            start your journey with us
            </h1>
            <p className="landing-banner-section-sub-text">
            Become part of community and socialize with millions of users, share the journey of your pregnancy and guide others as they embark on theirs.
            </p>
        </div>
        <div className="landing-banner-section-image-container">
            <img src="../../images/landing-banner.png" alt="" />
        </div>
      
    </section>
  )
}

export default LandingBanner
