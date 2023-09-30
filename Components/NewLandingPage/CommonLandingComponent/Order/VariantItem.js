import React from 'react';
import style from '../../CommonLandingComponent/Order/Order2/order2.module.css';
const VariantItem = ({handleSelectVariantChange, variant, productName, productMainImage, checkedVariantItem}) => {
  return (
    <label onClick={()=>handleSelectVariantChange(variant)} className={style.containerVarient} style={{border:checkedVariantItem===variant.id?"1px solid red":""}}>
      <div className={style.containerVarient_Flex}>
        <div className={style.containerVarientLeft}>
          <div className={style.containerVarientLeftAll}>
            <input type="radio" name="radio" />
            <span className={style.checkmark}>
            </span>
          </div>
          <div className={style.containerVarientLeftImg}>
            <img src={variant?.media || productMainImage} alt="" />
          </div>
        </div>
        <div className={style.containerVarientRight}>
          <div>
            <h4 >{`${productName}(${variant?.variant})`}</h4>
          </div>
          <div className={style.containerVarientRight__dflex}>
            <h5 > ৳ {variant?.price}</h5>
            {/* <div className={style.containerVarientRight__dflex_button}>
              <div>
                <span onClick={()=>handleQuantityChange(variant, "decrease")}>-</span>
                <b>2</b>
                <span onClick={()=>handleQuantityChange(variant, "increase")}>+</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </label>
  );
};

export default VariantItem;