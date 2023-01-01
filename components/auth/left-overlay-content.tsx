import { FC } from 'react'

const LeftOverlayContent: FC<{
  isAnimated: boolean;
  setIsAnimated: any;
}> = ({ isAnimated, setIsAnimated }) => {
  return (
    <div className="p-8 text-center">
      <h1 className="text-[12px] md:text-6xl font-bold text-white mb-4">
        Already have an account ?
      </h1>

      <h5 className="text-[10px] md:text-xl text-white">Sign in with your email & password</h5>
      <div className="mt-16">
        <button
          className="py-3 px-6 bg-transparent rounded-full text-center text-white text-[8px] md:text-xl font-bold uppercase ring-2 ring-white active:scale-110 transition-transform ease-in"
          onClick={(e) => {
            setIsAnimated(!isAnimated)
          }}
        >
          Sign In
        </button>
      </div>
    </div>
  )
}

export default LeftOverlayContent
