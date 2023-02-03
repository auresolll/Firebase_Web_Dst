import * as React from "react";
import FeatureDemo from "../feature";

interface IFeatureProps {}

const Home: React.FunctionComponent<IFeatureProps> = (props) => (
	<>
		<main className="main">
			<section className="section">
				<div className="banner_section">
					<div className="banner_content">
						<div className="banner_content_step">
							<div className="step">
								<h1 className="banner_content_title">Simple Roast Chicken</h1>
								<p className="banner_content_desc">
									Chef Thomas Keller’s food is known for fine dining finesse, but his recipe for
									simple roast chicken is about as easy as it gets. For Keller, the perfect roast
									chicken .
								</p>

								<p className="banner_content_price">120.000 VND</p>
							</div>
						</div>
						<div className="btn">
							<button>Discover</button>
							<button>Add Shopping</button>
						</div>
					</div>
					<div className="banner_logo">
						<img src={require("./../../img/c1.png")}></img>
					</div>
				</div>
			</section>
			<FeatureDemo />
		</main>
	</>
);

export default Home;
