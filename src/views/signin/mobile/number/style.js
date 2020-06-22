import { StyleSheet,Dimensions } from "react-native";
import {normalize} from '../../../../components'
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
    backgroundColor: theme.colors.primBackgroundColor,
  }),
  image: {
    width: isLessMarshmallow()?150:200,
    height: isLessMarshmallow()?150:200,
    marginTop: isLessMarshmallow()?20:50,
    marginBottom:isLessMarshmallow()?-40:0,
    alignSelf: "center",
  },
  changesigninmethod: theme =>({
    alignItems:'center',
    marginTop:theme.spacing.small,
  }),
  changeMethodText: theme =>({
    fontSize:theme.typography.font_14,
    color:theme.colors.secondry,
    fontFamily:theme.typography.secondaryFont,
    fontWeight:theme.typography.fontWeightRegular,
  }),
  confirmBoxTitle:theme=>({
    color:theme.colors.descriptionColor,
    fontSize:normalize(18),
    textAlign:'center',
    paddingTop:10,
    fontFamily:theme.typography.secondaryFont,
    fontWeight: theme.typography.fontWeightRegular,

  }),
  eraseTitle:theme=>({
    fontSize:normalize(13),
    color:theme.colors.errorColor,
  }),

  mobileWrapper: theme=> ({
    width: '80%',
    alignSelf: "center",
    marginVertical:theme.spacing.large,
  }),
  mobileInput: theme=> ({
    borderBottomWidth:2,
    borderColor:theme.colors.secondry,
    fontSize: theme.typography.font_22,
    fontFamily:theme.typography.primaryFont,
    fontWeight:theme.typography.fontWeightRegular,
    marginTop:7,
    paddingBottom:2,
  }),
  signIn: theme =>({
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginTop:theme.spacing.large,
  }),

  cnfrmSignText: theme =>({
    fontSize:theme.typography.font_14,
    color:theme.colors.descriptionColor,
    fontFamily: theme.typography.secondaryFont,
}),
signLink: theme =>({
    fontSize:theme.typography.font_14,
    color:theme.colors.primary,
    paddingLeft:theme.spacing.tiny,
    fontFamily: theme.typography.primaryFont,
}),

  footerImage: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left:0,
    right:0,
    height: 75,
  },
  twocolumn:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'80%',
    alignSelf:'center',
  },
  fielcountrylabel: theme =>({
    flexDirection:'row',
    justifyContent:'space-between',
    width:'30%',
    alignItems:'center',
    borderBottomWidth:1,
    borderColor:theme.colors.secondry,
  }),
  fieltext:theme=>({
    color:theme.colors.primaryTitleColor,
    fontFamily:theme.typography.primaryFont,
    fontSize:theme.typography.font_14,
    fontWeight:theme.typography.fontWeightRegular,
    paddingTop:7,
  }),
  downarrowicon:{
    width:13,
    height:13,
    marginLeft:5,
    marginTop:10,
  },
  contactbook:theme=>({
    width:'62%',
    borderColor:theme.colors.secondry,
  }),
  // popup design 
    popupContainer: theme=>({
      width:'100%',
      backgroundColor: "rgba(230, 230, 230,1)",
      borderRadius: 5,
      borderColor: "#e6e6e6",
      borderWidth: 1,
      shadowOffset: {
        height: 5,
        width: 5
      },
      shadowColor: "rgba(0,0,0,1)",
      shadowOpacity: 0.35,
      paddingVertical:30,
      paddingHorizontal:30,
    }),
    columntitlePop1:theme=>({
      marginTop:0,
      fontFamily:'Oxygen-Bold',
      fontSize:normalize(18),
    }),
    columntitlePopDesc:theme=>({
      marginTop:20,
      fontSize:normalize(16),
      fontFamily:'Montserrat-Regular',
    }),
    popupBtms:{
      width:'100%',
      flexDirection:'row',
      flexWrap:'wrap',
      justifyContent:'flex-end',
      paddingTop:30,
    },
    pop_wrap:{
      //backgroundColor:'#fff',
    },
    cancel:{
      color:'#315add',
      fontSize:normalize(15),
      fontFamily:'Montserrat-Regular',
    },
    ok:{
      marginLeft:25,
      fontSize:normalize(15),
      color:'#315add',
      fontFamily:'Montserrat-Regular',
    },
});
