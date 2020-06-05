import { Card, Icon } from 'antd';
import { ButtonBack, ButtonNext, CarouselProvider, Slide, Slider } from 'pure-react-carousel';
import React from 'react';

const CARD_WIDTH = 400;
const CARD_HEIGHT = 450;
const PRODUCT_NOT_FOUND = undefined;

const orderProducts = (templates) => {
  let INDEX_OF_PRODUCT_NOT_FOUND = templates.findIndex((element) => element.subtitle === PRODUCT_NOT_FOUND);
  let sortedTemplates = [
    ...templates.slice(0, INDEX_OF_PRODUCT_NOT_FOUND),
    ...templates.slice(INDEX_OF_PRODUCT_NOT_FOUND + 1),
    templates[INDEX_OF_PRODUCT_NOT_FOUND],
  ];
  return sortedTemplates;
};

const Template = (props) => {
  const { templates } = props;
  const sortedTemplates = orderProducts(templates);
  const settings = {
    naturalSlideWidth: CARD_WIDTH,
    naturalSlideHeight: CARD_HEIGHT,
    totalSlides: templates.length,
  };
  return (
    <CarouselProvider {...settings}>
      <div className='d-flex justify-content-between align-items-center'>
        <ButtonBack style={{ background: 'transparent', border: 'none' }}>
          <Icon type='left' />
        </ButtonBack>
        <Slider style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}>
          {sortedTemplates.map((element, index) => (
            <Slide key={index}>
              <Card key={index} style={{ height: CARD_HEIGHT }}>
                <img alt={element.title} className='mw-100 mh-100' src={element.image_url} />
                <div>
                  <strong>{element.title}</strong>
                </div>
                <div>
                  <em>{element.subtitle}</em>
                </div>
                <div>
                  <a className='item-url' href={element.item_url} target='_blank' rel='noopener noreferrer'>
                    phongvu.vn
                  </a>
                </div>
              </Card>
            </Slide>
          ))}
        </Slider>
        <ButtonNext style={{ background: 'transparent', border: 'none' }}>
          <Icon type='right' />
        </ButtonNext>
      </div>
    </CarouselProvider>
  );
};

export default Template;
