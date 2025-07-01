import { useGSAP } from "@gsap/react";
import { useState} from "react";
import "remixicon/fonts/remixicon.css";
import gsap from "gsap";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { useEffect, useRef } from "react";

const App = () => {
  const [showContent, setShowContent] = useState(false);

  const lenisRef = useRef();

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);
  
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "Power4.easeInOut",
      transformorigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  });

  useGSAP(() => {
    if (!showContent) return;

    gsap.to(".main", {
      scale: 1,
      duration: 2,
      rotate: 0,
      ease: "Expo.easeInOut",
      delay: -1,
    });

    gsap.to(".sky", {
      scale: 1.2,
      duration: 2,
      rotate: 0,
      ease: "Expo.easeInOut",
      delay: "-.8",
    });

    gsap.to(".bg", {
      scale: 1.1,
      duration: 2,
      rotate: 0,
      ease: "Expo.easeInOut",
      delay: "-.8",
    });

    gsap.to(".girl", {
      scale: ".8",
      x: "-50%",
      duration: 2,
      rotate: 0,
      ease: "Expo.easeInOut",
      delay: "-.8",
    });

    gsap.to(".text", {
      scale: 1,
      duration: 2,
      rotate: 0,
      ease: "Expo.easeInOut",
      delay: "-.8",
    });
    const main = document.querySelector(".main");
    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      const yMove = (e.clientY / window.innerHeight - 0.5) * 40;
      gsap.to(".imagesdiv .text", {
        x: `${10 + xMove * 0.5}%`,
        y: `${10 + yMove * 0.5}%`,
      });
      gsap.to(".imagesdiv .sky", {
        x: xMove,
        y: yMove,
      });
      gsap.to(".imagesdiv .bg", {
        x: xMove * 1.7,
        y: yMove * 1.7,
      });
    });
  }, [showContent]);


  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg2.png"
            className="oject-cover"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
      {showContent && (
        <div className="main w-full rotate-[-10deg] scale-[1.7]">
          <div className="landing overflow-x-hiDden relative w-full h-screen">
            <div className="navbar absolute top-0 left-0 w-full z-[10] py-5 px-5 ">
              <div className="logo flex gap-7">
                <div className="lines flex flex-col gap-[5px]">
                  <div className="line w-15 h-1 bg-white"></div>
                  <div className="line w-8 h-1 bg-white"></div>
                  <div className="line w-5 h-1 bg-white"></div>
                </div>
                <h3 className="text-4xl -mt-[8px] leading-none text-white">
                  Rockstar
                </h3>
              </div>
            </div>

            <div className="imagesdiv overflow-hidden relative w-full h-screen">
              <img
                src="./sky.png"
                alt=""
                className="sky absolute w-full h-full object-cover top-10 rotate-[-20deg] scale-[1.5]"
              />
              <img
                src="./bg.png"
                alt=""
                className="bg absolute w-full h-full object-cover scale-[1.8] rotate-[-3deg] "
              />
              <div className="text text-white flex flex-col gap-3 absolute top-10 left-1/2 -translate-x-1/2 scale-[1.4] rotate-[-10deg]">
                <h1 className="text-[9rem] -ml-20 leading-none">grand</h1>
                <h1 className="text-[9rem] ml-20 leading-none">theft</h1>
                <h1 className="text-[9rem] -ml-20 leading-none">auto</h1>
              </div>
              <img
                src="./girlbg.png"
                alt=""
                className="girl absolute -bottom-[65%] left-1/2 -translate-x-1/2 scale-[0.8] scale-[2] rotate-[-10deg]"
              />
            </div>
            <div className="btmbar text-white text-xl absolute bottom-0 left-0 w-full py-15 px-5 bg-gradient-to-t from-black to-transparent">
              <div className="flex gap-4 items-center">
                <i className="ri-arrow-down-line text-4xl"></i>
                <h3>Scroll down</h3>
              </div>
              <img
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  h-[50px]"
                srcSet="./ps5.png"
                alt=""
              />
            </div>
          </div>
          <div className="w-full h-screen flex items-center justify-center bg-black">
            <div className="cntnr flex justify-center text-white w-full h-[90%] px-15">
              <div className="limg relative w-1/2 h-full">
                <img
                  className="absolute top-[-100px] scale-[1] left-1/2 -translate-x-1/2 -transalte-y-1/2"
                  src="./imag.png"
                  alt=""
                />
              </div>
              <div className="rg w-[50%]">
                <h1 className="text-8xl">Still running</h1>
                <h1 className="text-8xl">Not hunting</h1>
                <p className="mt-10 font-[poppins] text-l">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Labore illum ducimus dignissimos illo incidunt officiis ipsa
                  architecto vero! Iusto esse modi fugit veritatis recusandae
                  ipsam tenetur odio laudantium illo in.
                </p>
                <p className="mt-3 font-[poppins] text-l ">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dolorem obcaecati assumenda illum distinctio recusandae.
                  Accusantium ullam vel nam beatae nisi!
                </p>
                <p className="mt-5 font-[poppins] text-l ">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dolorem obcaecati assumenda illum distinctio recusandae.
                  Accusantium ullam vel nam beatae nisi!
                </p>
                <button className="bg-yellow-500 mt-7 px-5 py-5 text-3xl text-black cursor-pointer">
                  Download Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </ReactLenis>
  );
};

export default App;
