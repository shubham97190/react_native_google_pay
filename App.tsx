import React, {useState, useEffect} from 'react';
import {Alert, Text, View} from 'react-native';
import { GooglePay, RequestDataType, AllowedCardNetworkType, AllowedCardAuthMethodsType } from 'react-native-google-pay'
const allowedCardNetworks: AllowedCardNetworkType[] = ['VISA', 'MASTERCARD']
const allowedCardAuthMethods: AllowedCardAuthMethodsType[] = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];

export default function App() {
  const handleError = (error: any) => Alert.alert('Error', `${error.code}\n${error.message}\n${error}`)
  async function Pay() {
    const requestData:RequestDataType = {
      cardPaymentMethod: {
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          // stripe (see Example):
          // gateway: 'stripe',
          // gatewayMerchantId: '',
          // stripe: {
          //   publishableKey: 'pk_test_TYooMQauvdEDq54NiTphI7jx',
          //   version: '2018-11-08',
          // },
          // other:
          gateway: 'example',
          gatewayMerchantId: 'exampleGatewayMerchantId',
        },

        allowedCardNetworks,
        allowedCardAuthMethods,
      },
      transaction: {
        totalPrice: '10',
        totalPriceStatus: 'FINAL',
        currencyCode: 'USD',
      },
      merchantName: 'Example Merchant',
    };
    // Set the environment before the payment request
    GooglePay.setEnvironment(GooglePay.ENVIRONMENT_TEST);
    // Check if Google Pay is available
    GooglePay.isReadyToPay(allowedCardNetworks, allowedCardAuthMethods).then(
      ready => {
        if (ready) {
          // Request payment token
          GooglePay.requestPayment(requestData)
            .then(token => {
              // Send a token to your payment gateway
            })
            .catch(error => handleError(error));
        }
        else{
          handleError(ready)
        }
      },
    );
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text onPress={Pay} >Pay with google-pay</Text>
    </View>
  );
}
