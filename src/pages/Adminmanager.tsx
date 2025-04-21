import React, { useState } from "react";
import Update from './visibility.png';
import { useNavigate } from "react-router-dom";
import Delete from './delete.png';
import Plus from './plus .png';
import "./Adminmanager.css"
export default (props) => {
	const [input1, onChangeInput1] = useState('');
	return (
		<div className="contain">
			<div className="column">
				<div className="column2" style={{ marginTop: "-30px" }} >
					<div className="row-view">
						<button className="button-row-view"
							onClick={() => alert("Nhấn vào tìm kiếm")}>
							<span className="text" >
								{"Search"}
							</span>
							<img
								src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/dUVNrycO0x/u8xrgu0t_expires_30_days.png"}
								className="image"
							/>
						</button>
						<img
							src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/dUVNrycO0x/vvd6yfll_expires_30_days.png"}
							className="image2"
						/>
						<div className="row-view2">
							<img
								src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/dUVNrycO0x/whp9qjkm_expires_30_days.png"}
								className="image3"
							/>
							<span className="text2" >
								{"Danielle Campbell"}
							</span>
							<img
								src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/dUVNrycO0x/4jeeayf9_expires_30_days.png"}
								className="image4"
							/>
						</div>
					</div>
					<div className="row-view3">
						<div className="column3">
							<div className="row-view4">
								<div className="column4">
									<span className="text3" >
										{"Product sold"}
									</span>
									<span className="text4" >
										{"25.1k"}
									</span>
								</div>
								<div className="box">
								</div>
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/dUVNrycO0x/1gj49mm9_expires_30_days.png"}
									className="image5"
								/>
							</div>
							<div className="row-view5">
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/dUVNrycO0x/lyb6gq8k_expires_30_days.png"}
									className="image6"
								/>
								<span className="text5" >
									{"+15%"}
								</span>
								<span className="text6" >
									{"View Report"}
								</span>
							</div>
							
						</div>
						
						<div className="column5">
							<div className="row-view6">
								<div className="column6">
									<span className="text7" >
										{"Total Profit"}
									</span>
									<span className="text8" >
										{"$2,435k"}
									</span>
								</div>
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/dUVNrycO0x/0kfexj0p_expires_30_days.png"}
									className="image7"
								/>
							</div>
							<div className="row-view7">
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/dUVNrycO0x/9hnzzrt9_expires_30_days.png"}
									className="image6"
								/>
								<span className="text9" >
									{"-3.5%"}
								</span>
								<span className="text6" >
									{"View Report"}
								</span>
							</div>
						</div>
						<div className="column5">
							<div className="row-view8">
								<div className="column7">
									<span className="text10" >
										{"Total No. of Claim"}
									</span>
									<span className="text11" >
										{"3.5M"}
									</span>
								</div>
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/dUVNrycO0x/ujlozo1i_expires_30_days.png"}
									className="image8"
								/>
							</div>
							<div className="row-view7">
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/dUVNrycO0x/6bt1lgw8_expires_30_days.png"}
									className="image6"
								/>
								<span className="text5" >
									{"+15%"}
								</span>
								<span className="text6" >
									{"View More"}
								</span>
							</div>
						</div>
						
						<div className="column8">
							
							<div className="row-view8">
								<div className="column9">
									<span className="text12" >
										{"New Costumer"}
									</span>
									<span className="text13" >
										{"43.5k"}
									</span>
								</div>
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/dUVNrycO0x/zjps5wh5_expires_30_days.png"}
									className="image8"
								/>
							</div>
							<div className="row-view7">
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/dUVNrycO0x/u37dbfkl_expires_30_days.png"}
									className="image6"
								/>
								<span className="text14" >
									{"+10%"}
								</span>
								<span className="text6" >
									{"View More"}
								</span>
							</div>
						</div>
						
					</div>
					<div className="plus-wrapper">
					<img src={Plus} className="plus-icon " />
		</div>

					<button className="button-row-view2"
						onClick={() => alert("Pressed!")}>
						<img
							src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/dUVNrycO0x/jwf15zk7_expires_30_days.png"}
							className="image9"
						/>
						<span className="text15" >
							{"Nicholas Patrick"}
						</span>
						<span className="text16" >
							{"$2540.58"}
						</span>
						<span className="text17">
							150<br />
							Products
						</span>

						<span className="text17">
							150<br />
							Products
						</span>
						<span className="text19" >
							{"+Gold"}
						</span><img
							src={Delete}
							className="image10"

						/>
						<img src={Update} className="image10" />


					</button>
					<button className="button-row-view3"
						onClick={() => alert("Pressed!")}>
						<img
							src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/dUVNrycO0x/jwf15zk7_expires_30_days.png"}
							className="image9"
						/>
						<span className="text15" >
							{"Nicholas Patrick"}
						</span>
						<span className="text16" >
							{"$2540.58"}
						</span>
						<span className="text17">
							150<br />
							Products
						</span>

						<span className="text17">
							150<br />
							Products
						</span>
						<span className="text19" >
							{"+Gold"}
						</span><img
							src={Delete}
							className="image10"

						/>
						<img src={Update} className="image10" />
					</button>
					<button className="button-row-view3"
						onClick={() => alert("Pressed!")}>
						<img
							src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/dUVNrycO0x/jwf15zk7_expires_30_days.png"}
							className="image9"
						/>
						<span className="text15" >
							{"Nicholas Patrick"}
						</span>
						<span className="text16" >
							{"$2540.58"}
						</span>
						<span className="text17">
							150<br />
							Products
						</span>

						<span className="text17">
							150<br />
							Products
						</span>
						<span className="text19" >
							{"+Gold"}
						</span><img
							src={Delete}
							className="image10"

						/>
						<img src={Update} className="image10" />
					</button>
					<button className="button-row-view4"
						onClick={() => alert("Pressed!")}>
						<img
							src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/dUVNrycO0x/jwf15zk7_expires_30_days.png"}
							className="image9"
						/>
						<span className="text15" >
							{"Nicholas Patrick"}
						</span>
						<span className="text16" >
							{"$2540.58"}
						</span>
						<span className="text17">
							150<br />
							Products
						</span>

						<span className="text17">
							150<br />
							Products
						</span>
						<span className="text19" >
							{"+Gold"}
						</span><img
							src={Delete}
							className="image10"

						/>
						<img src={Update} className="image10" />
					</button>
				</div>
				<div className="absolute-column" >
					<div className="row-view9">
						<img
							src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/dUVNrycO0x/rssrobth_expires_30_days.png"}
							className="image11"
						/>
						<div className="column10">
							<span className="text26" >
								{"Overview"}
							</span>
							<span className="text27" >
								{"Top Sales Representative"}
							</span>
						</div>
						<img
							src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/dUVNrycO0x/7jv4i566_expires_30_days.png"}
							className="absolute-image"
						/>
						<span className="absolute-text" >
							{"Mochi"}
						</span>
					</div>
					<div className="row-view10">
					<img
							src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/dUVNrycO0x/jguuwge0_expires_30_days.png"}
							className="image13"
						/>
						<span className="text28">Dashboard</span>
					</div>
					<div className="row-view11">
						<img
							src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/dUVNrycO0x/jguuwge0_expires_30_days.png"}
							className="image13"
						/>
						<span className="text28" >
							{"Claims"}
						</span>
					</div>
					<div className="row-view12">
						<img
							src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/dUVNrycO0x/l52uvma2_expires_30_days.png"}
							className="image14"
						/>
						<span className="text28" >
							{"Biller Queue"}
						</span>
					</div>
					<div className="row-view12">
						<img
							src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/dUVNrycO0x/nnrvwokh_expires_30_days.png"}
							className="image15"
						/>
						<span className="text28" >
							{"Subscription"}
						</span>
					</div>
					<div className="row-view13">
						<img
							src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/dUVNrycO0x/b28jxmrm_expires_30_days.png"}
							className="image16"
						/>
						<span className="text28" >
							{"Health"}
						</span>
					</div>
					<div className="column11">
						<img
							src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/dUVNrycO0x/ivh4wwqa_expires_30_days.png"}
							className="image17"
						/>
						<span className="text29" >
							{"Want to upgrade"}
						</span>
						<button className="button"
							onClick={() => alert("Pressed!")}>
							<span className="text30" >
								{"Upgrade now"}
							</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}