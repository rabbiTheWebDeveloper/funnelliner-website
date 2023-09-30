import React, { useEffect, useState } from "react";
import '../../node_modules/react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';

const ImageSliderComponent = ({data}) => {
  const [sliderImages, setSliderImages] = useState([])
  
  const galleryOptions = {
    showNav: false, // Hide navigation arrows
    autoPlay: true,
    showPlayButton: false
  };

  useEffect(() => {
    const prductIamges=[]
    prductIamges.push({original:data?.main_image,thumbnail: data?.main_image})
    if(data?.other_images?.length>0){
      data.other_images.map(item=>{
        prductIamges.push({original:item,thumbnail: item})
      })
    }
    if(data?.variations.length){
      data?.variations.forEach(item=>{
        if(item?.media !== null){
          prductIamges.push({original:item?.media ,thumbnail: item?.media})
        }
      })
    }
    setSliderImages(prductIamges)
  }, [data])

  return (
    <div>
      <div className='wrapper'>
        <ImageGallery items={sliderImages}  {...galleryOptions} />
      </div>
    </div>
  );
};

export default ImageSliderComponent;
