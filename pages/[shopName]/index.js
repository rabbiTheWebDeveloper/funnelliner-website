import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DefaultTheme from "../../Components/DefaultTheme/DefaultTheme";
import Cookies from 'js-cookie'
// Common CSS
import Theme1 from "../../Components/theme_1/index";
import PageLoader from "../../Components/Common/PageLoader/PageLoader";



const index = () => {

	const [shopInfo, setShopInfo] = useState({});
	const [isLoading, setIsLoading] = useState(false)

	const router = useRouter();
	const { shopName } = router.query;
	const headers = {
		domain: shopName,
	};

	const getShopInfo = async () => {
		setIsLoading(true)
		try {
			const shopInfo = await axios.post(
				`${process.env.API_URL}/shops/info`,
				{},
				{ headers: headers }
			);
			const shopData = shopInfo?.data?.data;
			localStorage.setItem("shop_id", shopData.shop_id);
			// localStorage.setItem("shop_name", shopData.name);
			localStorage.setItem("shop_name", shopData.domain);
			localStorage.setItem("theme_id", shopData.theme_id);
			localStorage.setItem("landing", shopData.landing);
			Cookies.set("shop_id", shopData.shop_id);
			Cookies.set("shop_title", shopData.shop_meta_title);
			Cookies.set("shop_meta_description", shopData.shop_meta_description);
			Cookies.set("shop_logo", shopData?.shop_logo?.name);
			setShopInfo(shopData);
			setIsLoading(false)
		} catch (err) {
			router.push("/404");
		}
	};
	useEffect(() => {
		if (shopName !== undefined) {
			getShopInfo();
		}
	}, [shopName]);
	return (
		<>
			{
				isLoading  && <PageLoader/>
			}
			{shopInfo.theme_id == 201 && (
				<Theme1 shopInfo={shopInfo} />
			)}

			{(shopInfo.theme_id === "null" || shopInfo.theme_id === null) && <DefaultTheme />}
		</>
	);
};

export default index;
