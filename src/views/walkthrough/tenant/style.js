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
  skipText: theme => ({
    color: theme.colors.primary,
    fontSize: theme.typography.font_24,
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
  itemcontainer: theme =>({
    flexDirection:'column',
    marginTop:theme.spacing.extraLarge*2,
  }),
  landlordProperties: theme =>({
    color:theme.colors.secondry,
    textAlign:'center',
    fontSize:theme.typography.font_22,
    paddingHorizontal:10,
    fontWeight:theme.typography.fontWeightBold,
    fontFamily:theme.typography.fontFamilyMontserratBold,
  }),
  pageInfo: theme =>({
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
    minHeight:isLessMarshmallow()?normalize(100):normalize(118),
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
    marginTop:isLessMarshmallow()?-39:30,
    height:45,
    position:'absolute',
    bottom:40  
  }),
  walkIndicator: theme =>({
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginVertical:theme.spacing.extraLarge*3,
    width:50,
    alignSelf:'center',
  })

});
