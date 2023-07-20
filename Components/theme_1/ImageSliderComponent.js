import React from "react";
import '../../node_modules/react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';

const ImageSliderComponent = ({data}) => {
  const prductIamges=[]
  prductIamges.push({original:data?.main_image?.name,thumbnail: data?.main_image?.name})
  if(data?.other_images?.length>0){
    data.other_images.map(item=>{
      prductIamges.push({original:item.name,thumbnail: item.name})
    })
  }

  return (
    <div>
      <div className='wrapper'>
        <ImageGallery items={prductIamges} />
      </div>
    </div>
  );
};

export default ImageSliderComponent;
