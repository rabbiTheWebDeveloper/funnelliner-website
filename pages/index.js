import React, { Component, useEffect, useState } from "react";
import Head from "next/head";
// Common CSS

import MainPage from "../Components/MainPage/MainPage";




function Home() {
	let [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	}, []);

	return (
		<div className='MainPage'>

			<Head>
				<title>Funnel Liner - Automated Sales Funnel</title>
				<meta name='description' content='Funnel Liner - Automated Sales Funnel' />
				<meta name='viewport' content='width=device-width, user-scalable=no' />
				<link rel="icon" href="../images/favicon.png" />
			</Head>

			<>
				{
					loading ? (
						<div className="Preloader">
							<div className="img">
								<img src="../sppiner.gif" />
							</div>
						</div>
					)
						:  (<MainPage />)
				}

			</>
			
		</div>
	);
}
export default Home