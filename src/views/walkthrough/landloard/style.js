import {
  StyleSheet,Dimensions,
} from "react-native";
import { normalize } from "../../../components";
function isLessMarshmallow(){
  const dvcHeight = Dimensions.get('window').height;
  if(dvcHeight < 750){
    return true;
  }
  return false;
}

export default StyleSheet.create({
  container: theme => ({
    flex: 1,
    backgroundColor:theme.colors.primBackgroundColor,
  }),
  skipwalkthrough:{
    alignItems:'flex-start',
    padding:10,
  },
  ScrollView:{
    //height:'100%',
  },
  skipText: theme => ({
    color: theme.colors.primary,
    fontSize: theme.typography.font_18,
    marginLeft: 15,
    fontFamily:theme.typography.secondaryFont,
    fontStyle:'normal',
    fontWeight:theme.typography.fontWeightSemiBold,
  }),
  landloardimage:{
    width:'80%',
    height:isLessMarshmallow()?200:330,
    alignSelf:'center',
  },
  itemcontainer:{
    flexDirection:'column',
    position:'relative',
    //height:'90%',
    overflow:'visible',
  },
  landlordProperties: theme =>({
    color:theme.colors.secondry,
    textAlign:'center',
    fontSize:theme.typography.font_20,
    paddingHorizontal:10,
    fontWeight:theme.typography.fontWeightBold,
    fontFamily:theme.typography.fontFamilyMontserratBold,
  }),
  pageInfo: theme =>({
    minHeight:normalize(130),
    color:theme.colors.descriptionColor,
    textAlign:'center',
    fontSize:theme.typography.font_16,
    marginVertical:normalize(10),
    paddingHorizontal:normalize(10),
    paddingTop:5,
    fontWeight:theme.typography.fontWeightRegular,
    fontFamily:theme.typography.secondaryFont,
    marginTop:theme.spacing.small,
    width:'90%',
    marginLeft:'auto',
    marginRight:'auto',
    lineHeight:normalize(25),
  }),
  btncontainer: theme =>({
    backgroundColor: theme.colors.secondry,
    width:'80%',
    flexDirection: "row",
    alignItems: "center",
    alignSelf:'center',
    justifyContent: "center",
    paddingRight: 16,
    paddingLeft: 16,
    elevation: 2,
    minWidth: 88,
    borderRadius: 5,
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 5,
    marginTop:isLessMarshmallow()?0:55,
    height:45,
    position:'absolute',
    bottom:40
  }),
  walkIndicator:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginVertical:normalize(20),
    width:50,
    alignSelf:'center',

  }

});
