import { useLoaderData } from "react-router-dom";

import { Carousel } from "../../components/client/Carousel/Carousel";
import { CardsContainer } from "../../components/client/CardsContainer/CardsContainer";
import { ColumnsContainer } from "../../components/client/ColumnsContainer/ColumnsContainer";

const componentMapping = {
  carousel: Carousel,
  columns: ColumnsContainer,
  cards: CardsContainer,
};

export const Page = () => {
  const { data } = useLoaderData();
  const pageContent = JSON.parse(data.page.content);

  return (
    <>
      {pageContent.map((item, index) => {
        const Component = componentMapping[item.config.type];
        return Component ? <Component key={index} {...item.config} /> : null;
      })}
    </>
  );
};
