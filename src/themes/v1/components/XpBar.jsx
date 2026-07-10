import { useScrollProgress } from '../hooks/useScrollProgress'

export default function XpBar() {
  const { fillRef, hgTopRef, hgBottomRef } = useScrollProgress()

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-1.5 bg-black/25 z-50" aria-hidden="true">
        <div className="h-full w-0 bg-gradient-to-r from-torch-dk to-torch rounded-r-[4px]" ref={fillRef} />
      </div>
      <div className="fixed top-[74px] right-[calc(clamp(1.25rem,4vw,3rem)-0.4rem)] z-[19] flex flex-col items-center pointer-events-none max-[700px]:hidden" aria-hidden="true">
        <div className="hg-bulb--top w-5 h-[15px] relative overflow-hidden bg-black/30 border-2 border-b-0 border-gold/55">
          <div className="absolute left-0 right-0 bg-torch top-0 h-full" ref={hgTopRef} />
        </div>
        <div className="w-[5px] h-[3px] bg-gold/60" />
        <div className="hg-bulb--bottom w-5 h-[15px] relative overflow-hidden bg-black/30 border-2 border-t-0 border-gold/55">
          <div className="absolute left-0 right-0 bg-torch bottom-0 h-0" ref={hgBottomRef} />
        </div>
      </div>
    </>
  )
}
