import React from "react";

const ProductVariation = ({
  product,
  setSelectedVariation,
  selectedVariation,
}) => {
  const handleValueClick = (value, attribute) => {
    const updatedVariation = selectedVariation.filter(
      variation => variation.attribute_id !== attribute.id
    );

    const tempObj = {
      attribute_id: attribute.id,
      attribute_value: value.value,
      attribute_value_id: value.id,
    };

    setSelectedVariation([...updatedVariation, tempObj]);
  };

  return (
    <div className="theme-1__product__Verient">
      {product?.attributes?.map((attribute, id) => (
        <div key={id} className="theme-1__product__Verient__Item">
          <h5>{attribute?.key}</h5>
          {attribute?.values?.map((item, index) => {
            const isValueSelected = selectedVariation.some(
              variation =>
                variation.attribute_id === attribute.id &&
                variation.attribute_value_id === item.id
            );

            return (
              <div
                key={index}
                onClick={() => {
                  if (!isValueSelected) {
                    handleValueClick(item, attribute);
                  }
                }}
                className={isValueSelected ? 'active_variant_value_selected' : ''}
              >
                {item?.value}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ProductVariation;
