"use client";
import React, { useEffect, useState } from "react";
import Header from "./Components/Header/Header";
import styled from "styled-components";
import SectionLayout from "./Components/SectionLayout";
import Card from "./Components/Card";
import { cards } from "./utils/cards";
import Fullpage from "./Components/Fullpage";
import TextSection from "./TextSection";
import Footer from "./Components/Footer";
import AlumniPage from "./Components/AlumniData";
import HorizontalWrapper from "./Components/HorizontalWrapper";
import { motion, useScroll, useTransform } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"
import TeamPage from "./Components/TeamData";


const AnimatedCard = () =>  {
  return(
    <>
    <MainStyled>
    <SectionLayout>
          
            <HorizontalWrapper height="40rem" direction={-1400}>
              <div className="cards">
                {cards.map((card, index) => {
                  return (
                    <Card
                      key={index}
                      title={card.title}
                      description={card.description}
                      image={card.image}
                    />
                  );
                })}
              </div>
            </HorizontalWrapper>
          
        </SectionLayout>

        <Fullpage />

        <SectionLayout>
          <HorizontalWrapper height="40rem" direction={1400}>
            <div className="cards" style={{ right: 0 }}>
              {cards.map((card, index) => {
                return (
                  <Card
                    key={index}
                    title={card.title}
                    description={card.description}
                    image={card.image}
                  />
                );
              })}
            </div>
          </HorizontalWrapper>
        </SectionLayout>
        </MainStyled>
        </>
  )

}


const Carousel = () => {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnFocus: true,
    autoplay: true,
    autoplaySpeed: 1400
  };
  return (
    
    <div className="carousel">
      <Slider {...settings}>
      {cards.map((card, index) => {
                return (
                  <div className="carousel-cards">
                      <Card
                      key={index}
                      title={card.title}
                      description={card.description}
                      image={card.image}
                    />
                  </div>
                );
              })}
    </Slider>
    </div>
    
  );
}

export default function Home() {
  const video = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: video,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.65, 1], [0.9, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.6, 0.8, 0.9],
    [1, 0.8, 0.8, 0]
  );

  const [showCards, setshowCards] = useState(true);

  
  useEffect(() => {
    const handleResize = () => {
      setshowCards(window.innerWidth > 768);
    };

   
    handleResize();
    window.addEventListener("resize", handleResize);

    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
    
  }, []);

  return (
    <>
      <Header />
      <MainStyled>
        {showCards ? <AnimatedCard />  :  <Carousel /> } 
      
        <SectionLayout>
          <div id="events">
            <TextSection />
          </div>
        </SectionLayout>

        <div className="yt-video">
          <motion.div
            className="video"
            ref={video}
            style={{
              opacity,
              scale,
            }}
          >
            <iframe
              src="https://www.youtube.com/UNESQUO"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </motion.div>
        </div>

        <SectionLayout>
          <TeamPage />
          <AlumniPage />
        </SectionLayout>
     
        <Footer />
      </MainStyled>
    </>
  );
}

const MainStyled = styled.main`
  display : block;
  min-height: 100vh;
  width: 100%;

  .cards {
    position: absolute;
    display: grid;
    grid-template-columns: repeat(5, 30rem);
    gap: 4rem;
  }

  .video {
    padding: 2rem;
    background-color: #161616;
    border-radius: 1rem;
    iframe {
      border: none;
      width: 100%;
      height: 52rem;
    }
  }
  .alumni-content{
    padding: 10rem 5rem;
    z-index: 1;
  }
  @media screen and (max-width: 768px) {
    
    .yt-video{
      margin: auto;
      z-index: 100;
      padding: 0 1rem;
    }
    .video{
      margin-top:2rem;
      iframe {
        border: none;
        width: 100%;
        height: 15rem;
      }
    }
    .carousel{
      margin:0 2.5rem !important;
    }
    
    .carousel-cards{
      padding: 0 1rem !important
    }

    .normal-cards{
      visibility: hidden;
    }
    .video{
      transform: none !important;
      margin-bottom: 5rem;
      
    }
    
  }
`;
