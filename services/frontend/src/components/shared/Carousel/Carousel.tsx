import CarouselCard from '@/components/shared/CarouselCard/CarouselCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

export default function Carousel({ data }) {
  return (
    <div>
      {data.length > 0 && (
        <>
          <h4>Results</h4>
          <Carousel responsive={responsive}>
            {data.map(item => (
              <div key={item.uuid}>
                <CarouselCard
                  imgUrl={food.imgUrl}
                  title={food.name}
                  emphasis={`${food.nutrients[0].enerc_Kcal} Kcal`}
                >
                  <p>{food.nutrients[0].procnt_g}</p>
                  <p>{food.nutrients[0].fat_g}</p>
                  <p>{food.nutrients[0].chocdf_g}</p>
                </CarouselCard>
              </div>
            ))}
          </Carousel>
        </>
      )}
    </div>
  );
}
