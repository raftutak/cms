import { Carousel as CarouselBootstrap } from "react-bootstrap";

import styles from "./Carousel.module.css";

const defaultCarouselItem = (
  <svg
    className="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
    width="800"
    height="400"
    style={{ backgroundColor: "grey" }}
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Placeholder: First slide"
    preserveAspectRatio="xMidYMid slice"
    focusable="false"
  />
);

export const Carousel = (props) => {
  const { items: slides } = props;

  console.log(props);

  return (
    <CarouselBootstrap>
      {slides?.map((slide, index) => (
        <CarouselBootstrap.Item key={index}>
          {slide.imageUrl ? (
            <img
              className="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
              style={{ width: "800px", height: "400px" }}
              src={slide.imageUrl}
              alt=""
            />
          ) : (
            defaultCarouselItem
          )}
          {slide.imageUrl ? (
            <CarouselBootstrap.Caption>
              <h3>{slide.header}</h3>
              <p>{slide.paragraph}</p>
            </CarouselBootstrap.Caption>
          ) : (
            <CarouselBootstrap.Caption className={styles.noImage}>
              <h1>{slide.header}</h1>
              <p>{slide.paragraph}</p>
            </CarouselBootstrap.Caption>
          )}
        </CarouselBootstrap.Item>
      ))}
    </CarouselBootstrap>
  );
};
