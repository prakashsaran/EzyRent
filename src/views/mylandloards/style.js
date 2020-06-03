import { StyleSheet } from "react-native";
import { normalize } from "../../components";

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#fff',
    },
    rectviewcustom:{
      paddingTop:0,
    },
    titleWrapper:{
      width:'90%',
      alignSelf:'center',
      marginVertical:normalize(10),
      flexDirection:'row',
      justifyContent:'space-between',
      paddingTop:10,
    },

    back_button:{
      width:30,
      height:17,
    },
    three_dots:{
      width:6,
      height:23,
      marginTop:-6,
    },
    textHeading: theme =>({
      color:theme.colors.secondry,
      fontSize:normalize(18),
      textTransform:'uppercase',
      fontWeight:'bold',
      paddingBottom:6,
    }),
    textSub: theme =>({
      color:theme.colors.secondry,
      fontSize:normalize(14),
      color:theme.colors.descriptionColor,
    }),
    gps_dark_icon:{
      width:18,
      height:18,
      marginTop:5,
      marginLeft:-3,
    },
    ImageLeftWrap:{
      borderTopLeftRadius: 60,
      borderTopRightRadius: 60,
      borderBottomLeftRadius: 60,
      borderBottomRightRadius: 60,
      overflow:'hidden',
    },
    morelinksmall:{
      fontSize:normalize(14),
    },
    shadow:{
      backgroundColor: "#fff",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingRight: 16,
      paddingLeft: 16,
      elevation: 8,
      minWidth: 88,
      borderRadius: 10,
      shadowOffset: {
        height: 1,
        width: 0
      },
      shadowColor: "#000",
      shadowOpacity: 0.35,
      shadowRadius: 5,
      marginVertical:5,
    },
    MoreLinkswrap:{
      width:'100%',
      //height:130,
      flexDirection:'row',
      paddingTop:13,
      paddingBottom:5,
      paddingLeft:0,
      //flexWrap:'wrap',
      borderRadius: 10,
    },
    More_icon:{
      width:3,
      height:30,
      marginTop:5,
    },
    MoreLinks:{
      paddingLeft:10,
    },
    MoreLinksItem: theme =>({
      color:'#000',
      fontSize:normalize(14),
      fontFamily:theme.typography.fontFamilyMontserratBold,
      fontWeight:theme.typography.fontWeightSemiBold,
    }),
    MoreLinksItemSub: theme =>({
      color:theme.colors.descriptionColor,
      fontSize:normalize(14),
      paddingLeft:7,
      paddingTop:0,
      fontFamily:theme.typography.primaryFont,
      fontWeight:theme.typography.fontWeightLight,
    }),
    MoreLinksItemLocation: theme =>({
      color:theme.colors.descriptionColor,
      fontSize:normalize(13),
      paddingLeft:5,
      paddingTop:2,
      fontFamily:theme.typography.secondaryFont,
      fontWeight:theme.typography.fontWeightRegular,
    }),
    UserWrap:{
      paddingLeft:10,
    },
    contentWrap:{
      flexDirection:'row',
      paddingTop:10,
      paddingBottom:20,
    },
    User_image:{
      width:80,
      height:80,
      borderRadius:30,
    },
    heading_wrap:{
      flexDirection:'row',
      flexWrap:'wrap',
    },
    UserWrap:{
      width:'72%',
      paddingLeft:10,
    },
  });
