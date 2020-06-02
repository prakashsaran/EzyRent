import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {View, ScrollView, StyleSheet,TouchableOpacity,FlatList,SafeAreaView} from 'react-native';
import { Spinner,Text,ReviewForm } from '../common';
import { ThemeContext } from '../../theme';
import { Icon } from 'react-native-elements';
import { getProductCustomAttribute } from '../../helper/product';
import HTML from 'react-native-render-html';
import { connect } from 'react-redux';
import {
  getProductReview,
  addProductReview,
} from '../../actions';


class ProdectInfo extends Component {
  static contextType = ThemeContext;

  static propTypes = {
    getProductReview: PropTypes.func,
    addProductReview: PropTypes.func,
  };

	constructor(props){
		super(props);
		this.state ={
			activeTab:1,
			iscurrent:false,
		};
	}
	renderDescription(){
		const {product} = this.props;
		const theme = this.context;
		const attribute = getProductCustomAttribute(product, 'description');
	    return <HTML html={attribute.value} containerStyle={{padding:theme.spacing.large}} tagsStyles={styles.htmldescription(theme)}/>;
	}
	renderReview(){
		const {iscurrent} = this.state;
		const {product,reviews} = this.props;
		if (!iscurrent) {
			this.props.getProductReview({productId:product.id});
			this.setState({iscurrent:true});
		}
		if (reviews.length>0) {
			return(
			    <SafeAreaView style={{ flex: 1 }}>
			      <FlatList
			        data={reviews}
			        renderItem={({ item })=>this.renderItem(item)}
			        keyExtractor={(item, index) => index.toString()}
			      />
			    </SafeAreaView>
			  )
		};
		return <Text style={styles.notfound}>No reviews yet</Text>;
	}
	renderReviewForm(){
		const {product,customer,addProductReview,reviewMessage,appstores} = this.props;
		return <ReviewForm productId={product.id} customer={customer} addProductReview={addProductReview} reviewMessage={reviewMessage} currentStore={appstores.currentStore}/>;
	}
	renderTabs(){
		const theme = this.context;
		const {activeTab} = this.state;
		return(
			<View style={styles.tabContainer(theme)}>
				<TouchableOpacity onPress={()=>{this.setState({activeTab:1})}} style={styles.tabrow(theme)}>
					<Text style={styles.label(theme)} bold type="heading">Details</Text>
					<Icon name={activeTab==1?"ios-arrow-up":"ios-arrow-down"} type="ionicon" size={20} color={'black'} />
				</TouchableOpacity>
				{activeTab==1 && this.renderDescription()}
				<TouchableOpacity onPress={()=>{this.setState({activeTab:2})}} style={styles.tabrow(theme)}>
					<Text style={styles.label(theme)} bold type="heading">Reviews</Text>
					<Icon name={activeTab==2?"ios-arrow-up":"ios-arrow-down"} type="ionicon" size={20} color={'black'} />
				</TouchableOpacity>
				{activeTab==2 && this.renderReview()}
				{activeTab==2 && this.renderReviewForm()}
			</View>
		)
	}
	render(){
		return this.renderTabs()
	}

	renderItem(item){
		return(
			<View style={styles.reviewcont}>
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.info}>Review by {item.nickname}</Text>
				<Text style={styles.description}>{item.detail}</Text>
			</View>
		);
	}
}
const styles = {
  tabContainer: theme => ({
  	flexDirection:'column',
  }),
  tabrow: theme => ({
  	flexDirection:'row',
  	justifyContent:'space-between',
  	paddingHorizontal:theme.spacing.large,
  	paddingVertical:theme.spacing.small,
  	borderTopWidth:0.6,
  	borderColor:theme.colors.silverDarkColor,
  }),
  label: theme => ({
  }),
  reviewcont:{
  	paddingHorizontal:15,
  	flexDirection:'column',
  },
  title:{
  	color:"#000",
  	fontSize:18,
  },
  info:{
  	color:"#84c225",
  	fontSize:16,
  	paddingVertical:2,
  },
  description:{
  	fontSize:16,
  },
  notfound:{
  	textAlign:"center",
  	alignSelf:"center",
  	marginVertical:10,
  	color:"#000",
  },
  htmldescription: theme=>({
    ul:{
      margin:0,
      padding:0,
    },
    li:{
      margin:0,
    },
    p: {
      padding:0,
    },
  }),
};
const mapStateToProps = (state) => {
  const { reviews,reviewMessage } = state.product;
    const {appstores} = state.magento;
  const { customer } = state.account;

  return {reviews,customer,reviewMessage,appstores};
}

export default connect(mapStateToProps, {getProductReview,addProductReview})(ProdectInfo);