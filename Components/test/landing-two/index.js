import React, { useState } from "react";
import LandingTwo from "../../LandingPage/LandingTwo/LandingTwo";
import Context from "../../Context";
import { Editor, Frame } from "@craftjs/core";
import lz from "lzutf8";

const index = () => {
  const [editActive, setEditActive] = useState(false);
  const [saveData, setSaveData] = useState(false)
  let baseData
	const save = (data) => {
		console.log(JSON.parse(data));
		const saveData = JSON.parse(data);
		if (saveData.ROOT !== undefined) {
			const rootData = saveData.ROOT;
			if (rootData.displayName === 'LandingTwo') {
				baseData = {
					menu: lz.encodeBase64(lz.compress(JSON.stringify(rootData.props))),
					shop_id: localStorage.getItem('shop_id'),
					theme: localStorage.getItem('theme_id'),
					page: 'landing-two',
					type: 'landing'
				}
			}

		} else {
			baseData = {
				logo: saveData,
				shop_id: localStorage.getItem('shop_id'),
				theme: localStorage.getItem('theme_id'),
				page: 'landing-two',
				type: 'landing'
			}
		}
		// console.log(lz.decompress(lz.decodeBase64(baseData?.menu)));

	}

  return (
    <>
      <button
        style={{ position: "fixed", top: 0, right: 0, zIndex: 100000 }}
        onClick={() => setEditActive(!editActive)}
        className='btn btn-success'
      >
        Edit
      </button>
      <button style={{ position: 'fixed', top: 0, right: '100px', zIndex: 100000  }} onClick={() => {
					setSaveData(!saveData)
				}} className="btn btn-success">Save</button>
      <Context.Provider value={{ value: editActive, value1: saveData }}>
        <Editor resolver={{ LandingTwo }}>
          <Frame>
            <LandingTwo
             heroContent="শরীরের ঘামের দুর্গন্ধ সরানো জন্য তাজা সুবাস মিষ্টি সুগন্ধি যা মানুষকে আকর্ষণ করে!"
             heroFontSize={30}
             currentPrice={"বর্তমান মূল্যঃ ১০০০ টাকা"}
             priceFontSize={25}
             previousPrice={"পূর্বের মূল্যঃ ১০৫০ টাকা"}
             previousPriceFontSize={20}

             cardOneTitle={"Executive Night 25ml"}
             cardOneText={"পারফিউম এটি শুধুমাত্র একটি সুবাস নয় এটি একটি ঐতিহ্য"}
             cardTwoTitle={"Executive Night 25ml"}
             cardTwoText={"পারফিউম এটি শুধুমাত্র একটি সুবাস নয় এটি একটি ঐতিহ্য"}
             cardThreeTitle={"Executive Night 25ml"}
             cardThreeText={"পারফিউম এটি শুধুমাত্র একটি সুবাস নয় এটি একটি ঐতিহ্য"}
             cardFourTitle={"Executive Night 25ml"}
             cardFourText={"পারফিউম এটি শুধুমাত্র একটি সুবাস নয় এটি একটি ঐতিহ্য"}
             cardTitleFontSize={23}
             cardTextFontSize={17}

             whyBuyOurProduct={"কেন আমাদের কাছ থেকে পারফিউম টি কিনবেন?"}
             whyBuyFontSize={25}

             whyThisProductForYou={"নিচের এই কারণ গুলো যদি আপনার সাথে হয়ে থাক তবে পারফিউম টি আপনার জন্য"}
             whyThisProductFontSize={30}
             reason_1={"ট্রাভেল করায় সৃষ্টি হয় ঘাম।যা আপনার গায়ে সৃষ্টি করে দুর্গন্ধ।"}
             reason_2={"ট্রাভেল করায় সৃষ্টি হয় ঘাম।যা আপনার গায়ে সৃষ্টি করে দুর্গন্ধ।"}
             reason_3={"ট্রাভেল করায় সৃষ্টি হয় ঘাম।যা আপনার গায়ে সৃষ্টি করে দুর্গন্ধ।"}
             reason_4={"ট্রাভেল করায় সৃষ্টি হয় ঘাম।যা আপনার গায়ে সৃষ্টি করে দুর্গন্ধ।"}
             reasonFontSize={20}
             whyOurProductIsGood={"আমাদের পারফিউম কেন ভালো?"}
             whyOurProductIsGoodFontSize={30}
             whyOurProductIsGoodDescription={"FR agrances একটি সুগন্ধি পরিষেবা আমাদের লক্ষ্য হল মানুষের শরীরে দুরগন্ধ ধূর করা এবং ২৪ ঘণ্টা শুগন্ধের মাধ্যমে নিজেদের প্রকাশ করার ক্ষমতা দেওয়া । এটি আমাদের মানুষের আত্মবিশ্বাস বাড়াতেও সাহায্য করে। গ্রাহকরা ভাল গন্ধ পাই তা জেনে অবিশ্বাস্যভাবে আশ্বস্ত হয়ে ১০০% আস্থার সাথে আমাদের থেকে এই পারফিউম ক্রয় করতে পারেন । আমরা সরাসরি গ্রাহকদের হাতে পৌছে দেয়ার চেষ্টা অব্যাহত আছে, আপনি ও নিয়ে দেখতে পারেন।"}
             goodProductFontSize={20}
             save={save}
            ></LandingTwo>
          </Frame>
        </Editor>
      </Context.Provider>
    </>
  );
};

export default index;
