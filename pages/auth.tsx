import { ReactElement, useState } from 'react'
import SigninForm from '../components/auth/signin-form'
import SignupForm from '../components/auth/signup-form'
import LeftOverlayContent from '../components/auth/left-overlay-content'
import RightOverlayContent from '../components/auth/right-overlay-content'
import Footer from '../components/Footer'
import Toggle from '../components/Toggle'

export default function LoginPage(): ReactElement {
  const [isAnimated, setIsAnimated] = useState(false)
  const overlayBg =
    'bg-gradient-to-r from-blue-800 via-purple-800 to-indigo-800'

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="flex-1 lg:w-2/3 xl:w-2/5 w-full px-7">
        <div>
          <p className="text-3xl lg:text-4xl text-white font-bold tracking-widest pt-10 sm:pt-16 lg:pt-24 lg:pt-20 pb-6 lg:pb-10">
            TODO
            <Toggle />
          </p>
          <div className="min-h-screen flex flex-col items-center">
            <div className="flex flex-col items-center justify-center h-screen w-screen bg-purple-200">
              <div className="h-4/5 w-4/5 bg-white relative overflow-hidden rounded-lg">
                <div
                  id="signin"
                  className={`bg-white absolute top-0 left-0 h-full w-1/2 flex justify-center items-center transition-all duration-700 ease-in-out z-20 ${isAnimated ? 'translate-x-full opacity-0' : ''
                    }`}
                >
                  <SigninForm />
                </div>
                <div
                  id="signup"
                  className={`absolute top-0 left-0 h-full w-1/2 flex justify-center items-center transition-all duration-700 ease-in-out ${isAnimated
                    ? 'translate-x-full opacity-100 z-50 animate-show'
                    : 'opacity-0 z-10'
                    }`}
                >
                  <div className="h-full w-full flex justify-center items-center">
                    <SignupForm
                      isAnimated={isAnimated}
                      setIsAnimated={setIsAnimated}
                    />
                  </div>
                </div>
                <div
                  id="overlay-container"
                  className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition transition-transform duration-700 ease-in-out z-100 ${isAnimated ? '-translate-x-full' : ''
                    }`}
                >
                  <div
                    id="overlay"
                    className={`${overlayBg} relative -left-full h-full w-[200%] transform transition transition-transform duration-700 ease-in-out ${isAnimated ? 'translate-x-1/2' : 'translate-x-0'
                      }`}
                  >
                    <div
                      id="overlay-left"
                      className={`w-1/2 h-full absolute flex justify-center items-center top-0 transform -translate-x-[20%] transition transition-transform duration-700 ease-in-out ${isAnimated ? 'translate-x-0' : '-translate-x-[20%]'
                        }`}
                    >
                      <LeftOverlayContent
                        isAnimated={isAnimated}
                        setIsAnimated={setIsAnimated}
                      />
                    </div>
                    <div
                      id="overlay-right"
                      className={`w-1/2 h-full absolute flex justify-center items-center top-0 right-0 transform transition transition-transform duration-700 ease-in-out ${isAnimated ? 'translate-x-[20%]' : 'translate-x-0'
                        }`}
                    >
                      <RightOverlayContent
                        isAnimated={isAnimated}
                        setIsAnimated={setIsAnimated}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}