import React, { useRef,useEffect, useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../theme';
import {
  Spinner,
  Button,
  Text,
  Input,
} from './';

// This file name should be Signup
const ReviewForm = ({
	productId,
  customer,
  reviewMessage,
  currentStore,
  addProductReview:_addProductReview,
  ...props}) => {
  const theme = useContext(ThemeContext);
  const [store_id, setStoreId] = useState(null);
  const [customer_id, setCustomerId] = useState(null);
  const [entity_pk_value, setEntityPkValue] = useState(null);
  const [nickname, setNickname] = useState('');
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');

  const titleInput = useRef(null);
  const detailInput = useRef(null);

  const onSubmitReview = () =>{
    const review = {
      title,detail,nickname,
      customer_id,entity_pk_value
    }
    _addProductReview(review);
    setTitle("");
    setDetail("");
  }

  useEffect(() => {
    // ComponentDidMount
    if (customer) {
      setNickname(customer.firstname);
      setCustomerId(customer.id);
    }
    if (currentStore) {
      setStoreId(currentStore.id);
    }
    setEntityPkValue(productId);
  }, []);

  const renderButtons = () => {
    return (
      <Button
        disabled={
          nickname === ''
          || title === ''
          || detail === ''
        }
        onPress={onSubmitReview}
      >
        Submit Review
      </Button>
    );
  };

  const getMessageView = () =>{
    return(
        reviewMessage.status=="ok" ?
        <Text style={styles.success(theme)}>{reviewMessage.data}</Text>:
        <Text style={styles.error(theme)}>{reviewMessage.data}</Text>
        )
  }
  return (
    <View style={styles.container(theme)}>
      <Text style={styles.header(theme)} >You're reviewing:</Text>
      <Text style={styles.label(theme)} >Nickname *</Text>
      <Input
        autoCapitalize="none"
        underlineColorAndroid="transparent"
        placeholder={"Nickname"}
        returnKeyType="next"
        autoCorrect={false}
        value={nickname}
        onChangeText={setNickname}
        onSubmitEditing={() => { titleInput.current.focus(); }}
        containerStyle={styles.inputContainer(theme)}
      />
      <Text style={styles.label(theme)} >Summary *</Text>
      <Input
        autoCapitalize="none"
        underlineColorAndroid="transparent"
        placeholder={"Summary"}
        returnKeyType="next"
        autoCorrect={false}
        value={title}
        onChangeText={setTitle}
        assignRef={(input) => { titleInput.current = input; }}
        onSubmitEditing={() => { detailInput.current.focus(); }}
        containerStyle={styles.inputContainer(theme)}
      />
      <Text style={styles.label(theme)} >Review *</Text>
      <Input
        autoCapitalize="none"
        underlineColorAndroid="transparent"
        placeholder={"Review"}
        returnKeyType="go"
        multiline={true}
        numberOfLines={10}
        autoCorrect={false}
        value={detail}
        onChangeText={setDetail}
        assignRef={(input) => { detailInput.current = input; }}
        onSubmitEditing={onSubmitReview}
        containerStyle={styles.inputTextArea(theme)}
      />
      {reviewMessage && getMessageView()}
      {renderButtons()}
    </View>
  );
};
const styles = StyleSheet.create({
  container: theme => ({
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    paddingTop: theme.spacing.tiny,
    marginBottom:theme.spacing.small,
  }),
  inputContainer: theme => ({
    width: theme.dimens.WINDOW_WIDTH * 0.9,
    marginBottom: theme.spacing.large,
  }),
  inputTextArea: theme => ({
    width: theme.dimens.WINDOW_WIDTH * 0.9,
    height:90,
    marginBottom: theme.spacing.large,
  }),
  header: theme => ({
    width: theme.dimens.WINDOW_WIDTH * 0.9,
    fontSize:18,
    color:theme.colors.primaryDark,
    marginBottom:theme.spacing.small
  }),
  label: theme => ({
    width: theme.dimens.WINDOW_WIDTH * 0.9,
    fontSize:15,
    color:theme.colors.primaryDark,
    marginBottom:theme.spacing.tiny
  }),
  success: theme => ({
    width: theme.dimens.WINDOW_WIDTH * 0.9,
    fontSize:15,
    color:theme.colors.success,
    textAlign:'center',
    marginBottom:theme.spacing.tiny
  }),
  error: theme => ({
    width: theme.dimens.WINDOW_WIDTH * 0.9,
    fontSize:15,
    textAlign:'center',
    color:theme.colors.error,
    marginBottom:theme.spacing.tiny
  }),
});



ReviewForm.propTypes = {
  productId: PropTypes.number,
  customer: PropTypes.object,
  reviewMessage: PropTypes.object,
  currentStore: PropTypes.object,
  addProductReview: PropTypes.func,
};

ReviewForm.defaultProps = {
  productId: null,
  customer: null,
  reviewMessage: null,
  currentStore: null,
};


export {ReviewForm};
