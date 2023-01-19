import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import * as React from "react";
import FeatureProduct from "../../components/_Product";
import { IProduct } from "../../constants/type";
import UseFeatureProducts from "../../hooks/useFeatureProducts";
import { firebaseRepositoryInstance } from "../../services/firebase";

interface IFeatureProps {}

const Feature: React.FunctionComponent<IFeatureProps> = (props) => {
	return (
		<>
			<h1>Feature</h1>
		</>
	);
};

export default Feature;
