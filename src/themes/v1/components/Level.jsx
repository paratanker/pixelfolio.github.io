export default function Level({ id, className = '', contentClassName = '', walkerSrc, decorations, children }) {
  return (
    <section className={`relative overflow-hidden min-h-screen flex flex-col pt-[calc(5rem+5px)] ${className}`} id={id}>
      <div className="level__bg-dots absolute inset-0 pointer-events-none" aria-hidden="true" />
      {decorations}
      <div className="level__ground absolute left-0 right-0 bottom-0 h-4 border-t-[3px] border-white/[0.18]" aria-hidden="true" />
      {walkerSrc && (
        <img
          className="pixel-img absolute bottom-[14px] right-[22px] z-[2] w-[76px] h-auto drop-shadow-[0_4px_7px_rgba(0,0,0,0.5)] max-[700px]:w-[54px] max-[700px]:right-3 max-[700px]:bottom-3"
          src={walkerSrc}
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
      )}
      <div className={`max-w-[1180px] mx-auto w-full px-[clamp(1.25rem,4vw,3rem)] relative z-[2] flex-1 pb-12 ${contentClassName}`}>
        {children}
      </div>
    </section>
  )
}
